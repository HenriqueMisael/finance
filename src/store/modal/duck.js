import { createActions, createReducer, Types as defaultypes } from 'reduxsauce';
import { identity } from 'lodash-es';
import { Set } from 'immutable';

/**
 * @typedef {Object} ModalState
 * @property {Immutable.Set<string>} opened
 */

/**
 * @type {ModalState}
 */
export const initialState = Object.freeze({
  opened: Set(),
});

/**
 * @returns {ModalState}
 */
const clear = () => ({ ...initialState });

/**
 * @param {ModalState} state
 * @param {{modal: string}} action
 * @returns {ModalState}
 */
const close = (state, { modal }) => ({ ...state, opened: state.opened.remove(modal) });

/**
 * @param {ModalState} state
 * @param {{modal: string}} action
 * @returns {ModalState}
 */
const open = (state, { modal }) => ({
  ...state,
  opened: state.opened.add(modal),
});

export const { Types, Creators } = createActions({
  modalClear: [],
  modalClose: ['modal'],
  modalOpen: ['modal'],
});

export default createReducer(initialState, {
  [defaultypes.DEFAULT]: identity,
  [Types.MODAL_CLEAR]: clear,
  [Types.MODAL_CLOSE]: close,
  [Types.MODAL_OPEN]: open,
});
