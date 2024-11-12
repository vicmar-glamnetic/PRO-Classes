import { applyParams, save, ActionOptions, UpdateEnrollmentActionContext } from "gadget-server";

/**
 * @param { UpdateEnrollmentActionContext } context
 */
export async function run({ params, record, logger, api, connections }) {
  applyParams(params, record);
  await save(record);
};

/** @type { ActionOptions } */
export const options = {
  actionType: "update",
};
