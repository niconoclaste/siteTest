'use strict';

function $(selector) {
	if (!(this instanceof $)) {
		return new $(selector);
	}
	this.length = 0;
	this.nodes = [];
	if (selector !== '') {
		this.nodes = [].slice.call(document.querySelectorAll(selector));
	}
	if (this.nodes.length) {
		this.length = this.nodes.length;
		for (var i = 0; i < this.nodes.length; i++) {
			this[i] = this.nodes[i];
		}
	}
}
$.fn = $.prototype;

$.fn.each = function (callback) {
	for (var i = 0; i < this.length; i++) {
		callback.call(this[i], this, i);
	}
	return this;
};

$.fn.hasClass = function (className) {
	var check = false;
	this.each(function () {
		if (this.classList.contains(className)) {
			check = true;
		}
	});
	return check;
};
$.fn.addClass = function (className) {
	this.each(function () {
		this.classList.add(className);
	});
};
$.fn.removeClass = function (className) {
	this.each(function () {
		this.classList.remove(className);
	});
};
$.fn.height = function () {
	// add var to change height
	var heightReturn = 0;
	this.each(function () {
		heightReturn = this.offsetHeight;
	});
	return heightReturn;
};

/* 
	ADD FUNCTIONS 
	.width()
	.offset() (-> return .top & .left)
	.find()
	.scrollTop()
	.append()
	.appendTo()
	.prepend()
	.prependTo()
	.remove()
	
	
	
	.animate() ?
	.on() ?
	.ajax()

	
	event = load / ready / resize
	
*/

$.fn.css = function (property) {
	var value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

	if (value === false) {
		var propertyReturn = '';
		this.each(function () {
			propertyReturn = this.style.getPropertyValue(property);
		});
		return propertyReturn;
	} else {
		this.each(function () {
			if (value === '') {
				this.style.removeProperty(property);
			} else {
				this.style.setProperty(property, value);
			}
		});
	}
};

window.onscroll = function (e) {
	var windowScroll = document.documentElement.scrollTop;
	var headerHeight = $('#header').height();
	var naviHeight = $('#main-navi').height();
	if (windowScroll > headerHeight - (naviHeight + 110)) {
		if (!$('#header').hasClass('is-small')) {
			$('#header').addClass('is-small');
		}
		if (windowScroll > headerHeight - (naviHeight + 58)) {
			if (!$('#main-navi').hasClass('is-fixed')) {
				$('#main-navi').addClass('is-fixed');
			}
		} else {
			if ($('#main-navi').hasClass('is-fixed')) {
				$('#main-navi').removeClass('is-fixed');
			}
		}
	} else {
		if ($('#header').hasClass('is-small')) {
			$('#header').removeClass('is-small');
		}
	}
};