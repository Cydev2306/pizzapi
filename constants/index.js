import keyMirror from 'keymirror';

export default keyMirror({
  LIST_ALL_PIZZAS_REQUEST: null,
  LIST_ALL_PIZZAS_SUCCESS: null,
  LIST_ALL_PIZZAS_FAILURE: null,
});

export const CALL_API = Symbol('CALL_API');
