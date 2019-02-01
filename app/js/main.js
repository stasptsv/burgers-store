window.addEventListener('DOMContentLoaded', function() {

	// Vertical Accordeon
	let triggers = document.querySelectorAll('.team-trigger');
	let accContent = document.querySelectorAll('.team-list__item-content');

	triggers.forEach(function(item) {
		item.addEventListener('click', () => {
			accContent.forEach(function(item) {
				item.classList.remove('show')
				item.previousElementSibling.classList.remove('active')
			});
			item.nextElementSibling.classList.toggle('show');
			item.classList.toggle('active');
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
	
});