const navExpand = function() {

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

module.exports = navExpand();
