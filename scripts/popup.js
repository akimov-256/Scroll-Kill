let uiSwitch = document.getElementById("checkBox");

chrome.storage.local.get("active", (value) => {
    console.log(value.active);
    uiSwitch.checked = value.active !== false; 
});

uiSwitch.addEventListener('change', (event) => {
    if (event.target.checked)
        chrome.storage.local.set({active: true});
    else
        chrome.storage.local.set({active: false});
});