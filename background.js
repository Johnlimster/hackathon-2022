import { getStorageByKey } from "/modules/global.mjs";

let color = "#3aa757";

chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({ color });
    console.log("Default background color set to %cgreen", `color: ${color}`);
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    storeInfo(request, sender).then(() => {
        sendResponse({ farewell: "goodbye" });
    });
    return true;
});

async function storeInfo(request, sender) {
    let website = sender.tab.url;
    let email = request.hasEmailField;
    let dob = request.hasDobField;
    let address = request.hasAddressField;

    let oldWebsites = await getStorageByKey("websites");
    let oldEmails = await getStorageByKey("emails");
    let oldDobs = await getStorageByKey("dobs");
    let oldAddresses = await getStorageByKey("addresses");
    oldWebsites.push(website);
    oldEmails.push(email);
    oldDobs.push(dob);
    oldAddresses.push(address);

    chrome.storage.sync.set({
        websites: oldWebsites,
        emails: oldEmails,
        dobs: oldDobs,
        addresses: oldAddresses,
    });
}
