import Types from "app/action_types";

import {
  loadAuth    as loadAuthCall,
  signIn      as signInCall,
  signOut     as signOutCall,
  signUp      as signUpCall,
  getUserInfo as getUserInfoCall
} from "app/api/api_calls";

export function loadAuth () {
  return {
    type: Types.loadAuth,
    callAPI: () => loadAuthCall()
  }
}

export function signIn (params) {
  return {
    type: Types.signIn,
    callAPI: () => signInCall(params)
  }
}

export function signOut () {
  return {
    type: Types.signOut,
    callAPI: () => signOutCall()
  }
}

export function signUp (params) {
  return {
    type: Types.signUp,
    callAPI: () => signUpCall(params)
  }
}

export function getUserInfo (params) {
  return {
    type: Types.getUserInfo,
    callAPI: () => getUserInfoCall(params)
  }
}