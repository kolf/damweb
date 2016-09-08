import createAsyncActionsTypes from "./utils/create_async_actions_types";

const AsyncTypes = createAsyncActionsTypes([
  "CMSTOPICSTATUS",
  "CMSFILTER",
  "CMSSEARCH",
  "TOPICFREQUENCY",
  "TOPICCFG",
  "CMSCHANNELLIST",
  "CHANNELCFG",
  "SCROLLLIST",
  "PICLIST",
  "CMSCONTENTFILTER",
  "CMSCONTENTSEARCH",
  "GETBASICINFO",
  "SAVETOPIC",
  "TAGDATA",
  "DELETETAG",
  "DELETEPIC",
  "TAGPICLIST",
  "PUBLICAD",
  "PICINFO",
  "PUBLICRECOMMEND"
]);

export default {...AsyncTypes};
