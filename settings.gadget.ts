import type { GadgetSettings } from "gadget-server";

export const settings: GadgetSettings = {
  type: "gadget/settings/v1",
  frameworkVersion: "v1.3.0",
  plugins: {
    connections: {
      shopify: {
        apiVersion: "2024-10",
        enabledModels: [
          "shopifyCustomer",
          "shopifyProduct",
          "shopifyProductVariant",
        ],
        type: "partner",
        scopes: [
          "read_customers",
          "write_customers",
          "read_products",
          "write_products",
          "read_metaobjects",
          "write_metaobjects",
          "read_themes",
          "write_themes",
        ],
      },
    },
  },
};
