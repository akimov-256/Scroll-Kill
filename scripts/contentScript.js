let pending = false;
let active = false;

chrome.storage.local.get("active", (value) => {
    active = value.active !== false;
});

function hideReels() {
    pending = false;

    if (!active)
        return;

    document.querySelectorAll('a[href*="/reels/"]:not([data-reel-hidden])').forEach(a => {
        if (a.getAttribute('herf') === '/reels/')
            return;
        hideReel(a);
    });
}

function hideReel(anchor) {
    let node = anchor;
    for (let i = 0; i < 15 && node; i++)
    {
        if (node.querySelector && node.querySelector('video, canvas'))
        {
            node.style.display = 'none';
            node.dataset.cardHidden = true;
            anchor.dataset.reelHidden = true;
            return;
        }
        node = node.parentElement;
    }
}

function restoreReels() {
    document.querySelectorAll('[data-card-hidden]').forEach(node => {
        node.style.display = '';
        delete node.dataset.cardHidden;
    });
    document.querySelectorAll('[data-reel-hidden]').forEach(a => {
        delete a.dataset.reelHidden;
    });
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
        else
            restoreReels();
    }
});

observer.observe(document.body, { childList: true, subtree: true });
hideReels();