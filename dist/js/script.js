'use strict';

function $nico(selector) {
	if (!(this instanceof $nico)) {
		return new $nico(selector);
	}
	if (selector === window) {
		this[0] = window;
	} else if (selector === document) {
		this[0] = window.document;
	} else {
		this.length = 0;
		this.selector = selector;
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
		if (this.length === 0) {
			this[0] = selector;
		}
	}
};

$nico.fn = $nico.prototype;

$nico.fn.each = function (callback) {
	for (var i = 0; i < this.length; i++) {
		callback.call(this[i], this, i);
	}
	return this;
};

$nico.fn.hasClass = function (className) {
	var check = false;
	this.each(function () {
		if (this.classList.contains(className)) {
			check = true;
		}
	});
	return check;
};
$nico.fn.addClass = function (className) {
	this.each(function () {
		this.classList.add(className);
	});
};
$nico.fn.removeClass = function (className) {
	this.each(function () {
		this.classList.remove(className);
	});
};
$nico.fn.height = function () {
	var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

	if (value === false) {
		var heightReturn = 0;
		this.each(function () {
			heightReturn = this.offsetHeight;
		});
		return heightReturn;
	} else {
		this.each(function () {
			this.style.height = value;
		});
	}
};
$nico.fn.width = function () {
	var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

	if (value === false) {
		var widthReturn = 0;
		this.each(function () {
			widthReturn = this.offsetWidth;
		});
		return widthReturn;
	} else {
		this.each(function () {
			this.style.width = value;
		});
	}
};

$nico.fn.css = function (property) {
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

$nico.fn.scrollTop = function () {
	var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

	if (value === false) {
		var supportPageOffset = window.pageXOffset !== undefined;
		var isCSS1Compat = (document.compatMode || "") === "CSS1Compat";

		var topValue = void 0;

		if (this[0] == window) {
			topValue = supportPageOffset ? window.pageYOffset : isCSS1Compat ? document.documentElement.scrollTop : document.body.scrollTop;
			return topValue;
		} else {
			this.each(function () {
				topValue = this.scrollTop;
				return topValue;
			});
		}
	} else {}
};

$nico.fn.scrollLeft = function () {
	var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

	if (value === false) {
		var supportPageOffset = window.pageXOffset !== undefined;
		var isCSS1Compat = (document.compatMode || "") === "CSS1Compat";

		var leftValue = void 0;

		if (this[0] == window) {
			leftValue = supportPageOffset ? window.pageXOffset : isCSS1Compat ? document.documentElement.scrollLeft : document.body.scrollLeft;
			return leftValue;
		} else {
			this.each(function () {
				leftValue = this.scrollLeft;
				return leftValue;
			});
		}
	} else {}
};

$nico.fn.on = function (evt, callback, callbackObj) {
	var toReturn = false;
	if (this.length) {
		this.each(function () {
			var element = this;
			element.addEventListener(evt, function (event) {

				if (event.target == element) {
					toReturn = true;
					callback.apply(element);
					var callReturn = callback();
					console.log(callReturn);
					if (callReturn === false) {
						event.preventDefault();
						event.stopPropagation();
					}
				}
			}, false);
		});
	} else {
		var element = this[0];
		document.addEventListener(evt, function (event) {
			if (event.target.matches(element)) {
				if (callback.call() === false) {
					event.preventDefault();
					event.stopPropagation();
				}
			}
		}, false);
	}
};

//console.log($('#main-navi.is-fixed a'));

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

var setNavi = function setNavi() {
	var windowScroll = $nico(window).scrollTop();
	var headerHeight = $nico('#header').height();
	var naviHeight = $nico('#main-navi').height();

	if (windowScroll > headerHeight - (naviHeight + 58)) {
		if (!$nico('#main-navi').hasClass('is-fixed')) {
			$nico('#main-navi').addClass('is-fixed');
		}
	} else {
		if ($nico('#main-navi').hasClass('is-fixed')) {
			$nico('#main-navi').removeClass('is-fixed');
		}
	}
	if (windowScroll > headerHeight - (naviHeight + 110)) {
		if (!$nico('#header').hasClass('is-small')) {
			$nico('#header').addClass('is-small');
		}
	} else {
		if ($nico('#header').hasClass('is-small')) {
			$nico('#header').removeClass('is-small');
		}
	}
};

// $nico('#main-navi.is-fixed a').on('click', function(){
// 	console.log('click 2');
// 	return false;
// });

$nico('#main-navi a').on('click', function () {
	console.log('click');
	console.log(this);

	//let target = this.attr('href');
	return false;
});

window.onload = function (e) {}
//console.log($nico('.main-visual img').width());
//console.log($nico('.main-visual img').height());


//console.log($nico('.main-visual img').width());
//console.log($nico('.main-visual img').height());

;window.onscroll = function (e) {
	setNavi();
};
window.onresize = function (e) {
	setNavi();
};