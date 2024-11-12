import type { GadgetModel } from "gadget-server";

// This file describes the schema for the "class" model, go to https://inh-pro-classes.gadget.app/edit to view/edit your model in Gadget
// For more information on how to update this file http://docs.gadget.dev

export const schema: GadgetModel = {
  type: "gadget/model-schema/v1",
  storageKey: "bWj98RCS9AiM",
  fields: {
    date: {
      type: "dateTime",
      includeTime: true,
      storageKey: "Qyj3ADhl02uI",
    },
    isVirtual: { type: "boolean", storageKey: "5oIGvABMRkg6" },
    location: { type: "string", storageKey: "vuMTs8LfUXKm" },
    maximumEnrollees: { type: "number", storageKey: "6hZwYXElTPSN" },
    name: { type: "string", storageKey: "VDTSmSZkZW1-" },
    productId: { type: "string", storageKey: "2qhhz2VY_AnW" },
  },
};
