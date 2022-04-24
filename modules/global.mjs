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

export async function storeInfo(website, phone, email, dob, address) {
    let oldWebsites = await getStorageByKey("websites");
    let oldPhones = await getStorageByKey("phones");
    let oldEmails = await getStorageByKey("emails");
    let oldDobs = await getStorageByKey("dobs");
    let oldAddresses = await getStorageByKey("addresses");

    if (oldWebsites.includes(website)) return;

    oldWebsites.push(website);
    oldEmails.push(email);
    oldPhones.push(phone);
    oldDobs.push(dob);
    oldAddresses.push(address);

    chrome.storage.sync.set({
        websites: oldWebsites,
        emails: oldEmails,
        phones: oldPhones,
        dobs: oldDobs,
        addresses: oldAddresses,
    });
}
