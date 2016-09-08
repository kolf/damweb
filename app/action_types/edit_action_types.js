import createAsyncActionsTypes from "./utils/create_async_actions_types";

const AsyncTypes = createAsyncActionsTypes([
    "viewEditPic",
    "EDIT_DATA",
    "EDIT_JOINTOSPECIAL",
    "EDIT_JOINTOSPECIAL_LIST",
    "EDIT_JOINTOGROUP_LIST",
    "EDIT_POSTDATA",
    "EDIT_SAVEDATA",
    "GET_FAVORITE_LIST",
    "POST_FAVORITE_ITEM",
    "POST_ALLNOPASS",
    "GET_KEYWORDBYID",
    "FIND_KEYWORDID",
    "ADD_KEYWORDID",
    "MODIFY_KEYWORDID",
    "FIND_LOCALTION",
    "GET_PUSHTODATA",
    "POST_PUSHTODATA"
]);

export default {...AsyncTypes};
