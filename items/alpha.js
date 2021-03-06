'use strict';
const validator = require('validator');
/**
 * Created by Adrian on 20-Mar-16.
 */
module.exports = (IFace) => {

  return class SanitizeAlpha extends IFace {
    static code() {
      return "ALPHA"
    };

    static publicName() {
      return "Alpha";
    }

    /*
     * Verifies if the given input is alpha-string
     * OPTIONS:
     *  - dot=false -> should we allow dots in the alpha?
     *  - colon=false -> should we allow colons in the alpha? (:)
     *  - dash=false -> should we allow dashes in the alpha?
     *  - underscore=false -> should we allow underscore in the alpha?
     *  - numeric=false -> transforms into AlphaNumeric
     *  - slash=false -> if set to true, will allow single-forward slash
     *  - min/max -> max string length
     * */
    validate(d, opt) {
      if (typeof d !== 'string') return false;
      d = d.trim();
      let checker = d;
      if (opt.dot === true) {
        checker = checker.replace(/\./g, '');
      }
      if (opt.slash === true) {
        checker = checker.replace(/\//g, '');
        checker = checker.replace(/\\/g, '');
      }
      if (opt.colon === true) {
        checker = checker.replace(/:/g, '');
      }
      if (opt.dash === true) {
        checker = checker.replace(/\-/g, '');
      }
      if (opt.underscore === true) {
        checker = checker.replace(/_/g, '');
      }
      let validateFn = (opt.numeric === true ? 'isAlphanumeric' : 'isAlpha');
      if (!validator[validateFn](checker)) return false;
      if (typeof opt.max === 'number' && d.length > opt.max) return false;
      if (typeof opt.min === 'number' && d.length < opt.min) return false;
      if (opt.slash === true) {
        d = d.replace(/\/+/g, '/');
        d = d.replace(/\\+/gm, '/');
      }
      return {
        value: d
      };
    }
  }
};