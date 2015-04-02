(function() {

	var Element = ELEMENT.constructor;
	var Layout = new Element("LAYOUT")

	/*
	 *Made to be given a Layout xml Element,
	 *creates string that contains xml Android Layout
	 */
	var renderLayout = function(child) {
		for(var i = 0; i < child.children.length; i++) {
			console.log(child.children[i].type)
			renderLayout(child.children[i]);
		}
		writeXml(child);
	};

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
	 *Clears the xml code for each element inside a layout
	 */
	var clearLayout = function(child) {
		for(var i = 0; i < child.children.length; i++) {
			console.log(child.children[i].type)
			clearLayout(child.children[i]);
		}
		child.xml = "";
	}
	/*Layout.addChild(Row1).addChild(Row2).addChild(Row3).addChild(Row4);
	Row1.addChild(Col1R1).addChild(Col2R1);
	Col1R1.addChild(buttonR1);
	Row2.addChild(Col1R2).addChild(Col2R2).addChild(Col3R2);
	Col2R2.addChild(buttonR2);
	Row3.addChild(Col1R3).addChild(Col2R3);
	Col2R3.addChild(buttonR3);
	Row4.addChild(Col1R4);
	Col1R4.addChild(buttonR4);

	renderLayout(Layout);
	console.log(Layout.xml);*/

	/*
	 *Attaches xml Elements to html elements
	 *and adds children to the xml Element
	 */
	var attachXmlElem = function(target) {
		console.log("target" + target);
		var elem = createChildToAdd(target.xmlElem);
		target.xmlElem.addChild(elem);
		addHtmlChild(target, elem);
	}

	/*
	 *Given a parent xml Element, another xml
	 *Element is returned that is the child of the 
	 *parent
	 */
	var createChildToAdd = function(parent) {
		switch(parent.type) {
			case "LAYOUT":
				return new Element("ROW");
				break;
			case "ROW":
				return new Element("COLUMN");
				break;
			default:
				console.log("INVALID ELEMENT ID");
				break;
		}
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
		ul.appendChild(li);
		parent.appendChild(ul);
		var glyphicon_span = li.children[0];
		$(glyphicon_span).click(xmlAdditionCallback);			
	}


	/*
	 *Callback for when an element addition click is made
	 */
	var xmlAdditionCallback = function() {
		var target = this.parentNode;
		attachXmlElem(target);
		console.log(target.xmlElem.type);
		clearLayout(Layout);
		renderLayout(Layout);
		document.getElementById("results").innerHTML = Layout.xml;
		console.log(document.getElementById("results").innerHTML);
	};
	
	
	$(document).ready(function() {
		var	list_root = document.getElementById("root_layout");
		list_root.xmlElem = Layout;

		//Get the element that is being clicked (added to)
		$('#add-button').click(xmlAdditionCallback);		
	});


})();

/* Current Output
<!-- LAYOUT -->
<LinearLayout 
	xmlns:android="http://schemas.android.com/apk/res/android"
	xmlns:tools="http://schemas.android.com/tools"
	android:layout_width="match_parent"
	android:layout_height="match_parent"
	android:orientation="vertical">
	<!-- ROW -->
	<LinearLayout
		android:orientation="horizontal"
		android:layout_width="match_parent"
		android:layout_height="0dp"
		android:layout_weight="1">
		<!-- COLUMN -->
		<LinearLayout
			android:orientation="vertical"
			android:layout_width="0dp"
			android:layout_height="match_parent"
			android:layout_weight="1">
			<Button
				android:layout_width="match_parent"
				android:layout_height="match_parent"
				android:text="New Button"
				android:id="@+id/button" />
		</LinearLayout>
		<!-- COLUMN -->
		<LinearLayout
			android:orientation="vertical"
			android:layout_width="0dp"
			android:layout_height="match_parent"
			android:layout_weight="1">
		</LinearLayout>
	</LinearLayout>
	<!-- ROW -->
	<LinearLayout
		android:orientation="horizontal"
		android:layout_width="match_parent"
		android:layout_height="0dp"
		android:layout_weight="1">
		<!-- COLUMN -->
		<LinearLayout
			android:orientation="vertical"
			android:layout_width="0dp"
			android:layout_height="match_parent"
			android:layout_weight="1">
		</LinearLayout>
		<!-- COLUMN -->
		<LinearLayout
			android:orientation="vertical"
			android:layout_width="0dp"
			android:layout_height="match_parent"
			android:layout_weight="1">
			<Button
				android:layout_width="match_parent"
				android:layout_height="match_parent"
				android:text="New Button"
				android:id="@+id/button" />
		</LinearLayout>
		<!-- COLUMN -->
		<LinearLayout
			android:orientation="vertical"
			android:layout_width="0dp"
			android:layout_height="match_parent"
			android:layout_weight="1">
		</LinearLayout>
	</LinearLayout>
	<!-- ROW -->
	<LinearLayout
		android:orientation="horizontal"
		android:layout_width="match_parent"
		android:layout_height="0dp"
		android:layout_weight="1">
		<!-- COLUMN -->
		<LinearLayout
			android:orientation="vertical"
			android:layout_width="0dp"
			android:layout_height="match_parent"
			android:layout_weight="1">
		</LinearLayout>
		<!-- COLUMN -->
		<LinearLayout
			android:orientation="vertical"
			android:layout_width="0dp"
			android:layout_height="match_parent"
			android:layout_weight="1">
			<Button
				android:layout_width="match_parent"
				android:layout_height="match_parent"
				android:text="New Button"
				android:id="@+id/button" />
		</LinearLayout>
	</LinearLayout>
	<!-- ROW -->
	<LinearLayout
		android:orientation="horizontal"
		android:layout_width="match_parent"
		android:layout_height="0dp"
		android:layout_weight="1">
		<!-- COLUMN -->
		<LinearLayout
			android:orientation="vertical"
			android:layout_width="0dp"
			android:layout_height="match_parent"
			android:layout_weight="1">
			<Button
				android:layout_width="match_parent"
				android:layout_height="match_parent"
				android:text="New Button"
				android:id="@+id/button" />
		</LinearLayout>
	</LinearLayout>
</LinearLayout>

*/
