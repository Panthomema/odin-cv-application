import { format } from 'date-fns';

const today = new Date();
const fiftyYearsAgo = new Date();
fiftyYearsAgo.setFullYear(fiftyYearsAgo.getFullYear() - 50);

const maxDate = format(today, 'yyyy-MM');
const maxDateText = format(today, 'MMMM yyyy');
const minDate = format(fiftyYearsAgo, 'yyyy-MM');
const minDateText = format(fiftyYearsAgo, 'MMM yyyy');

export const constraints = {
  fullName: { required: true, minLength: 2, maxLength: 40 },
  email: { minLength: 5, maxLength: 320 },
  phoneNumber: { pattern: '\\+?\\d(?:\\s?[\\d\\-]){6,14}' },
  location: { minLength: 2, maxLength: 50 },
  companyName: { required: true, minLength: 2, maxLength: 40 },
  position: { minLength: 2, maxLength: 50 },
  startDate: { min: minDate, max: maxDate },
  endDate: { min: minDate, max: maxDate },
  description: { minLength: 20, maxLength: 500 },
};

export const errorMessages = {
  fullName: {
    valueMissing: 'Full name is required.',
    tooShort: `Full name must be at least 2 characters.`,
    tooLong: 'Full name cannot exceed 40 characters.',
  },
  email: {
    typeMismatch: 'Please enter a valid email address.',
    tooShort: 'Email must be at least 5 characters.',
    tooLong: 'Email cannot exceed 320 characters.',
  },
  phoneNumber: {
    patternMismatch: 'Please provide a valid phone number.',
  },
  location: {
    tooShort: 'Location must be at least 2 characters.',
    tooLong: 'Location cannot exceed 50 characters.',
  },
  companyName: {
    valueMissing: 'Company name is required.',
    tooShort: 'Company name must be at least 2 characters.',
    tooLong: 'Company name cannot exceed 40 characters.',
  },
  position: {
    tooShort: 'Position must be at least 2 characters.',
    tooLong: 'Position cannot exceed 50 characters.',
  },
  startDate: {
    rangeUnderflow: `Start date must be greater than ${minDateText}.`,
    rangeOverflow: `Start date must be lower than ${maxDateText}.`,
    badInput: 'Start date requires month and year.',
    valueMissing: 'Start date is required if end date is provided.',
    greaterThanEnd: "Start date can't be greater than end date.",
  },
  endDate: {
    rangeUnderflow: `End date must be greater than ${minDateText}.`,
    rangeOverflow: `End date must be lower than ${maxDateText}.`,
    badInput: 'End date requires month and year.',
    lowerThanStart: "End date can't be lower than start date.",
  },
  description: {
    tooShort: 'Description must be at least 10 characters.',
    tooLong: 'Description cannot exceed 500 characters.',
  },
};

export const getErrorMessage = (field) => {
  const rules = errorMessages[field.name];
  if (!rules) return null;

  for (const [rule, message] of Object.entries(rules)) {
    if (field.validity[rule]) return message;
  }

  return null;
};
