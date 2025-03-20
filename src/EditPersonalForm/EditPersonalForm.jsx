import { useState } from 'react';
import Form from '../Form/Form';
import FormField from '../FormField/FormField';

export default function EditPersonalForm({ data, onSubmit, onCancel }) {
  const [errors, setErrors] = useState({});

  const validationErrorMessages = {
    fullName: {
      valueMissing: 'Full name is required.',
      tooShort: 'Full name must be at least 2 characters.',
      tooLong: 'Full name cannot exceed 40 characters.',
    },
    email: {
      typeMismatch: 'Please enter a valid email address.',
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

  const getErrorMessage = (field) => {
    const rules = validationErrorMessages[field.name];
    if (!rules) return null;

    for (const [rule, message] of Object.entries(rules)) {
      if (field.validity[rule]) return message;
    }

    return null;
  };

  const handleBlur = (e) => {
    const field = e.target;
    if (field.tagName !== 'INPUT') return;

    const errorMessage = !field.checkValidity()
      ? (getErrorMessage(field) ?? field.validationMessage)
      : null;

    setErrors((prevErrors) => ({
      ...prevErrors,
      [field.name]: errorMessage,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;

    const newErrors = {};
    Array.from(form.elements).forEach((field) => {
      if (field.tagName === 'INPUT' && !field.checkValidity()) {
        newErrors[field.name] =
          getErrorMessage(field) ?? field.validationMessage;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      console.log(newErrors);
      setErrors(newErrors);
      return;
    }

    const formData = new FormData(form);

    const updatedPersonal = Object.fromEntries(
      formData.entries().map(([key, value]) => [key, value.trim()]),
    );

    onSubmit(updatedPersonal);
  };

  return (
    <Form
      title="Edit Personal Details"
      onSubmit={handleSubmit}
      onCancel={onCancel}
    >
      <FormField
        name="fullName"
        type="text"
        label="Full Name"
        tag="required"
        value={data?.fullName}
        onBlur={handleBlur}
        constraints={{ required: true, minLength: 2, maxLength: 40 }}
        error={errors.fullName}
      />
      <FormField
        name="email"
        type="email"
        label="Email"
        tag="recommended"
        value={data?.email}
        onBlur={handleBlur}
        constraints={{ maxLength: 320 }}
        error={errors.email}
      />
      <FormField
        name="phoneNumber"
        type="tel"
        label="Phone Number"
        tag="recommended"
        value={data?.phoneNumber}
        onBlur={handleBlur}
        constraints={{ pattern: '\\+?\\d(?:\\s?[\\d\\-]){6,14}' }}
        error={errors.phoneNumber}
      />
      <FormField
        name="location"
        type="text"
        label="Location"
        tag="optional"
        value={data?.location}
        onBlur={handleBlur}
        constraints={{ minLength: 2, maxLength: 50 }}
        error={errors.location}
      />
    </Form>
  );
}
