import createAsyncActionsTypes from "./utils/create_async_actions_types";

const AsyncTypes = createAsyncActionsTypes([

  "REVIEWRECORDSVIEW",
  "ADDINEDIT",

  "EDIT_STORAGE_FILTER",
  "EDIT_TOEDIT_FILTER",
  "EDIT_OFFLINE_FILTER",
  "EDIT_OFFLINE_DATA",
  "EDIT_STORAGE_DATA",
  "EDIT_TOEDIT_DATA",
  "EDIT_PUBLISH_FILTER",
  "EDIT_GET_ISEDIT",
  "GET_POSTILHISTORY",
  "POST_EDITOFFLINE",
  "POST_EDITONLINE"
]);

export default {...AsyncTypes};
