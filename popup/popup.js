import { getStorageByKey, storeInfo } from "/modules/global.mjs";

let emailInput = document.getElementById("emailInput");
let phoneInput = document.getElementById("phoneInput");
let dobInput = document.getElementById("dobInput");
let addressInput = document.getElementById("addressInput");
let updateInfo = document.getElementById("updateInfo");

updateInfo.addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    let website = tab.url;
    let email = emailInput.checked;
    let phone = phoneInput.checked;
    let dob = dobInput.checked;
    let address = addressInput.checked;

    storeInfo(website, phone, email, dob, address);
});
