function parallax(){
	$('.primo-piano').parallax({
		imageSrc: 'assets/img/c.png',
		naturalWidth: 2667,
	    naturalHeight: 2134,
	    speed: 0.8
	});
	$('.secondo-piano').parallax({
		imageSrc: 'assets/img/a.png',
		naturalWidth: 2667,
	    naturalHeight: 2134,
	    speed: 0.4
	});
}

function display_text(){
	var scroll = $(window).scrollTop();
	var text = $('#paragrafo_2');
	var text_location = text.offset().top - 300;

	if (scroll >= text_location) {
		text.removeClass('fadeOut').addClass('fadeIn');
	} else {
		text.removeClass('fadeIn').addClass('fadeOut');
	}
}

$(document).ready(function() {
	parallax();
});

$(window).scroll(function() {
	display_text();
});