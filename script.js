// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Form validation
const bookingForm = document.querySelector('.booking-form');
bookingForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const checkIn = document.getElementById('check-in').value;
    const checkOut = document.getElementById('check-out').value;
    const roomType = document.getElementById('room-type').value;
    const guests = document.getElementById('guests').value;
    
    if (!checkIn || !checkOut || !roomType || !guests) {
        alert('Please fill in all fields');
        return;
    }
    
    // Convert dates to compare
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (checkInDate < today) {
        alert('Check-in date cannot be in the past');
        return;
    }
    
    if (checkOutDate <= checkInDate) {
        alert('Check-out date must be after check-in date');
        return;
    }
    
    // If validation passes, you would typically send this to a server
    alert('Thank you for your booking request! We will confirm your reservation shortly.');
    bookingForm.reset();
});

// Remove any scroll event listeners for the navbar
window.removeEventListener('scroll', () => {});

// Initialize minimum dates for booking form
const checkInInput = document.getElementById('check-in');
const checkOutInput = document.getElementById('check-out');

// Set minimum date to today
const today = new Date().toISOString().split('T')[0];
checkInInput.min = today;

// Update checkout minimum date based on checkin selection
checkInInput.addEventListener('change', function() {
    checkOutInput.min = this.value;
    if (checkOutInput.value && checkOutInput.value <= this.value) {
        checkOutInput.value = '';
    }
});

// Theme Switcher
const toggleSwitch = document.querySelector('#checkbox');
const currentTheme = localStorage.getItem('theme');

// Check if theme was set previously
if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);
    if (currentTheme === 'dark') {
        toggleSwitch.checked = true;
    }
}

function switchTheme(e) {
    if (e.target.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
    }
}

toggleSwitch.addEventListener('change', switchTheme, false);

// Mobile menu functionality
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    // Change menu icon based on state
    const icon = mobileMenuBtn.querySelector('i');
    if (navLinks.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!mobileMenuBtn.contains(e.target) && !navLinks.contains(e.target)) {
        navLinks.classList.remove('active');
        const icon = mobileMenuBtn.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// Close mobile menu when clicking a nav link
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        const icon = mobileMenuBtn.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    });
});

// Menu Modal Functionality
const menuButtons = document.querySelectorAll('.menu-button');
const menuModal = document.getElementById('menuModal');
const menuClose = document.querySelector('.menu-close');
const menuTabs = document.querySelectorAll('.menu-tab');
const menuSections = document.querySelectorAll('.menu-section');

// Open menu modal
menuButtons.forEach(button => {
    button.addEventListener('click', () => {
        menuModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
});

// Close menu modal
menuClose.addEventListener('click', () => {
    menuModal.classList.remove('active');
    document.body.style.overflow = '';
});

// Close modal when clicking outside
menuModal.addEventListener('click', (e) => {
    if (e.target === menuModal) {
        menuModal.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Tab switching
menuTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        // Remove active class from all tabs and sections
        menuTabs.forEach(t => t.classList.remove('active'));
        menuSections.forEach(s => s.classList.remove('active'));

        // Add active class to clicked tab and corresponding section
        tab.classList.add('active');
        const targetSection = document.getElementById(tab.dataset.tab);
        targetSection.classList.add('active');
    });
});

// Handle escape key to close modal
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menuModal.classList.contains('active')) {
        menuModal.classList.remove('active');
        document.body.style.overflow = '';
    }
});
