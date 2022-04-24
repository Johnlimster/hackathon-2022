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
