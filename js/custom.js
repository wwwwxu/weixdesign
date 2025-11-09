(function () {

	'use strict'


	AOS.init({
		duration: 800,
		easing: 'slide',
		once: true
	});


	var rellax = new Rellax('.rellax');

	var preloader = function () {

		var loader = document.querySelector('.loader');
		var overlay = document.getElementById('overlayer');

		function fadeOut(el) {
			el.style.opacity = 1;
			(function fade() {
				if ((el.style.opacity -= .1) < 0) {
					el.style.display = "none";
				} else {
					requestAnimationFrame(fade);
				}
			})();
		};

		setTimeout(function () {
			fadeOut(loader);
			fadeOut(overlay);
		}, 200);
	};
	preloader();







	var countdown = function () {
		var el = document.querySelectorAll('.js-countdown');




		if (el.length > 0) {

			const finaleDate = new Date("March 22, 2022 00:00:00").getTime();

			const timer = () => {
				const now = new Date().getTime();
				let diff = finaleDate - now;

				if (diff < 0) {

					document.querySelector('.custom-alert').style.display = 'block';
					document.querySelector('.counter-wrap').style.display = 'none';
				}

				let days = Math.floor(diff / (1000 * 60 * 60 * 24));
				let hours = Math.floor(diff % (1000 * 60 * 60 * 24) / (1000 * 60 * 60));
				let minutes = Math.floor(diff % (1000 * 60 * 60) / (1000 * 60));
				let seconds = Math.floor(diff % (1000 * 60) / 1000);

				days <= 99 ? days = `0${days}` : days;
				days <= 9 ? days = `00${days}` : days;
				hours <= 9 ? hours = `0${hours}` : hours;
				minutes <= 9 ? minutes = `0${minutes}` : minutes;
				seconds <= 9 ? seconds = `0${seconds}` : seconds;

				document.querySelector('#days').textContent = days;
				document.querySelector('#hours').textContent = hours;
				document.querySelector('#minutes').textContent = minutes;
				document.querySelector('#seconds').textContent = seconds;

			}
			timer();
			setInterval(timer, 1000);
		}
	}

	countdown();





	var tinyslier = function () {
		var el = document.querySelectorAll('#testimonial');
		if (el.length > 0) {
			var slider = tns({
				container: "#testimonial",
				items: 1,
				axis: "horizontal",
				swipeAngle: false,
				speed: 400,

				nav: true,
				controls: false,
				controlsPosition: "bottom",
				autoplay: true,
				autoplayHoverPause: true,
				autoplayTimeout: 3500,
				autoplayButtonOutput: false,
				"responsive": {
					"350": {
						"items": 1
					},
					"500": {
						"items": 1,
						"gutter": 30,
					},
					"768": {
						"items": 2,
						"gutter": 30,
					}
				},
			});
		}
	}
	tinyslier();


	var lightbox = function () {
		var lightboxVideo = GLightbox({
			selector: '.glightbox'
		});
	};
	lightbox();



	var nav = document.getElementById('site-nav');

	var showNav = function () {
		if (nav) {
			nav.setAttribute('class', 'site-nav');
		}
	}
	var hideNav = function () {
		if (nav) {


			nav.setAttribute('class', "site-nav site-nav-hide");

		}
	}
	var scrollFunc = function (e) {
		e = e || window.event;
		if (e.wheelDelta) {  //判断浏览器IE，谷歌滑轮事件               
			if (e.wheelDelta > 0) { //当滑轮向上滚动时
				showNav();
				// console.log("滑轮向上滚动",e.wheelDelta);  
			}
			if (e.wheelDelta < 0) { //当滑轮向下滚动时 
				hideNav();
				// console.log("滑轮向下滚动",e.wheelDelta);  
			}
		} else if (e.detail) {  //Firefox滑轮事件 在火狐中e.detail为负值时是向上滚动，正值是向下滚动 
			if (e.detail < 0) { //当滑轮向上滚动时  
				showNav();
				// console.log("滑轮向上滚动",e.detail);
			}
			if (e.detail > 0) { //当滑轮向下滚动时  
				hideNav();
				// console.log("滑轮向下滚动",e.detail);  
			}
		}
	}
	//给页面绑定滑轮滚动事件  
	if (document.addEventListener) {//firefox  
		document.addEventListener('DOMMouseScroll', scrollFunc, false);
	}
	//滚动滑轮触发scrollFunc方法  //ie 谷歌  
	window.onmousewheel = document.onmousewheel = scrollFunc


})()