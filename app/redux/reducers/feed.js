import type { Action } from '../actions/types';
import {
  SELECT_PROFILE,
} from '../actions/feed';

export type State = {
  selectedProfile: Object,
}

const initialState = {
  selectedProfile: {},
};

export default function (state:State = initialState, action:Action): State {
  if (action.type === SELECT_PROFILE) {
    return {
      ...state,
      selectedProfile: action.profile,
    };
  }

  return state;
}
