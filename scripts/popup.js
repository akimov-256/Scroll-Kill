let uiSwitch = document.getElementById("reelscheckBox");

chrome.storage.local.get("reelsActive", (value) => {
    console.log(value.reelsActive);
    uiSwitch.checked = value.reelsActive === true;
});

uiSwitch.addEventListener('change', (event) => {
    if (event.target.checked)
        chrome.storage.local.set({reelsActive: true});
    else
        chrome.storage.local.set({reelsActive: false});
});