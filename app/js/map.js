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
							'<use xlink:href="image/svg/sprite.svg#logo1"></use>',	
						'</svg>',
						'улица Подвойского, 42',
					'</div>'
			]
	}
];

ymaps.ready(function () {     
	var myMap = new ymaps.Map('map', {
			center: [59.94, 30.32],
			zoom: 11,
			controls: ['zoomControl'],
			behaviors: ['drag']
	}, {
			searchControlProvider: 'yandex#search'
	});

	var customIcon = ymaps.templateLayoutFactory.createClass('<svg width="46" height="57"><use xlink:href="image/svg/sprite.svg#map-marker"></use></svg>');

	myPlacemarks.forEach(function(obj) {
		var myPlacemark = new ymaps.Placemark([obj.latitude, obj.longitude], { 
						hintContent: obj.hintContent, 
						balloonContent: obj.balloonContent.join('') 
				},
				{
					iconLayout: 'default#image',
							iconImageHref: 'image/svg/map-marker.svg',
							iconImageSize: [46, 57],
							iconImageOffset: [-23, -57]
				}
				);

			myMap.geoObjects.add(myPlacemark);
	})
});