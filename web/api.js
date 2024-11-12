// Sets up the API client for interacting with your backend. 
// For your API reference, visit: https://docs.gadget.dev/api/inh-pro-classes
import { Client } from "@gadget-client/inh-pro-classes";

export const api = new Client({ environment: window.gadgetConfig.environment });
