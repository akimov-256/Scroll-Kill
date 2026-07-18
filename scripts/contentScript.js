let pending = false;
let active = false;

chrome.storage.local.get("active", (value) => {
    active = value.active !== false;
});

function hideReels(anchor) {
    pending = false;
    
    let node = anchor;
    for (let i = 0; i < 15 && node; i++)
    {
        if (node.querySelector && node.querySelector('video', 'canvas'))
        {
            node.style.display = 'none';
            node.dataset.cardHidden = true;
            anchor.dataset.reelHidden = true;
            return;
        }
        node = node.parentElement;
    }
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