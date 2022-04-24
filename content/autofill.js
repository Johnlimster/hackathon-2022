let hasEmailField = false;
let hasPhoneField = false;
let hasDobField = false;
let hasAddressField = false;

let addressFields = [
    "street-address",
    "address-line1",
    "address-line2",
    "address-line3",
];

function fieldTypeFromAutofillDetails(autofillDetails) {
    let detailsList = autofillDetails.split(" ");
    if (detailsList.includes("email")) return "email";
    else if (detailsList.includes("tel")) return "tel";
    else if (detailsList.includes("bday")) return "bday";
    else if (addressFields.some((value) => detailsList.includes(value)))
        return "address";
    else return "n/a";
}

function displayError(msg) {
    let div = document.createElement("div");
    div.classList.add("notification", "notification-error");
    let span1 = document.createElement("span");
    span1.classList.add("banner-icon");
    let span2 = document.createElement("span");
    span2.innerHTML = msg;

    div.appendChild(span1);
    div.appendChild(span2);
    document.body.appendChild(div);

    setTimeout(() => {
        document.body.removeChild(div);
    }, 5000);
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

const inputEls = document.querySelectorAll("input[autocomplete]");
inputEls.forEach((inputEl) => {
    let autofillDetails;
    if (inputEl.autocomplete == "on") autofillDetails = inputEl.name;
    else autofillDetails = inputEl.autocomplete;

    let fieldType = fieldTypeFromAutofillDetails(autofillDetails);
    if (fieldType == "email") hasEmailField = true;
    else if (fieldType == "tel") hasPhoneField = true;
    else if (fieldType == "bday") hasDobField = true;
    else if (fieldType == "address") hasAddressField = true;

    inputEl.addEventListener("input", async () => {
        let shareEmail = await getStorageByKey("shareEmail");
        let sharePhone = await getStorageByKey("sharePhone");
        let shareDob = await getStorageByKey("shareDob");
        let shareAddress = await getStorageByKey("shareAddress");

        if (
            (fieldType == "email" && !shareEmail) ||
            (fieldType == "tel" && !sharePhone) ||
            (fieldType == "bday" && !shareDob) ||
            (fieldType == "address" && !shareAddress)
        )
            displayError("Warning! You are sharing info you did not agree to.");
    });
});

const formEls = document.querySelectorAll("form");
formEls.forEach((formEl) => {
    formEl.addEventListener("submit", () => {
        chrome.runtime.sendMessage(
            { hasEmailField, hasPhoneField, hasDobField, hasAddressField },
            function (response) {
                console.log(response.farewell);
            }
        );
    });
});
