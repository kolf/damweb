import createAsyncActionsTypes from "./utils/create_async_actions_types";

const AsyncTypes = createAsyncActionsTypes([
    "ADDINEDIT",
    "REVIEWRECORDSVIEW",
    "GET_POSTILDATA",
    "GET_PROVIDERLIST",
    "GET_PROVIDERBYID",
    "POST_PROVIDERDATA",
    "POST_DOWNLOADDATA",
    "POST_POSTIL",
    "GET_PRODUCTID",
    "POST_ADDTOTOPIC",
    "GET_ADDTOOVERSEA"
]);

export default {...AsyncTypes };
