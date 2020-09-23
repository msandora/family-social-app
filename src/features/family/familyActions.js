import { FETCH_FAMILY } from './familyConstants';

export function listenToFamily(family) {
  return {
    type: FETCH_FAMILY,
    payload: family,
  };
}
