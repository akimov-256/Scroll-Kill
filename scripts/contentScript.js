let pending = false;
let active = false;

chrome.storage.local.get("active", (value) => {
    active = value.active !== false;
});

function hideReels() {
    pending = false;

    if (!active)
    {
        return
    }

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

chrome.storage.onChanged.addListener((changes, area) => {
    if (area = "local" && changes.active)
    {
        active = changes.active.newValue;
        if (active)
            hideReels();
    }
});

observer.observe(document.body, { childList: true, subtree: true });
hideReels();