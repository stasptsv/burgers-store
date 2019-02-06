window.addEventListener('DOMContentLoaded', function() {

	// Vertical Accordeon
	let triggers = document.querySelectorAll('.team-trigger');
	let accContent = document.querySelectorAll('.team-list__item-content');

	triggers.forEach(function(item) {
		item.addEventListener('click', () => {
			accContent.forEach(function(item) {
				item.classList.remove('show')
				item.previousElementSibling.classList.remove('active-item_team')
			});
			item.nextElementSibling.classList.toggle('show');
			item.classList.toggle('active-item__team');
		}); 
	});

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

	// Slider
	let slideIndex = 1;
	let slideIndexTitle = 1;
	let slideIndexDescr = 1;
	let slidesImage = document.querySelectorAll('.slider-item');
	let slidesTitle = document.querySelectorAll('.section-title__burgers');
	let slidesDescr = document.querySelectorAll('.burger-descr');
	let arrowPrev = document.querySelector('.arrow-prev');
	let arrowNext = document.querySelector('.arrow-next');
	let price = document.querySelectorAll('.burger-price');

	showSlidesImage(slideIndex);
	// showSlidesTitle(slideIndexTitle);
	// showSlidesDescr(slideIndexDescr);
	
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
	})
});