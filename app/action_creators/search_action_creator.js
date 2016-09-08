import Types from "app/action_types/search";

import {
  searchRsList as searchRsListCall,
} from "app/api/api_calls";


export function searchRsList (params) {
  return {
    type: Types.SEARCHRELIST,
    callAPI: () => searchRsListCall(params)
  }
}
