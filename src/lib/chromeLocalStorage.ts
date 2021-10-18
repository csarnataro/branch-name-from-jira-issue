import { Options } from "../types";

async function saveOption(options: Partial<Options>): Promise<void> {
  await checkAndSet(options, 'enableStandardPrefix', true);
  await checkAndSet(options, 'addGitCommand', true);
  await checkAndSet(options, 'maxBranchLength', options.maxBranchLength);
  await checkAndSet(options, 'customPrefixes', JSON.stringify(options.customPrefixes));
}

async function checkAndSet(options: Partial<Options>, optionName: string, valueIfSet: any): Promise<void> {
  if (Object.keys(options).includes(optionName)) {
    const entry = Object.entries(options).find(option => option[0] === optionName);
    if (Boolean(entry && entry.length ? entry[1] : false)) {
      await setItem(optionName, valueIfSet);
    } else {
      await removeItem(optionName);
    }
  }
}

async function removeItem(key: string): Promise<void> {
  console.log(`Removing [${key}]`);
  return chrome.storage.local.remove([key]);
}

// Store item in local storage:
async function setItem(key: string, value: string): Promise<void> {
  try {
    console.log(`Storing [${key}: ${value}]`);
    // await chrome.storage.local.remove([key]);
    await chrome.storage.local.set({ [key]: value });
  } catch (e) {
    console.error("Error in setItem");
    console.error(e);
  }
}

async function retrieveOptions(): Promise<Partial<Options>> {
  return getAllStorageLocalData();

}

// Gets item from local storage with specified key.
async function getItem(key: string): Promise<any> {
  let value;
  console.log('Retrieving key [' + key + ']');
  try {
    value = await chrome.storage.local.get(['enableStandardPrefix']);  // <-- Local storage!
  } catch (e) {
    console.error("Error inside getItem() for key:" + key);
    console.error(e);

  }
  console.log("Returning value: " + value);
  return value ? JSON.parse(value[key]) : null;
}

// Reads all data out of storage.local and exposes it via a promise.
//
// https://developer.chrome.com/docs/extensions/reference/storage/#asynchronous-preload-from-storage
function getAllStorageLocalData(): Promise<Partial<Options>> {
  // Immediately return a promise and start asynchronous work
  return new Promise((resolve, reject) => {
    // Asynchronously fetch all data from storage.local.
    chrome.storage.local.get(null, (items) => {
      // Pass any observed errors down the promise chain.
      if (chrome.runtime.lastError) {
        return reject(chrome.runtime.lastError);
      }
      // Pass the data retrieved from storage down the promise chain.
      resolve(items);
    });
  });
}

export {
  saveOption,
  retrieveOptions,
}