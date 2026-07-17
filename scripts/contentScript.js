let pending = false;

function hideReels() {
    document.querySelectorAll('a[href*="/reels/"]:not([data-reel-hidden])').forEach(r => {
        r.dataset.reelHidden = 'true';
        r.style.display = 'none';
    });
    pending = false;
}

const observer = new MutationObserver(() => {
    if (!pending) {
        pending = true;
        requestAnimationFrame(hideReels);
    }
});

observer.observe(document.body, { childList: true, subtree: true });
hideReels();