import type { Action } from './types';

export const SIGN_OUT = 'SIGN_OUT';

export function signOut():Action {
  return {
    type: SIGN_OUT,
  }
}
