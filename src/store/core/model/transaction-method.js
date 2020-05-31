import { normalize as normalizeEntity, schema } from 'normalizr';

/**
 * @typedef {Object} TransactionMethodModel
 * @property {string} id
 * @property {string} description
 */

const transactionMethodSchema = new schema.Entity('transactionMethod');

/**
 * @param {string} id
 * @param {string} description
 * @returns {TransactionMethodModel}
 * @constructor
 */
function TransactionMethod(id, description) {
  return {
    id,
    description,
  };
}

export function normalize(json) {
  return normalizeEntity(json, transactionMethodSchema);
}

export default TransactionMethod;
