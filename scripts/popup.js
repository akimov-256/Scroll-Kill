let uiSwitch = document.getElementById("checkBox");

uiSwitch.addEventListener('change', (event) => {
    if (event.target.checked)
        console.log('extension is activated');
    else
        console.log('extension is deactivated');
});