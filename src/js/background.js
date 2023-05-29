let conf = '/src/js/conf/dark-particles-config.json'
if(!document.getElementsByTagName('html')[0].classList.contains('dark')) {
    conf = '/src/js/conf/light-particles-config.json'
}

particlesJS.load('particles-js', conf, function() {
    console.log('callback - particles.js config loaded');
});