import Types         from "app/action_types";
import matchesAction from "./utils/matches_action";
import * as ih       from "./utils/immutable_helpers";

const tableInit = {
    "customer": [
        {
            "contractId": "2342",
            "contractTitle": "新东方科技",
            "contractModelType": "1"
        }
    ],
    "constract": [
        {
            "contractId": "2342",
            "contractTitle": "新浪娱乐",
            "contractModelType": "1"
        }
    ]
};

const initialState = ih.immutable({
  "doing": false,
  "error": null,
  "data": {}
});

export default function SearchReducer (state = initialState, action) {

  // SEARCHRELIST
  if (matchesAction(action, Types.SEARCHRELIST.request)) {
    state = ih.set(state, "doing", true);
  }
  if (matchesAction(action, Types.SEARCHRELIST.done)) {
    state = ih.set(state, "doing", false);
    state = ih.set(state, "error", false);
    Object.assign(tableInit, action.apiResponse);
    state = ih.set(state, "data", tableInit);
  }
  if (matchesAction(action, Types.SEARCHRELIST.fail)) {
    state = ih.set(state, "error", action.apiError);
    state = ih.set(state, "doing", false);
  }

  return state;
}
