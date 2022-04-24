import { getStorageByKey } from "/modules/global.mjs";

let infoTable = document.getElementById("infoTable");
let emailSpan = document.getElementById("emailSpan");
let phoneSpan = document.getElementById("phoneSpan");
let dobSpan = document.getElementById("dobSpan");
let addressSpan = document.getElementById("addressSpan");

async function tableAppendData() {
    let websites = await getStorageByKey("websites");
    let emails = await getStorageByKey("emails");
    let phones = await getStorageByKey("phones");
    let dobs = await getStorageByKey("dobs");
    let addresses = await getStorageByKey("addresses");

    emailSpan.innerHTML =
        emailSpan.innerHTML.slice(0, -1) + emails.filter(Boolean).length;
    phoneSpan.innerHTML =
        phoneSpan.innerHTML.slice(0, -1) + phones.filter(Boolean).length;
    dobSpan.innerHTML =
        dobSpan.innerHTML.slice(0, -1) + dobs.filter(Boolean).length;
    addressSpan.innerHTML =
        addressSpan.innerHTML.slice(0, -1) + addresses.filter(Boolean).length;

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
