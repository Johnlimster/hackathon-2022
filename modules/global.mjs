export function getStorageByKey(key) {
    return new Promise((resolve, reject) => {
        chrome.storage.sync.get({ [key]: [] }, ({ [key]: result }) => {
            if (chrome.runtime.lastError) {
                return reject(chrome.runtime.lastError);
            }
            resolve(result);
        });
    });
}

export async function storeInfo(website, email, dob, address) {
    let oldWebsites = await getStorageByKey("websites");
    let oldEmails = await getStorageByKey("emails");
    let oldDobs = await getStorageByKey("dobs");
    let oldAddresses = await getStorageByKey("addresses");

    if (oldWebsites.includes(website)) return;

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
