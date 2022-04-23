// Initialize butotn with users's prefered color
let changeColor = document.getElementById("changeColor");
let titleInput = document.getElementById("titleInput");

chrome.storage.sync.get("color", ({ color }) => {
    changeColor.style.backgroundColor = color;
});

// When the button is clicked, inject setPageBackgroundColor into current page
changeColor.addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: setPageBackgroundColor,
    });
});

titleInput.addEventListener("input", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    let newTitle = titleInput.value;

    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: setPageTitle,
        args: [newTitle]
    });
});

// The body of this function will be execuetd as a content script inside the
// current page
function setPageBackgroundColor() {
    chrome.storage.sync.get("color", ({ color }) => {
        document.body.style.backgroundColor = color;
    });
}

function setPageTitle(newTitle) {
    document.title = newTitle
}
