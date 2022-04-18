function fadeOutEffect() {
    var fadeTarget = document.getElementById("loader");
    var fadeEffect = setInterval(function () {
        if (!fadeTarget.style.opacity) {
            fadeTarget.style.opacity = 1;
        }
        if (fadeTarget.style.opacity > 0) {
            fadeTarget.style.opacity -= 0.1;
        } else {
            clearInterval(fadeEffect);
            fadeTarget.style.display="none";
        }
    }, 50);
}
document.addEventListener('readystatechange', (event) => {
	if(document.readyState == "complete") {
		fadeOutEffect();
        document.getElementById("body").classList.remove("hide");
	}
});