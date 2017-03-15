$(document).ready(function(){
    //====================================
    //--------- Functions ----------------
    //====================================

    // Returns a function, that, as long as it continues to be invoked, will not
    // be triggered. The function will be called after it stops being called for
    // N milliseconds. If `immediate` is passed, trigger the function on the
    // leading edge, instead of the trailing.
    function debounce(func, wait, immediate) {
        var timeout;
        return function () {
            var context = this;
            var args = arguments;

            var later = function () {
                timeout = null;
                if (!immediate) {
                    func.apply(context, args);
                }
            };

            var callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) {
                func.apply(context, args);
            }
        };
    }

    // HOW IT USE
    // var myEfficientFn = debounce(function () {
    //     // All the taxing stuff you do
    // }, 250);
    //
    // window.addEventListener('resize', myEfficientFn);
    function equalHeight(container) {
        var currentTallest = 0;
        var currentRowStart = 0;
        var rowDivs = new Array();
        var $el;
        var topPosition = 0;

        $(container).each(function () {

            $el = $(this);
            $($el).height('auto');
            topPostion = $el.position().top;

            if (currentRowStart !== topPostion) {
                for (currentDiv = 0; currentDiv < rowDivs.length; currentDiv++) {
                    rowDivs[currentDiv].height(currentTallest);
                }
                rowDivs.length = 0; // empty the array
                currentRowStart = topPostion;
                currentTallest = $el.height();
                rowDivs.push($el);
            } else {
                rowDivs.push($el);
                currentTallest = (currentTallest < $el.height()) ? ($el.height()) : (currentTallest);
            }

            for (currentDiv = 0; currentDiv < rowDivs.length; currentDiv++) {
                rowDivs[currentDiv].height(currentTallest);
            }
        });
    }
    // Miss click
    function missClick(div) {
        if (!div.is(e.target) && // если клик был не по нашему блоку
            div.has(e.target).length === 0) { // и не по его дочерним элементам
            div.hide(); // скрываем его
        }
    }
    // END Miss click

    // Обертка для вызова функции
    // jQuery(function ($) {
    //     $(document).mouseup(function (e) { // событие клика по веб-документу
    //         // Вызываем функцию с необходимым параметром при клике
    //     });
    // });
    // Responsive iframe video

    	// Setting
    	var contentContainer = $('.open-news');
    	var videoWrapper = '<div class="embed-responsive embed-responsive-16by9"></div>';

    // END Responsive iframe video

    //====================================
    //--------- Custom Scripts -----------
    //====================================

    function initializeMap() {

        var isMobile = {
            Android: function () {
                return navigator.userAgent.match(/Android/i);
            },
            BlackBerry: function () {
                return navigator.userAgent.match(/BlackBerry/i);
            },
            iOS: function () {
                return navigator.userAgent.match(/iPhone|iPad|iPod/i);
            },
            Opera: function () {
                return navigator.userAgent.match(/Opera Mini/i);
            },
            Windows: function () {
                return navigator.userAgent.match(/IEMobile/i);
            },
            any: function () {
                return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
            }
        };
        var styles = [
            {
                "featureType": "road",
                "elementType": "geometry",
                "stylers": [
                    {
                        "lightness": 100
                    },
                    {
                        "visibility": "simplified"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "geometry",
                "stylers": [
                    {
                        "visibility": "on"
                    },
                    {
                        "color": "#C6E2FF"
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#C5E3BF"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#D1D1B8"
                    }
                ]
            }
        ];
        var styledMap = new google.maps.StyledMapType(styles, {name: "Styled Map"});

        var myLatLng = new google.maps.LatLng(50.071036,14.402522);
        var drag = !isMobile.any();
        var mapOptions = {
            zoom: 16,
            center: myLatLng,
            scrollwheel: false,
            draggable: drag,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var map = new google.maps.Map(document.getElementById("map"), mapOptions);
        map.mapTypes.set('map_style', styledMap);
        map.setMapTypeId('map_style');


    	var image = '/images/main/marker.png'; // icon map image
    	var beachMarker = new google.maps.Marker({
    		position: myLatLng,
    		map: map,
    		icon: image
    	});
    //    var marker = new google.maps.Marker({
    //        position: myLatLng,
    //        map: map
    //    });
    }
    google.maps.event.addDomListener(window, "load", initializeMap);
	 $(function () {
	 	$(window).scroll(function () {
	 		if ($(this).scrollTop() > 0 && !$('.go-top').hasClass('scrolling')) {
	 			$('.go-top').addClass('active-top');
	 		}
	 		else {
	 			$('.go-top').removeClass('active-top');
	 		}
	 	});
	 	$('.go-top').click(function () {
	 		$('body,html').animate({
	 			scrollTop: 0
	 		}, 900, function () {
	 			$('.go-top').removeClass('active-top');
	 		});
	 	});
	 });
    // Modal popup

    var cookie = document.cookie;
    var date = new Date();

    // Modal show timer
    if (cookie.indexOf('popclose=submited') === -1) {
        setTimeout(function () {
            $('#Modal').modal('show');
        }, 2000); // Time popUp
    }

    $('#Modal .close').click(function () {
        date.setDate(date.getDate() + 14);
        document.cookie = 'popclose=submited; expires=' + date.toGMTString();
    });

    $('#Modal').click(function (data, handler) {
        if (data.target === this) {
            date.setDate(date.getDate() + 14);
            document.cookie = 'popclose=submited; expires=' + date.toGMTString();
        }
    });

    // For form id
    $('#lottery-popup-form').on('beforeSubmit', function () {
        date.setDate(date.getDate() + 365);
        document.cookie = 'popclose=submited; expires=' + date.toGMTString();
    });
    // End Modal popup script

    //====================================
    //--------- Setting libs -------------
    //====================================
	//	  Hamburger

		$(".hamburger").click(function () {
			if($('.hamburger').hasClass("is-active") == true) {
				$('body').removeClass('modal-open');
				$('div.nav-backdrop').remove();
				$('.hamburger').removeClass('is-active');
				$('nav').removeClass('menu-active');


			}

			else {
				$('body').addClass('modal-open').append('<div class="modal-backdrop nav-backdrop fade in"></div>');
				$(this).toggleClass("is-active");
				$('nav').addClass('menu-active');

				$('.nav-backdrop').click(function () {
					$('.hamburger').removeClass('is-active');
					$('body').removeClass('modal-open');
					$('nav').removeClass('menu-active');
					$(this).remove();
				});

			}

			});

	//	  Привоение активного класса меню

		  	$(".menu-list > a").click(function(e){
				$("a.active-link").removeClass("active-link");
				$(e.target).addClass("active-link");
			});

		  function windowSize(){
			   if (window.innerWidth >= 768) {
					$('div.nav-backdrop').remove();
				   	$('body').removeClass('modal-open');
				   	$('.left-block').removeClass('height-left-block');
			   } else {
				   $('.left-block').addClass('height-left-block');
			   }
		   }
	 		$(window).resize(windowSize);
	//	Слик карусель спикеров
	$('.wrap-slick').slick({
		dots: true,
		infinite: true,
		speed: 300
		, slidesToShow: 3
		, slidesToScroll: 3
		, responsive: [
			{
				breakpoint: 991
				, settings: {
					slidesToShow: 2
					, slidesToScroll: 2
					, infinite: true
					, dots: true
				}
			}
			, {
				breakpoint: 600
				, settings: {
					slidesToShow: 1
					, slidesToScroll: 1
				, }
			}
			, // You can unslick at a given breakpoint now by adding:
			// settings: "unslick"
			// instead of a settings object
		  ]
	});
	//	Слик карусель партнеров
	$('.slick-partner').slick({
		dots: true
		, infinite: true
		, speed: 300
		, rows: 2
		, slidesToShow: 5
		, slidesToScroll: 5
		, responsive: [
			{
				breakpoint: 1199
				, settings: {
					slidesToShow: 4
					, slidesToScroll: 4
					, infinite: true
					, dots: true
				}
			}
			, {
				breakpoint: 991
				, settings: {
					slidesToShow: 3
					, slidesToScroll: 3
				}
			}
			, {
				breakpoint: 768
				, settings: {
					slidesToShow: 2
					, slidesToScroll: 2
				}
			}
			, {
				breakpoint: 600
				, settings: {
					slidesToShow: 1
					, slidesToScroll: 1
				}
			}
			// You can unslick at a given breakpoint now by adding:
			// settings: "unslick"
			// instead of a settings object
		  ]
	});
	//	Слик карусель партнеров на странице спонсоров
	$('.slick-partner-page').slick({
		dots: true
		, infinite: true
		, speed: 300
		, rows: 4
		, slidesToShow: 5
		, slidesToScroll: 5
		, responsive: [
			{
				breakpoint: 1199
				, settings: {
					slidesToShow: 4
					, slidesToScroll: 4
					, infinite: true
					, dots: true
				}
			}
			, {
				breakpoint: 991
				, settings: {
					slidesToShow: 3
					, slidesToScroll: 3
				}
			}
			, {
				breakpoint: 768
				, settings: {
					slidesToShow: 2
					, slidesToScroll: 2
				}
			}
			, {
				breakpoint: 600
				, settings: {
					slidesToShow: 1
					, slidesToScroll: 1
				}
			}
			// You can unslick at a given breakpoint now by adding:
			// settings: "unslick"
			// instead of a settings object
		  ]
	});
	//	Слик карусель отзывов
	$('.comments').slick({
		dots: true
		, infinite: true
		, adaptiveHeight: true
		, speed: 300
		, rows: 1
		, slidesToShow: 1
		, slidesToScroll: 1
	, });
	//	Magnific popUp
			$(document).ready(function() {
				$('.gallery').magnificPopup({
					delegate: 'a',
					type: 'image',
					tLoading: 'Loading image #%curr%...',
					mainClass: 'mfp-img-mobile',
					gallery: {
						enabled: true,
						navigateByImgClick: true,
						preload: [0,1] // Will preload 0 - before current, and 1 after the current image
					},
					image: {
						tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
						titleSrc: function(item) {
							return item.el.attr('title') + '<small>by Marsel Van Oosten</small>';
						}
					}
				});
			});


    //====================================
    //-------- Only this site ------------
    //====================================
	//	  Валидация

		$('.form-control').on("focus", function(e) {
			console.log(e.target);
			$(e.target).siblings('.validation-error').addClass('validation-active');
		});

		 $('.form-control').on("blur", function() {
			$(".validation-error").removeClass('validation-active');
		});
	// Program tabs
	////////////////////////////////////////////////

	$('.more a').click(function () {
		$('.wrap-more a').removeClass('active-more');
		$(this).addClass('active-more');
	});




});
