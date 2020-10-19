import {
  CREATE_PERSON,
  UPDATE_PERSON,
  DELETE_PERSON,
  CLEAR_SELECTED_PERSON,
  FETCH_FAMILY,
  LISTEN_TO_SELECTED_PERSON,
} from './familyConstants';

export function fetchFamily(family) {
  return {
    type: FETCH_FAMILY,
    payload: family,
  };
}

export function listenToSelectedPerson(person) {
  return {
    type: LISTEN_TO_SELECTED_PERSON,
    payload: person,
  };
}

export function clearSelectedPerson() {
  return {
    type: CLEAR_SELECTED_PERSON,
  };
}

export function createPerson(person) {
  return {
    type: CREATE_PERSON,
    payload: person,
  };
}

export function updatePerson(person) {
  return {
    type: UPDATE_PERSON,
    payload: person,
  };
}

export function deletePerson(personId) {
  return {
    type: DELETE_PERSON,
    payload: personId,
  };
}
