/**
 * Lazy Loading Implementation for Images
 * Improves page load performance by loading images only when needed
 */

document.addEventListener('DOMContentLoaded', function() {
    // Get all images with lazy loading
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    
    // Fallback for browsers that don't support native lazy loading
    if ('loading' in HTMLImageElement.prototype) {
        // Browser supports native lazy loading
        console.log('Native lazy loading supported');
    } else {
        // Fallback to Intersection Observer
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        lazyImages.forEach(img => {
            imageObserver.observe(img);
        });
    }
});
