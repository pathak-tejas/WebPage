/**
 * Script for smooth traversal, modal handling, and scroll-triggered animations.
 */

// 1. Smooth Scrolling for Page Traversal
function scrollToSection(id) {
    const element = document.getElementById(id);
    if (element) {
        window.scrollTo({
            top: element.offsetTop - 70, // Offset for the fixed navigation bar
            behavior: 'smooth'
        });
    }
}

// 2. Modal Functionality (Meet the Team)
function showModal(id) {
    document.getElementById(id).style.display = 'block';
}

function closeModal(id) {
    document.getElementById(id).style.display = 'none';
}

// Close the modal if the user clicks anywhere outside of it
window.onclick = function(event) {
    const modal = document.getElementById('team-info');
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}

// 3. Scroll-Triggered Animations (Intersection Observer)
document.addEventListener('DOMContentLoaded', () => {
    // Select all elements that need to be animated on scroll
    const animatedElements = document.querySelectorAll(
        '.card, .fact-card, .chart-card, .tip-item'
    );

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
               
                // Add the class that triggers the CSS transition/animation
                if (target.classList.contains('fade-in-up')) {
                    target.style.opacity = '1';
                    target.style.transform = 'translateY(0)';
                } else if (target.classList.contains('slide-in-left')) {
                    // Fact cards with delays
                    const delayClass = Array.from(target.classList).find(cls => cls.startsWith('delay-'));
                    const delay = delayClass ? parseInt(delayClass.split('-')[1]) * 0.2 : 0;
                   
                    target.style.transitionDelay = `${delay}s`;
                    target.style.opacity = '1';
                    target.style.transform = 'translateX(0)';
                } else if (target.classList.contains('slide-in-right')) {
                    const delayClass = Array.from(target.classList).find(cls => cls.startsWith('delay-'));
                    const delay = delayClass ? parseInt(delayClass.split('-')[1]) * 0.2 : 0;
                   
                    target.style.transitionDelay = `${delay}s`;
                    target.style.opacity = '1';
                    target.style.transform = 'translateX(0)';
                } else if (target.classList.contains('fade-in-slow')) {
                    target.style.opacity = '1';
                }

                observer.unobserve(target); // Stop observing once animated
            }
        });
    }, {
        threshold: 0.1, // Trigger when 10% of the element is visible
    });

    animatedElements.forEach(element => {
        // Initialize the transitions for the Intersection Observer to take over
        element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(element);
    });
   
    // 4. Bar Chart Growth Animation (Triggered on load since they are high up)
    document.querySelectorAll('.bar').forEach(bar => {
        // The CSS variable --percent handles the width animation
        bar.style.width = bar.style.getPropertyValue('--percent');
    });

    // 5. Initial Gauge Chart Animation
    const gauge = document.querySelector('.mock-chart-gauge');
    if (gauge) {
        // Set the initial value for the CSS variable to trigger the growth animation
        gauge.style.setProperty('--gauge-percent', '225deg'); // 65% of 360 degrees
    }
});
