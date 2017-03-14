(function (window, document, undefined) {
	'use strict';

	// TODO: smooth scroll arrows (hero/footer)
	// TODO: blur (5px max) section content on scroll in/out
	// TODO: craete svg logo and animate on page load

	const nav = document.querySelector('nav');

	function navExpand() {

	  let previousPosition = window.pageYOffset || document.documentElement.scrollTop;

	  window.onscroll = function() {
	    let currentPosition = window.pageYOffset || document.documentElement.scrollTop;

	    if (previousPosition > currentPosition) {
	      nav.className = 'expand';
	    } else {
	      nav.className = '';
	    }

	    previousPosition = currentPosition;
	  };
	}

	function goUp() {
	  const upArrow = document.getElementById('goUp');
	  upArrow.addEventListener('click', function(e) {
	    e.preventDefault();
			// scroll to top
	  });
	}

	navExpand();
	goUp();

})(window, document);
