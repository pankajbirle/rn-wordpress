'use strict';

/* Custom default messages to validate form fields */
const defaultMessages = {
  /* English language - Used by default */
  en: {
    name: 'Please enter a valid name.',
    numbers: 'Please enter a valid number.',
    password: `Password requires minimum 6 & maximum 32 characters.`,
    email: 'Please enter a valid email address.',
    date: 'Please enter a valid date ({1}).',
    minlength: 'Min length must be {1}.',
    maxlength: 'Max length must be {1}.',
    required: `This field is required.`,
    checkRequired: 'This field is required.',
    },
};

export default defaultMessages;
