import jump from 'jump.js';

(function (window, document, undefined) {
	'use strict';

	// TODO: smooth scroll arrows (hero/footer)
	// TODO: blur (5px max) section content on scroll in/out
	// TODO: craete svg logo and animate on page load

	const nav = document.querySelector('nav');
	const hero = document.querySelector('.hero');
	const upArrow = document.getElementById('goUp');
	const downArrow = document.getElementById('goDown');

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

	navExpand();

	function goDown(e) {
		e.preventDefault();
		jump('section', {
			duration: 500,
			offset: -32
		});
	}

	upArrow.addEventListener('click', (e) => {
		e.preventDefault();
		jump('body', {
			duration: 1000
		});
	});

	downArrow.addEventListener('click', goDown);

	console.log('send me an email: info@adamfratino.com');

})(window, document);
