import { normalize as normalizeEntity, schema } from 'normalizr';

/**
 * @typedef {Object} EntryModel
 * @property {string} id
 * @property {string} title
 * @property {string} description
 * @property {number} value
 */

const entrySchema = new schema.Entity('entry');

/**
 * @param {string} id
 * @param {string} title
 * @param {string} description
 * @param {number} value
 * @returns {EntryModel}
 * @constructor
 */
function Entry(id, title, description, value) {
  return {
    id,
    title,
    description,
    value,
  };
}

export function normalize(json) {
  return normalizeEntity(json, entrySchema);
}

export default Entry;
