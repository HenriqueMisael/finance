import { normalize as normalizeEntity, schema } from 'normalizr';

/**
 * @typedef {Object} EntryModel
 * @property {string} id
 * @property {string} title
 * @property {string} description
 * @property {number} value
 * @property {string} transactionMethod
 */

const entrySchema = new schema.Entity('entry');

/**
 * @param {string} id
 * @param {string} title
 * @param {string} description
 * @param {number} value
 * @param {string} transactionMethod
 * @returns {EntryModel}
 * @constructor
 */
function Entry(id, title, description, value, transactionMethod) {
  return {
    id,
    title,
    description,
    value,
    transactionMethod,
  };
}

export function normalize(json) {
  return normalizeEntity(json, entrySchema);
}

export default Entry;
