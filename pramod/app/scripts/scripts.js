'use stict';

$(function (){

	// Variables
	var $window = $(window),
		$mainWrapper = $('.main-wrapper'),
		$headerWrapper = $mainWrapper.find('.header'),
		$headerMenuBtn = $mainWrapper.find('.btn-menu'),
		$textillate = $mainWrapper.find('.tlt'),
		$sliderSection = $mainWrapper.find('.slider-section-slider'),

		$nextProjectImg = $('.next-project-img img'),
		$nextProjectLink = $('.next-project-link'),

		$projectsMoreDetails = $('.project-more-detail-wrapper');

	// Private Functions

	// Skrollr Init // Disable < 1025px
	$window.on('load resize', function () {
		if ($window.width() >= 1025) {
			skrollr.init({
				forceHeight: false
			});
		}

	  	if ($window.width() < 1025) {
	      skrollr.init().destroy();
	    }
	});

	// Navigation Button
	$headerMenuBtn.on('click touchend', function(e){
		e.preventDefault();

		$mainWrapper.toggleClass('menu-exposed');
		$headerWrapper.toggleClass('expand');
		$headerMenuBtn.toggleClass('close');
	});

	// Textillate Init
	if ($textillate.length) {
		$textillate.textillate({
			selector: '.curious',
			autoStart: true,
			initialDelay: 500,
			in: {
				effect: 'fadeIn',
				delay: 25,
				shuffle: true
			}
		});
	}

	// Slick Slider Init
	if ($sliderSection.length) {
		$sliderSection.slick({
	  		infinite: false,
	  		fade: true,
	  		dots: true
	  	});
	}

	if ($nextProjectLink.length) {
		$nextProjectLink.hover(function(){
			$nextProjectImg.addClass('scaled');
		}, function(){
			$nextProjectImg.removeClass('scaled');
		});
	}

	if ($projectsMoreDetails.length) {
		$projectsMoreDetails.each(function(){
			var $this = $(this),
				$moreDetailSection = $this.find('.more-details-content'),
				$moreDetailBtn = $moreDetailSection.find('.more-detail-btn'),
				$showLessBtn = $moreDetailSection.find('.show-less-btn'),
				$showMoreSection = $moreDetailSection.find('.show-more-section');

			$moreDetailBtn.on('click touchend', function(e){
				e.preventDefault();

				$showMoreSection.addClass('show');
				$(this).addClass('hide');
			});

			$showLessBtn.on('click touchend', function(e){
				e.preventDefault();

				$showMoreSection.removeClass('show');
				$(this).removeClass('hide');
			});
		});
	}
	
});