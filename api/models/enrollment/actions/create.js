import { applyParams, save, ActionOptions, CreateEnrollmentActionContext } from "gadget-server";

/**
 * @param { CreateEnrollmentActionContext } context
 */
export async function run({ params, record, logger, api, connections }) {
  applyParams(params, record);
  await save(record);
};

/** @type { ActionOptions } */
export const options = {
  actionType: "create",
};
