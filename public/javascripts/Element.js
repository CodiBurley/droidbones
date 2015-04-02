/*
 * To make an Element object:
 *		var Element = ELEMENT.constructor;
 *		var elem_object = new Element();
 */

var ELEMENT = (function() {

	var _constructor = function(_type) {
		this.type = _type;
		this.front = CONSTANT.fronts[_type];
		this.back = CONSTANT.backs[_type];
		this.xml = '';
		this.children = [];

		this.addChild = function(child) {
			this.children.push(child)
			return this;
		};

		this.hasChildren = function() {
			return this.children.length != 0;
		};

		this.clearXml = function() {
			this.xml = "";
		}

	}

	return {
		constructor: _constructor
	};

})();
