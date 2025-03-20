export const constraints = {
  fullName: { required: true, minLength: 2, maxLength: 40 },
  email: { minLength: 5, maxLength: 320 },
  phoneNumber: { pattern: '\\+?\\d(?:\\s?[\\d\\-]){6,14}' },
  location: { minLength: 2, maxLength: 50 },
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
};

export const getErrorMessage = (field) => {
  const rules = errorMessages[field.name];
  if (!rules) return null;

  for (const [rule, message] of Object.entries(rules)) {
    if (field.validity[rule]) return message;
  }

  return null;
};

