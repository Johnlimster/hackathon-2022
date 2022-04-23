// Initialize button with user's preferred color
let changeColor = document.getElementById("changeColor");
let titleInput = document.getElementById("titleInput");
let nameInput = document.getElementById("nameInput");
let updateName = document.getElementById("updateName");

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
        args: [newTitle],
    });
});

updateName.addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    let name = nameInput.value;

    chrome.storage.sync.set({ name });
});

// The body of this function will be executed as a content script inside the
// current page
function setPageBackgroundColor() {
    chrome.storage.sync.get("color", ({ color }) => {
        document.body.style.backgroundColor = color;
    });
}

function setPageTitle(newTitle) {
    document.title = newTitle;
}
