import { getStorageByKey } from "/modules/global.mjs";

let infoTable = document.getElementById("infoTable");

async function tableAppendData() {
    let websites = await getStorageByKey("websites");
    let emails = await getStorageByKey("emails");
    let phones = await getStorageByKey("phones");
    let dobs = await getStorageByKey("dobs");
    let addresses = await getStorageByKey("addresses");

    for (let i = 0; i < websites.length; i++) {
        let newRow = infoTable.insertRow();
        newRow.insertCell().append(websites[i]);
        newRow.insertCell().append(emails[i]);
        newRow.insertCell().append(phones[i]);
        newRow.insertCell().append(dobs[i]);
        newRow.insertCell().append(addresses[i]);
    }
}

tableAppendData();
