import { useState } from 'react';
import Form from '../Form/Form';
import FormField from '../FormField/FormField';

export default function CreateWorkExperienceForm({ data, onSubmit, onCancel }) {
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
      tooLong: 'Location cannot exceed 100 characters.',
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

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

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

    onSubmit(data);
  };

  return (
    <Form
      title="Create Work Experience"
      onSubmit={handleSubmit}
      onCancel={onCancel}
    >
      <FormField
        name="companyName"
        type="text"
        label="Company Name"
        tag="required"
        value={data?.companyName}
        onBlur={handleBlur}
        constraints={{ required: true, minLength: 2, maxLength: 40 }}
        error={errors.companyName}
      />
      <FormField
        name="position"
        type="text"
        label="Position"
        tag="recommended"
        value={data?.position}
        onBlur={handleBlur}
        constraints={{}}
        error={errors.position}
      />
    </Form>
  );
}
