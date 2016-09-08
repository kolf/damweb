import createAsyncActionsTypes from "./utils/create_async_actions_types";

const AsyncTypes = createAsyncActionsTypes([
    "GET_DRAFTDATA",
    "POST_RELIEVEDRAFT",
    "GET_FAVORITETAGS",
    "GET_FAVORITELIST",
    "POST_DELETEFAVOROTE",
    "POST_DELETERESROUCE",
    "POST_ADDFAVORITE",
    "GET_MYNEWSLIST",
    "POST_DELETEMYNEWS",
    "POST_TOMYNEWS",
    "GET_PERSONALDATA",
]);

export default {...AsyncTypes };
