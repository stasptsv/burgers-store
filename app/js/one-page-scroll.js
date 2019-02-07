$(".wrapper").onepage_scroll({
	sectionContainer: "section",
	easing: "ease",
	animationTime: 1000,
	pagination: true,
	updateURL: true,
	beforeMove: function(index) {},
	afterMove: function(index) {},
	loop: false,
	keyboard: true,
	responsiveFallback: false,
	direction: "vertical"  
});

let navigation = function() {
	let startPage = document.querySelector('.section-main');
	let navMbLink = document.querySelector('.navigation-mobile__link');

	navMbLink.addEventListener('click', (event) => {
		event.preventDefault();
		$('.wrapper').moveTo(2)
	})

	startPage.addEventListener('click', function(event) {
		if (event.target.className === 'navigation-link' || 
			event.target.classList.contains('order-link') ||
			event.target.classList.contains('down-arrow__icon')) {
			event.preventDefault();
			$('.wrapper').moveTo(event.target.dataset.index);
		}
	});
}

navigation();