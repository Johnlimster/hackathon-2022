let websiteInput = document.getElementById("websiteInput");
let emailInput = document.getElementById("emailInput");
let dobInput = document.getElementById("dobInput");
let addressInput = document.getElementById("addressInput");
let updateInfo = document.getElementById("updateInfo");

updateInfo.addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    let website = websiteInput.value;
    let email = emailInput.checked;
    let dob = dobInput.checked;
    let address = addressInput.checked;

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
});

function getStorageByKey(key) {
    return new Promise((resolve, reject) => {
        chrome.storage.sync.get({ [key]: [] }, ({ [key]: result }) => {
            if (chrome.runtime.lastError) {
                return reject(chrome.runtime.lastError);
            }
            resolve(result);
        });
    });
}
