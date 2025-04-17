document.addEventListener('DOMContentLoaded', function() {
    // Function to handle video visibility
    function handleVideoVisibility() {
        const videos = document.querySelectorAll('video');
        
        // When page becomes visible again
        document.addEventListener('visibilitychange', function() {
            if (document.visibilityState === 'visible') {
                videos.forEach(video => {
                    if (video.paused) {
                        video.play().catch(error => {
                            console.log('Video autoplay failed:', error);
                        });
                    }
                });
            }
        });
    }

    // Initialize video visibility handler
    handleVideoVisibility();
}); 