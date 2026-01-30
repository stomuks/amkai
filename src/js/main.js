import Swiper from 'swiper'
import { Autoplay, Navigation, Pagination } from 'swiper/modules'
import 'swiper/css'

import { Notyf } from 'notyf'
import 'notyf/notyf.min.css'

import lightGallery from 'lightgallery'
import lgThumbnail from 'lightgallery/plugins/thumbnail'
import lgZoom from 'lightgallery/plugins/zoom'
import lgVideo from 'lightgallery/plugins/video'

import 'lightgallery/css/lightgallery.css'
import 'lightgallery/css/lg-thumbnail.css'
import 'lightgallery/css/lg-zoom.css'
import 'lightgallery/css/lg-video.css'

import '../scss/style.scss'

document.addEventListener('DOMContentLoaded', () => {
	const notyf = new Notyf({
		types: [
			{
				type: 'error',
				background: '#9f1339',
				className: 'notyf__error'
			},
			{
				type: 'success',
				className: 'notyf__error'
			}
		]
	})

	const formFetch = document.getElementById('form')

	if (formFetch) {
		const formCheckbox = document.querySelector('.form__checkbox-label')
		const formCheckboxHidden = document.querySelector('.form__checkbox-hidden')

		if (formCheckbox && formCheckboxHidden) {
			formCheckbox.addEventListener('click', () => {
				if (formCheckboxHidden.value) {
					formCheckboxHidden.value = ''
				} else {
					formCheckboxHidden.value = '1'
				}
			})
		}
		FetchIt.Message = {
			success(message) {
				notyf.success(message)
			},
			error(message) {
				notyf.error(message)
			}
		}
	}

	function setInitialValue() {
		var hiddenInputs = document.querySelectorAll(
			'input[type="hidden"][name="honeyjackpot"]'
		)
		if (hiddenInputs) {
			hiddenInputs.forEach(function (hiddenInput) {
				hiddenInput.value = 'pothoney'
			})
		}
	}

	window.addEventListener('scroll', function () {
		setInitialValue()
	})

	window.addEventListener('click', function () {
		setInitialValue()
	})

	const gallery = document.getElementById('lightgallery')
	if (gallery) {
		lightGallery(gallery, {
			plugins: [lgThumbnail, lgZoom, lgVideo],
			videojs: true,
			videojsOptions: {
				controls: true,
				autoplay: true
			},
			download: false
		})
	}

	const partnersSwiper = new Swiper('.partners__slider', {
		modules: [Autoplay],
		loop: true,
		slidesPerView: 'auto',
		spaceBetween: 12,
		speed: 3000,
		autoplay: {
			delay: 500,
			disableOnInteraction: false
		},
		breakpoints: {
			320: {
				spaceBetween: 16
			},
			768: {
				spaceBetween: 24
			},
			1024: {
				spaceBetween: 36
			},
			1440: {
				spaceBetween: 48
			}
		}
	})

	const reviewsSwiper = new Swiper('.reviews__slider', {
		modules: [Navigation, Pagination, Autoplay],
		loop: true,
		slidesPerView: 'auto',
		spaceBetween: 30,
		speed: 500,
		autoplay: {
			delay: 5500,
			disableOnInteraction: false
		},
		navigation: {
			nextEl: '.reviews__button-next',
			prevEl: '.reviews__button-prev'
		},
		pagination: {
			el: '.reviews__pagination',
			type: 'fraction'
		}
	})

	const GalleryItems = document.querySelectorAll('.gallery__item')
	GalleryItems.forEach((item, idx) => {
		const n = idx + 1
		if (n % 6 === 4 && n > 0) {
			item.classList.add('grid-6')
		} else if ((n % 12 === 5 || n % 12 === 6) && n > 0) {
			item.classList.add('grid-3')
		}
	})

	const body = document.querySelector('body')
	const menuButton = document.querySelector('.header__open-btn')
	const menuList = document.querySelector('.header__menu')

	if (body && menuButton && menuList) {
		const openMenu = () => {
			body.classList.add('menu-open')
			menuButton.classList.add('active')
		}

		const closeMenu = () => {
			body.classList.remove('menu-open')
			menuButton.classList.remove('active')
		}

		const toggleMenu = e => {
			e.stopPropagation()
			body.classList.contains('menu-open') ? closeMenu() : openMenu()
		}

		menuButton.addEventListener('click', toggleMenu)

		document.addEventListener('click', e => {
			if (
				body.classList.contains('menu-open') &&
				!menuList.contains(e.target) &&
				!menuButton.contains(e.target)
			) {
				closeMenu()
			}
		})

		document.addEventListener('keydown', e => {
			if (e.key === 'Escape' && body.classList.contains('menu-open')) {
				closeMenu()
			}
		})
	}
})
