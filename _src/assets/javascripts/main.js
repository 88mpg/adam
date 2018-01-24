import jump from 'jump.js';

const upArrow = document.querySelector('.scroll.js-up');
const downArrow = document.querySelectorAll('.scroll.js-down');

function goDown(target) {
	jump(target, {
		duration: 500,
		offset: -32
	});
}

upArrow.addEventListener('click', e => {
	e.preventDefault();
	jump('body', {
		duration: 1000
	});
});

downArrow.forEach(arrow => {
  let nextSection = arrow.parentElement.nextElementSibling
  arrow.addEventListener('click', e => {
    goDown(nextSection)
  })
})

console.log('send me an email: info@adamfratino.com');
