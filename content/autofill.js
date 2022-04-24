let hasEmailField = false;
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
    else if (detailsList.includes("bday")) return "bday";
    else if (addressFields.some((value) => detailsList.includes(value)))
        return "address";
    else return "n/a";
}

const createStylesheet = (file) => {
    const stylesheet = document.createElement("link");
    stylesheet.setAttribute("rel", "stylesheet");
    stylesheet.setAttribute("href", chrome.runtime.getURL(file));
    return stylesheet;
};

function displayWarning(msg) {
    let div = document.createElement("div");
    div.classList.add("kpxc-notification", "kpxc-notification-warning");
    let span1 = document.createElement("span");
    span1.classList.add("kpxc-banner-icon");
    let span2 = document.createElement("span");
    span2.innerHTML = msg;

    div.appendChild(span1);
    div.appendChild(span2);
    document.body.appendChild(div);

    setTimeout(() => {
        document.body.removeChild(div);
    }, 5000);
}

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

displayWarning("Please enter fields manually using pop-up.");
