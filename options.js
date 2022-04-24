let infoTable = document.getElementById("infoTable");

async function tableAppendData() {
    let websites = await getStorageByKey("websites");
    let emails = await getStorageByKey("emails");
    let dobs = await getStorageByKey("dobs");
    let addresses = await getStorageByKey("addresses");

    for (let i = 0; i < websites.length; i++) {
        let newRow = infoTable.insertRow();
        newRow.insertCell().append(websites[i]);
        newRow.insertCell().append(emails[i]);
        newRow.insertCell().append(dobs[i]);
        newRow.insertCell().append(addresses[i]);
    }
}

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

tableAppendData();
