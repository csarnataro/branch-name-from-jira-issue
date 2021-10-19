import { Options } from '../types';

async function removeItem(key: string): Promise<void> {
  return chrome.storage.local.remove([key]);
}

// Store item in local storage:
async function setItem(key: string, value: string): Promise<void> {
  try {
    await chrome.storage.local.set({ [key]: value });
  } catch (e) {
    console.error('Error in setItem');
    console.error(e);
  }
}

async function checkAndSet(
  options: Partial<Options>,
  optionName: string,
  valueIfSet: any,
): Promise<void> {
  if (Object.keys(options).includes(optionName)) {
    const entry = Object.entries(options).find((option) => option[0] === optionName);
    if (entry && entry.length ? entry[1] : false) {
      await setItem(optionName, valueIfSet);
    } else {
      await removeItem(optionName);
    }
  }
}
async function saveOption(options: Partial<Options>): Promise<void> {
  await checkAndSet(options, 'enableStandardPrefix', true);
  await checkAndSet(options, 'addGitCommand', true);
  await checkAndSet(options, 'maxBranchLength', options.maxBranchLength);
  await checkAndSet(options, 'customPrefixes', JSON.stringify(options.customPrefixes));
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
      return resolve(items);
    });
  });
}

async function retrieveOptions(): Promise<Partial<Options>> {
  return getAllStorageLocalData();
}

export {
  saveOption,
  retrieveOptions,
};
