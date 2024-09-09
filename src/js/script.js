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
