import { applyParams, save, ActionOptions, CreateClassActionContext } from "gadget-server";

/**
 * @param { CreateClassActionContext } context
 */
export async function run({ params, record, logger, api, connections }) {
  applyParams(params, record);
  await save(record);
};

/** @type { ActionOptions } */
export const options = {
  actionType: "create",
};
