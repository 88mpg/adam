import jump from 'jump.js';

const upArrow = document.getElementById('goUp');
const downArrow = document.getElementById('goDown');

const arrowScrolls = function() {

  function goDown(e) {
  	e.preventDefault();
  	jump('section', {
  		duration: 500,
  		offset: -32
  	});
  }

  function goUp(e) {
  	e.preventDefault();
  	jump('body', {
  		duration: 1000
  	});
  }

  downArrow.addEventListener('click', goDown);
  upArrow.addEventListener('click', goUp);
}

module.export = arrowScrolls();
