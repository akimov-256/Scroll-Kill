// ========== CONFIG ==========
let reelsActive = false;
let pending = false;
const REEL_SELECTOR = 'a[href*="/reels/"]:not([data-reel-hidden])';
const REEL_EXACT = '/reels/';

// ========== STORAGE INIT ==========
chrome.storage.local.get("reelsActive", (value) => {
    reelsActive = value.reelsActive === true;
    console.log('[ScrollKill] initial reelsActive:', reelsActive);
    if (reelsActive) {
        hideReels();
        setTimeout(hideReels, 1000);
    }
});

// ========== CORE FUNCTIONS ==========
function hideReels() {
    pending = false;
    if (!reelsActive) {
        console.log('[ScrollKill] hideReels called but inactive');
        return;
    }
    console.log('[ScrollKill] hideReels scanning for reels...');
    const anchors = document.querySelectorAll(REEL_SELECTOR);
    console.log(`[ScrollKill] Found ${anchors.length} reel anchors`);
    anchors.forEach(a => {
        if (a.getAttribute('href') === REEL_EXACT) 
        {
            a.style.display = 'none';
            a.dataset.reelHidden = 'true';
            return;
        }
        hideReel(a);
    });
}

function hideReel(anchor) {
    let node = anchor;
    for (let i = 0; i < 20 && node; i++) {
        if (node.querySelector && node.querySelector('video, canvas')) {
            node.style.display = 'none';
            node.dataset.cardHidden = 'true';
            anchor.dataset.reelHidden = 'true';
            console.log('[ScrollKill] Hidden reel', anchor.href);
            return;
        }
        node = node.parentElement;
    }
    console.warn('[ScrollKill] No video container found for', anchor.href);
    anchor.style.display = 'none';
    anchor.dataset.reelHidden = 'true';
}

function restoreReels() {
    console.log('[ScrollKill] Restoring all hidden reels');
    document.querySelectorAll('[data-card-hidden]').forEach(node => {
        node.style.display = '';
        delete node.dataset.cardHidden;
    });
    document.querySelectorAll('[data-reel-hidden]').forEach(a => {
        a.style.display = '';
        delete a.dataset.reelHidden;
    });
}

// ========== MUTATION OBSERVER ==========
const observer = new MutationObserver(() => {
    if (!pending && reelsActive) {
        pending = true;
        requestAnimationFrame(() => {
            hideReels();
            pending = false;
        });
    }
});

function startObserver() {
    if (document.body) {
        observer.observe(document.body, { childList: true, subtree: true });
        console.log('[ScrollKill] Observer started');
    } else {
        setTimeout(startObserver, 100);
    }
}
startObserver();

// ========== STORAGE CHANGE LISTENER ==========
chrome.storage.onChanged.addListener((changes, area) => {
    if (area === "local" && changes.reelsActive) {
        const newVal = changes.reelsActive.newValue === true;
        console.log('[ScrollKill] Storage changed reelsActive to', newVal);
        if (reelsActive !== newVal) {
            reelsActive = newVal;
            if (reelsActive) {
                hideReels();
                setTimeout(hideReels, 500);
            } else {
                restoreReels();
            }
        }
    }
});

// ========== EXTRA: Run on page load / SPA navigation ==========
window.addEventListener('load', () => {
    if (reelsActive) setTimeout(hideReels, 200);
});