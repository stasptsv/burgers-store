window.addEventListener('DOMContentLoaded', function() {

	// Feedback Popup
	let popupFeedback = document.querySelector('.feedback-popup');
	let viewBtn = document.querySelectorAll('.feedback-view');
	let closeBtn = document.querySelectorAll('.feedback-full__close');

	// Open Popup
	viewBtn.forEach(function (item) {
		item.addEventListener('click', (event) => {
			event.preventDefault();
			popupFeedback.classList.add('popup-show');
		});
	});

	// Close Popup
	closeBtn.forEach(function(item) {
		item.addEventListener('click', () => {
			popupFeedback.classList.remove('popup-show');
		});
	});

	// Vertical Accordeon
	let accordeon = (function() {
		let accContent = document.querySelector('.team-list');
		let isClicked = false;
		let isAnimOver = true;
	
		let _toggleAccordeon = function(elem) {
			if (isClicked) {
				let activeItem = accContent.querySelector('.active-item__team');
				activeItem.classList.remove('active-item__team');
				activeItem.querySelector('.team-list__item-content').classList.remove('show');
			}
			elem.classList.toggle('active-item__team');
			let elemContent = elem.querySelector('.team-list__item-content');
			elemContent.classList.add('show')
			isClicked = true;
		}
	
		let addListener = function() {
			accContent.addEventListener('click', function(event) {
				let itemClicked = event.target.parentElement;
				let isTrigger = (event.target.className === 'team-trigger');
				if (isTrigger && isAnimOver
					&& itemClicked.classList.contains('active-item__team')) {
						itemClicked.classList.remove('active-item__team');
						itemClicked.querySelector('.team-list__item-content').classList.remove('show');
						isClicked = false;
						isAnimOver = false;
						setTimeout(function() {isAnimOver = true;}, 600);
				} else if (isTrigger && isAnimOver) {
					_toggleAccordeon(itemClicked);
					isAnimOver = false;
					setTimeout(function() {isAnimOver = true;}, 600);
				}
			})
		}
	
		return {
			init: addListener
		};
	})();
	accordeon.init();

	
	// Horizontal Accordeon
	let accordeonHorizontal = (function() {
		let accordeon = document.querySelector('.menu-list');
		let triggerWidth;
		let isClicked = false;
		let isPhone = window.innerWidth <= 480;
		
		if (isPhone) {
			accordeon.style.left = accordeon.getBoundingClientRect().left + 'px';
		}
	
		let widthContent = function() {
			let itemQuantity = 3;
			
			if (isPhone) {itemQuantity = 1;}
			let computedWidth = window.innerWidth - itemQuantity * triggerWidth;
	
			return computedWidth > 540 ? 540 : computedWidth;
		}
	
		let toggleAccordeon = function(elem) {
			let initialLeft = window.innerWidth - 3 * triggerWidth + 'px';
			
			if (isClicked) {
				let isOpenedItemClicked = elem.classList.contains('active-acc');
				let activeItem = accordeon.querySelector('.active-acc');
				
				activeItem.classList.toggle('active-acc');
				activeItem.querySelector('.menu-item__content').style.width = 0;
				isClicked = false;
				
				if (isOpenedItemClicked) {
					if (isPhone) {
						accordeon.style.left = initialLeft;}
					return;
				}
			}
			elem.classList.toggle('active-acc');
			
			let elemContent = elem.querySelector('.menu-item__content');
			elemContent.style.width = widthContent() + 'px';
			
			if (isPhone) {
				accordeon.style.left = [].indexOf.call(accordeon.children, elem) * (-(triggerWidth)) + 'px';
			}
			isClicked = true;
		}
	
		let addListeners = function() {
			accordeon.addEventListener('click', function(event) {
				let target = event.target.closest('.menu-trigger');
			
				isPhone = window.innerWidth <= 480;
				triggerWidth = parseInt(getComputedStyle(accordeon.querySelector('.menu-trigger')).width);
				if (target) {
					toggleAccordeon(target.parentElement);}
			})
	
			let crosses = accordeon.querySelectorAll('.menu-item__close');
			for (let i = 0; i < crosses.length; i++) {
				crosses[i].addEventListener('click', function() {
				toggleAccordeon(crosses[i].closest('.active-acc'));
			});
			}
		}
		return {init: addListeners};
	})();
	
	accordeonHorizontal.init();
	

	// Form 
	let message = {
			loading: 'Загрузка...',
			success: 'Спасибо! Скоро мы с вами свяжемся!',
			failure: 'Что-то пошло не так...'
	}

	let form = document.querySelector('.order-form'),
			input = document.querySelector('input'),
			modal =	document.querySelector('.modal'),
			statusMessage = modal.querySelector('.modal-title'),
			modalBtnClose = modal.querySelector('.button-modal');

	modalBtnClose.addEventListener('click', (event) => {
		event.preventDefault();
		modal.classList.remove('modal-show');
	})

	form.addEventListener('submit', function(event) {
		event.preventDefault();

		let request = new XMLHttpRequest();

		request.open('POST', 'server.php');
		request.setRequestHeader('Content-type', 'application/json; charset=utf-8');

		let formData = new FormData(form);

		let obj = {};
		formData.forEach(function(value, key) {
				obj[key] = value;
		});
		
		let json = JSON.stringify(obj);

		request.send(json);

		request.addEventListener('readystatechange', function() {
			if (request.readyState < 4) {
				modal.classList.add('modal-show');
				statusMessage.innerHTML = message.loading;
			} else if(request.readyState === 4 && request.status == 200) {
				modal.classList.add('modal-show');	
				statusMessage.innerHTML = message.success;
			} else {
					statusMessage.classList.add('modal-show');
					statusMessage.innerHTML = message.failure;
				}
			});

		for (let i = 0; i < input.length; i++) {
			input[i].value = '';
		}
	});

	// Open Mobile Navigation
	function openNavigation() {
		let mobileNav = document.querySelector('.mobile-menu');
		
		mobileNav.style.height = '100%';
	}

	function closeNavigation() {
		let mobileNav = document.querySelector('.mobile-menu');
		
		mobileNav.style.height = '0';
	}

	let humburger = document.querySelector('.hamburger');
	let btnClose = document.querySelector('.navigation-mobile__close');

	humburger.addEventListener('click', (event) => {
		event.preventDefault();
		openNavigation();
	});

	btnClose.addEventListener('click', (event) => {
		event.preventDefault();
		closeNavigation();
	});

	// Slider
	let slideIndex = 1;
	let slidesImage = document.querySelectorAll('.slider-item');
	let slidesTitle = document.querySelectorAll('.section-title__burgers');
	let slidesDescr = document.querySelectorAll('.burger-descr');
	let arrowPrev = document.querySelector('.arrow-prev');
	let arrowNext = document.querySelector('.arrow-next');
	let price = document.querySelectorAll('.burger-price');

	showSlidesImage(slideIndex);
	
	function showSlidesImage(n) {
		if (n > slidesImage.length) {
			slideIndex = 1;
		} if (n < 1) {
			slideIndex = slidesImage.length;
		}

		slidesImage.forEach((item) => { // Перебор всех слайдов
			item.style.display = 'none'; // Скрыть все слайды
		});

		slidesTitle.forEach((item) => {
			item.style.display = 'none';
		});

		price.forEach((item) => {
			item.style.display = 'none'
		})

		slidesDescr.forEach((item) => {
			item.style.display = 'none';
		});

		slidesImage[slideIndex - 1].style.display = 'block'; // Показать первый слайд
		slidesTitle[slideIndex - 1].style.display = 'block';
		slidesDescr[slideIndex - 1].style.display = 'block'; 
		price[slideIndex - 1].style.display = 'block';
	}

	function nextSlides(n) { // Смена слайдов
		showSlidesImage(slideIndex += n);
	}

	function currentSlide(n) {
		showSlidesImage(slideIndex = n);
	}

	arrowPrev.addEventListener('click', function() {
		nextSlides(-1);
	});

	arrowNext.addEventListener('click', function() {
		nextSlides(1);
	});

	// Video
	function findVideos() {
		let videos = document.querySelectorAll('.video');
	
		for (let i = 0; i < videos.length; i++) {
			setupVideo(videos[i]);
		}
	}
	
	function setupVideo(video) {
		let link = video.querySelector('.video-link');
		let media = video.querySelector('.video-media');
		let button = video.querySelector('.video-button');
		let id = parseMediaURL(media);
	
		video.addEventListener('click', () => {
			let iframe = createIframe(id);
	
			link.remove();
			button.remove();
			video.appendChild(iframe);
		});
	
		link.removeAttribute('href');
		video.classList.add('video__enabled');
	}
	
	function parseMediaURL(media) {
		let regexp = /https:\/\/i\.ytimg\.com\/vi\/([a-zA-Z0-9_-]+)\/mqdefault\.jpg/i;
		let url = media.src;
		let match = url.match(regexp);
	
		return match[1];
	}
	
	function createIframe(id) {
		let iframe = document.createElement('iframe');
	
		iframe.setAttribute('allowfullscreen', '');
		iframe.setAttribute('allow', 'autoplay');
		iframe.setAttribute('src', generateURL(id));
		iframe.classList.add('video-media');
	
		return iframe;
	}
	
	function generateURL(id) {
		let query = '?rel=0&showinfo=0&autoplay=1';
	
		return 'https://www.youtube.com/embed/' + id + query;
	}
	
	findVideos();
	

	// Yandex Map 
	ymaps.ready();

	let myPlacemarks = [
		{
			latitude: 59.97,
			longitude: 30.31,
			hintContent: 'ул. Литераторов, д. 19А',
			balloonContent: [
				'<div class="map-balloon">',
					'<svg class="map-balloon__img">',
						'<use xlink:href="image/svg/sprite.svg#logo"></use>',	
					'</svg>',
					'ул. Литераторов, д. 19А',
				'</div>'
			]
		},
		{
			latitude: 59.945,  
			longitude: 30.38,
			hintContent: 'Калужский переулок, 9',
			balloonContent: [
				'<div class="map-balloon">',
					'<svg class="map-balloon__img" >',
						'<use xlink:href="image/svg/sprite.svg#logo"></use>',	
					'</svg>',
					'Калужский переулок, 9',
				'</div>'
			]
		},
		{
			latitude: 59.89,
			longitude: 30.32,
			hintContent: 'Московский проспект, 109',
			balloonContent: [
				'<div class="map-balloon">',
					'<svg class="map-balloon__img">',
						'<use xlink:href="image/svg/sprite.svg#logo"></use>',	
					'</svg>',
					'Московский проспект, 109',
				'</div>'
			]
		},
		{
			latitude: 59.918,
			longitude: 30.493,
			hintContent: 'улица Подвойского, 42',
			balloonContent: [
				'<div class="map-balloon">',
					'<svg class="map-balloon__img">',
						'<use xlink:href="image/svg/sprite.svg#logo"></use>',	
					'</svg>',
					'улица Подвойского, 42',
				'</div>'
			]
		}
	];

	ymaps.ready(function () {     
		let myMap = new ymaps.Map('map', {
				center: [59.94, 30.32],
				zoom: 11,
				controls: ['zoomControl'],
				behaviors: ['drag']
		}, {
				searchControlProvider: 'yandex#search'
		});

		let customIcon = ymaps.templateLayoutFactory.createClass('<svg width="46" height="57"><use xlink:href="image/svg/sprite.svg#map-marker"></use></svg>');

		myPlacemarks.forEach(function(obj) {
			let myPlacemark = new ymaps.Placemark([obj.latitude, obj.longitude], { 
				hintContent: obj.hintContent, 
				balloonContent: obj.balloonContent.join('') 
			},
			{
				iconLayout: 'default#image',
				iconImageHref: 'image/svg/map-marker.svg',
				iconImageSize: [46, 57],
				iconImageOffset: [-23, -57]
			});

				myMap.geoObjects.add(myPlacemark);
		});
	});
	
});