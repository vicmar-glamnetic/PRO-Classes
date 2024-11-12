// src/api.js
// Sets up the API client for interacting with your backend.
// For your API reference, visit: https://docs.gadget.dev/api/inh-pro-classes
import { Client, BrowserSessionStorageType } from "@gadget-client/inh-pro-classes"; // Ensure this matches your package

export const api = new Client({
    environment: window.gadgetConfig.environment,
    authenticationMode: {
        browserSession: {
            storageType: BrowserSessionStorageType.Temporary, // Adjust this depending on your persistence needs
        },
    },
});
