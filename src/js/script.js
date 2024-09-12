import '../scss/style.scss';

const hamburger = document.getElementById('hamburger');
const menu = document.getElementById('menu');
const dropdownToggles = document.querySelectorAll('.dropdown__toggle');
const dropdownLinks = document.querySelectorAll('.dropdown-menu a');
const menuLinks = document.querySelectorAll(
	'.nav__item a:not(.dropdown__toggle)'
);
const dropdowns = document.querySelectorAll('.dropdown');
const toggleMenu = (element, className) => element.classList.toggle(className);

hamburger.addEventListener('click', (event) => {
	event.stopPropagation();
	toggleMenu(hamburger, 'open');
	toggleMenu(menu, 'open');
});

dropdownToggles.forEach((toggle) => {
	toggle.addEventListener('click', (event) => {
		event.preventDefault();
		event.stopPropagation();
		const dropdown = toggle.closest('.dropdown');
		dropdown.classList.toggle('active');

		dropdowns.forEach((dropdown) => {
			const dropdownToggle = dropdown.querySelector('.dropdown__toggle');
			if (
				!dropdown.contains(event.target) &&
				!dropdownToggle.contains(event.target)
			) {
				dropdown.classList.remove('active');
			}
		});
	});
});

dropdownLinks.forEach((link) => {
	link.addEventListener('click', (event) => {
		event.stopPropagation();
		const parentDropdown = link.closest('.dropdown');
		if (parentDropdown) parentDropdown.classList.remove('active');
		hamburger.classList.remove('open');
		menu.classList.remove('open');
	});
});

menuLinks.forEach((link) => {
	link.addEventListener('click', (event) => {
		event.stopPropagation();
		hamburger.classList.remove('open');
		menu.classList.remove('open');
	});
});

document.addEventListener('click', (event) => {
	dropdowns.forEach((dropdown) => {
		const dropdownToggle = dropdown.querySelector('.dropdown__toggle');
		if (
			!dropdown.contains(event.target) &&
			!dropdownToggle.contains(event.target)
		) {
			dropdown.classList.remove('active');
		}
	});
});

menu.addEventListener('click', (event) => event.stopPropagation());
const reviews = [
	{
		name: 'Orci varius natoque',
		review: 'Sed dignissim placerat dolor id maxim. Nullam gravida bibendum ipsum, a consequat neque venenatis et.',
		image: '../assets/images/user-1.png',
	},
	{
		name: 'John Doe',
		review: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet.',
		image: '../assets/images/user-2.png',
	},
	{
		name: 'Jane Smith',
		review: 'Pellentesque eu tincidunt tortor aliquam nulla facilisi cras fermentum odio. Nec nam aliquam sem et tortor consequat.',
		image: '../assets/images/user-3.png',
	},
];
let currentIndex = 0;

const nextArrow = document.querySelector('.carousel__arrows .next-arrow');
const prevArrow = document.querySelector('.carousel__arrows .prev-arrow');

function updateReview() {
	const reviewerName = document.querySelector('.carousel__person__name-span');
	const reviewerText = document.querySelector('.carousel__description');
	const reviewerImage = document.querySelector('.carousel__person__img');
	const dots = document.querySelectorAll('.carousel__dot');

	// Update review data
	reviewerName.textContent = reviews[currentIndex].name;
	reviewerText.textContent = reviews[currentIndex].review;
	reviewerImage.src = reviews[currentIndex].image;

	// Update dots
	dots.forEach((dot, index) => {
		if (index === currentIndex) {
			dot.style.backgroundColor = '#E73137';
			dot.style.transform = 'scale(1)';
			dot.style.width = '19px';
			dot.style.height = '19px';
		} else {
			dot.style.backgroundColor = '#ff9999';
			dot.style.transform = 'scale(0.8)';
			dot.style.width = '13px';
			dot.style.height = '13px';
		}
	});

	// Disable/Enable arrows based on current index
	if (currentIndex === 0) {
		prevArrow.style.opacity = '0.5';
		prevArrow.style.pointerEvents = 'none';
	} else {
		prevArrow.style.opacity = '1';
		prevArrow.style.pointerEvents = 'auto';
	}

	if (currentIndex === reviews.length - 1) {
		nextArrow.style.opacity = '0.5';
		nextArrow.style.pointerEvents = 'none';
	} else {
		nextArrow.style.opacity = '1';
		nextArrow.style.pointerEvents = 'auto';
	}
}
nextArrow.addEventListener('click', () => {
	if (currentIndex < reviews.length - 1) {
		currentIndex++;
		updateReview();
	}
});

prevArrow.addEventListener('click', () => {
	if (currentIndex > 0) {
		currentIndex--;
		updateReview();
	}
});

updateReview();
const buttons = document.querySelectorAll('.core__btn');

buttons.forEach((button) => {
	button.addEventListener('click', () => {
		const content = button.parentElement.nextElementSibling;
		const icon = button.querySelector('.core__icon');

		buttons.forEach((btn) => {
			const otherContent = btn.parentElement.nextElementSibling;
			const otherIcon = btn.querySelector('.core__icon');

			if (otherContent !== content) {
				otherContent.classList.remove('core__content--active');
				otherContent.style.padding = '0 10px';
				otherIcon.textContent = '+';
				otherIcon.classList.remove('minus');
			}
		});

		if (content.classList.contains('core__content--active')) {
			content.classList.remove('core__content--active');
			icon.textContent = '+';
			icon.classList.remove('minus');

			content.addEventListener(
				'transitionend',
				() => {
					if (!content.classList.contains('core__content--active')) {
						content.style.padding = '0px 10px';
					}
				},
				{ once: true }
			);
		} else {
			content.style.padding = '16px 10px';
			content.classList.add('core__content--active');
			icon.textContent = '-';
			icon.classList.add('minus');
		}
	});
});
