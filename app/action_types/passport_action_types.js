import createAsyncActionsTypes from "./utils/create_async_actions_types";

const AsyncTypes = createAsyncActionsTypes([
  "loadAuth",
  "signIn",
  "signOut",
  "signUp",
  "getUserInfo"
]);

export default {...AsyncTypes};
