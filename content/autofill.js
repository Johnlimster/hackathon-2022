let hasEmailField = false;
let hasDobField = false;
let hasAddressField = false;

let addressFields = [
    "street-address",
    "address-line1",
    "address-line2",
    "address-line3",
];

let inputEls = document.querySelectorAll("input[autocomplete]");
inputEls.forEach((inputEl) => {
    let autofillDetails;
    if (inputEl.autocomplete == "on") autofillDetails = inputEl.name;
    else autofillDetails = inputEl.autocomplete;
    inputEl.placeholder = autofillDetails; // TODO: remove this

    let fieldType = fieldTypeFromAutofillDetails(autofillDetails);
    if (fieldType == "email") hasEmailField = true;
    else if (fieldType == "bday") hasDobField = true;
    else if (fieldType == "address") hasAddressField = true;
});

const formEls = document.querySelectorAll("form");
formEls.forEach((formEl) => {
    formEl.addEventListener("submit", () => {
        chrome.runtime.sendMessage(
            { hasEmailField, hasDobField, hasAddressField },
            function (response) {
                console.log(response.farewell);
            }
        );
    });
});

function fieldTypeFromAutofillDetails(autofillDetails) {
    let detailsList = autofillDetails.split(" ");
    if (detailsList.includes("email")) return "email";
    else if (detailsList.includes("bday")) return "bday";
    else if (addressFields.some((value) => detailsList.includes(value)))
        return "address";
    else return "n/a";
}
