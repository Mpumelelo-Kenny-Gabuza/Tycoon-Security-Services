// ANIMATION
const animatedElements = document.querySelectorAll(".fade-in, .fade-in-up");

const observer = new IntersectionObserver(
    entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = "running";
                observer.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.2 }
);

animatedElements.forEach(el => {
    el.style.animationPlayState = "paused";
    observer.observe(el);
});