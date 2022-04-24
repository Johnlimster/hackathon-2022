import { displaySuccess } from "/modules/global.mjs";

let emailInput = document.getElementById("emailInput");
let phoneInput = document.getElementById("phoneInput");
let dobInput = document.getElementById("dobInput");
let addressInput = document.getElementById("addressInput");
let saveButton = document.getElementById("saveButton");

saveButton.addEventListener("click", async () => {
    let shareEmail = emailInput.checked;
    let sharePhone = phoneInput.checked;
    let shareDob = dobInput.checked;
    let shareAddress = addressInput.checked;

    chrome.storage.sync.set({ shareEmail });
    chrome.storage.sync.set({ sharePhone });
    chrome.storage.sync.set({ shareDob });
    chrome.storage.sync.set({ shareAddress });
    displaySuccess("Successfully saved preferences!");
});
