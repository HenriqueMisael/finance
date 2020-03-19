/**
 * @typedef {Object} ProfileModel
 * @property {string} name
 * @property {number} initialBalance
 * @property {string} theme
 */

/**
 * @property {?string} name
 * @property {?number} initialBalance
 * @property {?string} theme
 * @returns {ProfileModel}
 * @constructor
 */
function Profile(name = '', initialBalance = 0, theme = 'dark') {
  return { name, initialBalance, theme };
}

export default Profile;
