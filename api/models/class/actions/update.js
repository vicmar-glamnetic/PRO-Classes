import { applyParams, save, ActionOptions, UpdateClassActionContext } from "gadget-server";

/**
 * @param { UpdateClassActionContext } context
 */
export async function run({ params, record, logger, api, connections }) {
  applyParams(params, record);
  await save(record);
};

/** @type { ActionOptions } */
export const options = {
  actionType: "update",
};
