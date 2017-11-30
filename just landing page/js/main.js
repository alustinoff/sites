$(document).ready(function(){

	var video = document.getElementById("video");

	$('.play-button').on('click', function(e){
		e.preventDefault();

		var 
			$this = $(this),
			playButton = $('.play-button');

		if(video.paused){
			video.play();
			playButton.addClass('play-button_active');
		}
		else{
			video.pause();
			playButton.removeClass('play-button_active');
		}

		
	});

});