import type { Action } from './types';

export const SELECT_PROFILE = 'SELECT_PROFILE';

export function selectProfile(profile: Object):Action {
  return {
    type: OPEN_REVIEW_MODAL,
    profile
  };
}
