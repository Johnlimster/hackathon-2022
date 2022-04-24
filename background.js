import { getStorageByKey, storeInfo } from "/modules/global.mjs";

let color = "#3aa757";

chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({ color });
    console.log("Default background color set to %cgreen", `color: ${color}`);
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    let website = sender.tab.url;
    let email = request.hasEmailField;
    let phone = request.hasPhoneField;
    let dob = request.hasDobField;
    let address = request.hasAddressField;
    storeInfo(website, phone, email, dob, address).then(() => {
        sendResponse({ farewell: "goodbye" });
    });
    return true;
});
