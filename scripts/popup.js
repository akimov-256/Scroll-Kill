let reelsSwitch = document.getElementById("reelsCheckBox");
let postsSwitch = document.getElementById("postsCheckBox");

// Handle reels switch state
chrome.storage.local.get("reelsActive", (value) => {
    reelsSwitch.checked = value.reelsActive === true;
});

reelsSwitch.addEventListener('change', (event) => {
    if (event.target.checked)
        chrome.storage.local.set({reelsActive: true});
    else
        chrome.storage.local.set({reelsActive: false});
});

// Handle posts switch state
chrome.storage.local.get("postsActive", (value) => {
    postsSwitch.checked = value.postsActive === true;
});

postsSwitch.addEventListener('change', (event) => {
    if (event.target.checked)
        chrome.storage.local.set({postsActive: true});
    else
        chrome.storage.local.set({postsActive: false});
});