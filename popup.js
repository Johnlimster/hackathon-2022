// Initialize button with user's preferred color
let changeColor = document.getElementById("changeColor");
let titleInput = document.getElementById("titleInput");
let nameInput = document.getElementById("nameInput");
let updateName = document.getElementById("updateName");

// user info
let websiteInput = document.getElementById("websiteInput");
let emailInput = document.getElementById("emailInput");
let dobInput = document.getElementById("dobInput");
let addressInput = document.getElementById("addressInput");
let updateInfo = document.getElementById("updateInfo");

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

updateInfo.addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    let website = websiteInput.value;
    let email = emailInput.checked;
    let dob = dobInput.checked;
    let address = addressInput.checked;

    chrome.storage.sync.set({ website });
    chrome.storage.sync.set({ email });
    chrome.storage.sync.set({ dob });
    chrome.storage.sync.set({ address });
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
