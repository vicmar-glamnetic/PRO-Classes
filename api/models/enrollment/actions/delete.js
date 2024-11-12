import { deleteRecord, ActionOptions, DeleteEnrollmentActionContext } from "gadget-server";

/**
 * @param { DeleteEnrollmentActionContext } context
 */
export async function run({ params, record, logger, api, connections }) {
  await deleteRecord(record);
};

/** @type { ActionOptions } */
export const options = {
  actionType: "delete",
};
