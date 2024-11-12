import { deleteRecord, ActionOptions, DeleteClassActionContext } from "gadget-server";

/**
 * @param { DeleteClassActionContext } context
 */
export async function run({ params, record, logger, api, connections }) {
  await deleteRecord(record);
};

/** @type { ActionOptions } */
export const options = {
  actionType: "delete",
};
