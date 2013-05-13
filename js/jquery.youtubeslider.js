$( document ).ready(function() {


	function videoSwitch(videoItem) {
		var id = $(videoItem).data('video');
		if(id == '' || id == undefined || $(videoItem).hasClass('active')) {
			return false;
		}

		// Set Video
		$('#video-player').attr('src', 'http://www.youtube.com/embed/' + id + '?rel=0&amp;showinfo=0&amp;autoplay=1');
		$('.video-select li.active').removeClass('active');
		$(videoItem).addClass('active');
	}

	function getInfo(videoItem) {
		var id = $(videoItem).data('video');
		$.getJSON('http://gdata.youtube.com/feeds/api/videos/'+id+'?v=2&alt=jsonc',function(data,status,xhr){

	    var title = data.data.title;
	    // Make Time into Something Useful
	    var rawDuration = data.data.duration;
				var time = parseInt(rawDuration,10);
				time = time < 0 ? 0 : time;
				var minutes = Math.floor(time / 60);
				var seconds = time % 60;
				minutes = minutes < 9 ? "0"+minutes : minutes;
				seconds = seconds < 9 ? "0"+seconds : seconds;

		$(videoItem).append(
				'<h2>'+title+'</h2><img src="http://img.youtube.com/vi/'+id+'/0.jpg"><p class="Duration">'+minutes+":"+seconds+'</p>');
		});
	}

	videoSwitch('.videoSliderContainer li:first-of-type');

	$('.videoSliderContainer li').each(function() {
		getInfo(this); // Get all content for each item
	});

	$('.videoSliderContainer li').on("click", function() {
		videoSwitch(this); // Switch Videos on Click
	});


});