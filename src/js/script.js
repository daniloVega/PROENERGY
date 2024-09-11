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
			dot.style.backgroundColor = '#ff0000'; // Active dot color (red)
			dot.style.transform = 'scale(1)'; // Active dot is full size
			dot.style.width = '19px'; // Full size width
			dot.style.height = '19px'; // Full size height
		} else {
			dot.style.backgroundColor = '#ff9999'; // Inactive dot color (lighter red)
			dot.style.transform = 'scale(0.8)'; // Smaller size for inactive dots
			dot.style.width = '15px'; // Smaller width for inactive dots
			dot.style.height = '15px'; // Smaller height for inactive dots
		}
	});

	// Disable/Enable arrows based on current index
	if (currentIndex === 0) {
		prevArrow.style.opacity = '0.5'; // Make the previous arrow look disabled
		prevArrow.style.pointerEvents = 'none'; // Disable clicking on it
	} else {
		prevArrow.style.opacity = '1'; // Enable the previous arrow
		prevArrow.style.pointerEvents = 'auto'; // Enable clicking on it
	}

	if (currentIndex === reviews.length - 1) {
		nextArrow.style.opacity = '0.5'; // Make the next arrow look disabled
		nextArrow.style.pointerEvents = 'none'; // Disable clicking on it
	} else {
		nextArrow.style.opacity = '1'; // Enable the next arrow
		nextArrow.style.pointerEvents = 'auto'; // Enable clicking on it
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

// Initialize first review
updateReview();
const buttons = document.querySelectorAll('.core__btn');

buttons.forEach((button) => {
  button.addEventListener('click', () => {
    // Get the content related to the clicked button
    const content = button.parentElement.nextElementSibling;
    const icon = button.querySelector('.core__icon');

    // Close all other contents and reset their icons
    buttons.forEach((btn) => {
      const otherContent = btn.parentElement.nextElementSibling;
      const otherIcon = btn.querySelector('.core__icon');
      
      if (otherContent !== content) {
        otherContent.style.display = 'none'; // Hide other contents
        otherIcon.textContent = '+'; // Reset icon to '+'
        otherIcon.classList.remove('minus'); // Remove minus class
      }
    });

    // Toggle the clicked content
    if (content.style.display === 'block') {
      content.style.display = 'none'; // Collapse the content
      icon.textContent = '+'; // Change the icon back to '+'
      icon.classList.remove('minus'); // Remove minus class
    } else {
      content.style.display = 'block'; // Expand the content
      icon.textContent = '-'; // Change the icon to '-'
      icon.classList.add('minus'); // Add minus class for larger size
    }
  });
});