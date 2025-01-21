document.querySelector('.explore-button').addEventListener('click', function(e) {
    e.preventDefault();
    const targetElement = document.querySelector('#rush');
    const yOffset = -122;
    const y = targetElement.getBoundingClientRect().top + window.pageYOffset + yOffset;

    window.scrollTo({ top: y, behavior: 'smooth' });
});