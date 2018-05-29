'use strict';

/* Custom default rules to validate form fields */
const defaultRules = {
  name: /^[a-zA-Z\s]+$/,
  numbers: /^(([0-9]*)|(([0-9]*)\.([0-9]*)))$/,
  email: /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/,
  password : /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
  minlength(length, value) {
    if (length === void(0)) {
      throw 'ERROR: It is not a valid length, checkout your minlength settings.';
    } else if(value.length > length-1) {
      return true;
    }
    return false;
  },
  maxlength(length, value) {
    if (length === void(0)) {
      throw 'ERROR: It is not a valid length, checkout your maxlength settings.';
    } else if (value.length > length) {
      return false;
    }
    return true;
  },
  required: /\S+/,
};

export default defaultRules;
