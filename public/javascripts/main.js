/* 
 *Entry Point of script located at bottom of page.
 *
 *Funcitons are organized with the stack trace starting from
 *the bottom going up.
 */

(function() {

	var Element = ELEMENT.constructor; //to make Element: blah = new Element()
	var Layout = new Element("LAYOUT")


	/*
     *Clears all children of a list, along with the 
     *xml Elements in the list
     */
	var clearListElems = function(li) {
		li.innerHTML = li.xmlElem.type + "<span class='glyphicon glyphicon-plus add-button'></span>";
		clearLayout(li.xmlElem);
		li.xmlElem.clearChildren();
		renderLayout(Layout);
		var glyphicon_span = li.children[0];
		$(glyphicon_span).click(xmlAdditionCallback);
	}

	/* 
	 *Add the childrens xml together, then wrap the
	 *parent around the children's xml
	 */
	var writeXml = function(element) {
		for(var i = 0; i < element.children.length; i++) {
			element.xml += element.children[i].xml;
		}
		element.xml = element.front + element.xml;
		element.xml += element.back;
	};	

	/*
	 *Made to be given a Layout xml Element,
	 *creates string that contains xml Android Layout
	 */
	var renderLayout = function(child) {
		for(var i = 0; i < child.children.length; i++) {
			renderLayout(child.children[i]);
		}
		writeXml(child);
	};	

	/*
	 *Clears the xml code for each element inside a layout
	 */
	var clearLayout = function(child) {
		for(var i = 0; i < child.children.length; i++) {
			clearLayout(child.children[i]);
		}
		child.xml = "";
	}	

	/*
	 *Renders the layout and puts the results into
	 *the results section
	 */
	var displayLayout = function() {
		clearLayout(Layout);
		renderLayout(Layout);
		document.getElementById("results").innerHTML = Layout.xml;	
	}

	/*
	 *Adds select menu to li given to it, select menu is
	 *used to select which element to add to layout
	 */
	var addSelectMenu = function(li) {
		var select = document.createElement("select");
		select.innerHTML = '<option value="ROW">Row</option>' +
						   '<option value="COLUMN">Column</option>' +
						   '<option value="CONTENT">Content</option>';
		$(li).append(select);
	}

	/*
	 *Used in attachXmlElem, this adds a list item to the 
	 *html page and attaches an xml Element to it
	 */
	var addHtmlChild = function(parent, childXml) {
		var ul = document.createElement("ul"),
			li = document.createElement("li");
		li.innerHTML =  childXml.type + " <span class='glyphicon glyphicon-plus add-button'></span>"
		li.xmlElem = childXml;
		addSelectMenu(li);
		ul.appendChild(li);
		parent.appendChild(ul);
		var glyphicon_span = li.children[0];
		$(glyphicon_span).click(xmlAdditionCallback);			
	}	

	/*
	 *Given a parent xml Element, another xml
	 *Element is returned that is the child of the 
	 *parent
	 */
	var createChildToAdd = function(parent) {
		//if adding to the initial layout, a row is always added
		if(parent.xmlElem.type === "LAYOUT") {
			return new Element("ROW");
		} else {
			switch(parent.childNodes[2].value) {//switching value of select menu
				case "ROW":
					return new Element("ROW");
					break;
				case "COLUMN":
					return new Element("COLUMN");
					break;
				case "CONTENT":
					return new Element("CONTENT");
					break;
				default:
					console.log("INVALID ELEMENT ID");
					break;
			}
		}
	}

	/*
	 *Attaches xml Elements to html elements
	 *and adds children to the xml Element
	 */
	var attachXmlElem = function(target) {
		var elem = createChildToAdd(target);
		target.xmlElem.addChild(elem);
		addHtmlChild(target, elem);
	}

	/*
	 *Callback for when an element addition click is made
	 */
	var xmlAdditionCallback = function() {
		var target = this.parentNode;
		attachXmlElem(target);
		displayLayout();
	};
	
	/* --- ENTRY POINT --- */
	$(document).ready(function() {
		var	list_root = document.getElementById("root_layout");
		list_root.xmlElem = Layout;

		//Add to list item
		$('#add-button').click(xmlAdditionCallback);	
		//reset list
		$('#reset-button').click(function() {
			clearListElems(list_root);
			displayLayout();
		});
		//download xml layout file
		$('#download-btn').click(function() {
			var params = { file_string: $('#results').text() };
			$.get('/download', params, function(results) {
				$('#download-link').html('layout.xml');
				$('#download-link').css('display', 'block');
			})
		});
		//hide download link after clicked
		$('#download-link').click(function() { $(this).toggle(); });
	});


})();
