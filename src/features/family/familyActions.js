import { FETCH_FAMILY } from './familyConstants';

export function fetchFamily(family) {
  return {
    type: FETCH_FAMILY,
    payload: family,
  };
}
