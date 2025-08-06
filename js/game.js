document.addEventListener('DOMContentLoaded', function() {
    // Game initialization
    const gameIframe = document.querySelector('.game-iframe');
    
    // Handle game messages if needed
    window.addEventListener('message', function(event) {
        // Handle messages from the iframe if needed
        console.log('Message from game:', event.data);
    });
    
    // Send a message to the iframe when the page loads
    if (gameIframe && gameIframe.contentWindow) {
        // This is where you would send initialization data to the game if needed
        // gameIframe.contentWindow.postMessage({ type: 'init' }, '*');
    }
    
    // Add game analytics
    function trackGameStart() {
        if (window.gtag) {
            gtag('event', 'game_start', {
                'event_category': 'Game',
                'event_label': 'Drift Boss'
            });
        }
    }
    
    // Track when the iframe is clicked (assuming that's when the game starts)
    if (gameIframe) {
        gameIframe.addEventListener('click', function() {
            trackGameStart();
        }, { once: true });
    }
    
    // Handle game controls visibility for mobile/desktop
    function updateControlsVisibility() {
        const isMobile = window.innerWidth <= 768;
        const controlsInfo = document.querySelector('.controls-info');
        
        if (controlsInfo) {
            controlsInfo.style.display = isMobile ? 'block' : 'none';
        }
    }
    
    // Update on load and resize
    updateControlsVisibility();
    window.addEventListener('resize', updateControlsVisibility);
    
    // Add keyboard controls for accessibility
    document.addEventListener('keydown', function(e) {
        // Space or Enter key
        if (e.code === 'Space' || e.code === 'Enter') {
            e.preventDefault();
            // This would send a message to the iframe to handle the key press
            // if (gameIframe && gameIframe.contentWindow) {
            //     gameIframe.contentWindow.postMessage({ type: 'keypress', key: e.code }, '*');
            // }
        }
    });
});

// Service Worker for offline functionality
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js').then(function(registration) {
            console.log('ServiceWorker registration successful with scope: ', registration.scope);
        }, function(err) {
            console.log('ServiceWorker registration failed: ', err);
        });
    });
}