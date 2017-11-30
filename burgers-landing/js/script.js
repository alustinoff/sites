$(document).ready(function () {


	/*---------------Team-accordion--------*/
	
	$('.team-acco__trigger').on('click', function (e) {
		e.preventDefault();

		var
			$this = $(this),
			container = $this.closest('.team-acco'),
			otherContent = container.find('.team-acco__content'),
			items = container.find('.team-acco__item'),
			item = $this.closest('.team-acco__item'),
			content = item.find('.team-acco__content'),
			reqHeight = item.find('.team-acco__text-content').outerHeight();

		if (!item.hasClass('team-acco__item_active')) {
			items.removeClass('team-acco__item_active');
			item.addClass('team-acco__item_active');

			/*otherContent.css({
				'display' : 'none'
			});*/
			otherContent.slideUp('slow');

			/*content.css({
				'display' : 'block'
			});*/
			content.slideDown('slow');
		} else {
			item.removeClass('team-acco__item_active');

			/*content.css({
				'display' : 'none'
			});*/
			content.slideUp('slow');
		}
	});



	/*---------------Menu-accordion--------*/


	$('.menu-acco__trigger').on('click', function (e) {
		e.preventDefault();

		var
			$this = $(this),
			container = $this.closest('.menu-acco'),
			otherContent = container.find('.menu-acco__content'),
			items = container.find('.menu-acco__item'),
			item = $this.closest('.menu-acco__item'),
			content = item.find('.menu-acco__content'),
			reqWidth = item.find('.menu-acco__text').outerWidth();

		if (!item.hasClass('menu-acco__item_active')) {
			items.removeClass('menu-acco__item_active');
			item.addClass('menu-acco__item_active');

			otherContent.css({
				'width': 0
			});
			content.css({
				'width': reqWidth
			});
		} else {
			item.removeClass('menu-acco__item_active');
			content.css({
				'width' : 0
			});
		}
	});

	//slider


	$(function() {
		var BurgerCarousel = $('.burgers-slider').owlCarousel({
			items: 1,
			loop: true
		});

		$('.burger-slider__btn_next').on('click', function(e){
			e.preventDefault();
			BurgerCarousel.trigger('next.owl.carousel');
		});

		$('.burger-slider__btn_prev').on('click', function(e){
			e.preventDefault();
			BurgerCarousel.trigger('prev.owl.carousel');
		});
	});


//-------------------yandex-maps


	$(function () {
		ymaps.ready(init);
		var myMap;

		function init(){
			myMap = new ymaps.Map("map", {
				center: [59.93916998692174,30.309015096732622],
				zoom: 11,
				controls : [],
			});

			var coords = [
					[59.94554327989287,30.38935262114668],
					[59.91142323563909,30.50024587065841],
					[59.88693161784606,30.319658102103713],
					[59.97033574821672,30.315194906302924],
				],
				myCollection = new ymaps.GeoObjectCollection({}, {
					draggable: false,
					iconLayout: 'default#image',
					iconImageHref: 'icons/map-marker.svg',
					iconImageSize: [46, 57],
					iconImageOffset: [-26, -52]
				});

			for (var i = 0; i < coords.length; i++) {
				myCollection.add(new ymaps.Placemark(coords[i]));
			}

			myMap.geoObjects.add(myCollection);

			myMap.behaviors.disable('scrollZoom');
		}
	});

});


//-------------------one-page ckroll


$(function () {
	var
		sections = $('.section'),
		display = $('.maincontent'),
		screen = 0,
		inscroll = false;

	sections.filter(':first-child').addClass('active');

	var scrollToSection = function (sectionEq) {
		var position = 0;

		if (!inscroll) {
			inscroll = true;
			screen = sectionEq;

			position = (sections.eq(sectionEq).index() * -100) + '%';

			sections.eq(sectionEq).addClass('active')
				.siblings().removeClass('active');

			display.css({
				'transform' :  'translate3d(0,' + position + ', 0)'
			});

			setTimeout(function () {
				inscroll = false;

				$('.fixed-menu__item').eq(sectionEq).addClass('active')
					.siblings().removeClass('active');
			}, 2000)
		}
	}

	document.querySelector('.wrapper')
		.addEventListener('wheel', function (e) {
			var activeSection = sections.filter('.active');

			if (!inscroll) {

				if (e.deltaY > 0) { //скроллим вниз
					if (activeSection.next().length) {
						screen = activeSection.next().index();
					}
				}

				if (e.deltaY < 0) { //спроллим вверх
					if (activeSection.prev().length) {
						screen = activeSection.prev().index()
					}
				}

				scrollToSection(screen);
			}
		});

	$('.down-arrow').on('click', function(e){
	    e.preventDefault();

		scrollToSection(1);
	});

	$('.nav__link, .fixed-menu__link, .order-link_nav')
		.on('click', function(e){
		    e.preventDefault();

		    scrollToSection(parseInt($(this).attr('href')));
		});
  
  	$('#order-button').on('click', function(e){
        e.preventDefault();
       var data = $('form').serializeArray();
        $.ajax({
            url: '/mail.php',
            method: "POST",
            data: data
        }).done(function(data){
            console.log(data);
        })
    });

	$(document).on('keydown', function(e){
		var activeSection = sections.filter('.active');

		if (!$(e.target).is('textarea')){ 

			switch (e.keyCode){
				case 38 : //кнопка ввех
					if(activeSection.prev().length){
						screen = activeSection.prev().index();
					}
					break;

				case 40 : //кнопка вниз
					if(activeSection.next().length){
						screen = activeSection.next().index();
					}
					break;
			}
		

			scrollToSection(screen);
		}

	});
});



