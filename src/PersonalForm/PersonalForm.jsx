import { useRef, useState } from 'react';
import FormField from '../FormField/FormField';
import utils from '../styles/Utils.module.css';
import styles from './PersonalForm.module.css';

export default function PersonalForm({ data, onSubmit, onCancel }) {
  const [errors, setErrors] = useState({});
  const formRef = useRef(null);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = formRef.current;

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
    <form
      ref={formRef}
      className={`${utils.card} ${styles.form}`}
      onSubmit={handleSubmit}
      noValidate
    >
      <h2>Edit Personal Details</h2>
      <FormField
        name="fullName"
        type="text"
        label="Full Name"
        tag="required"
        value={data?.fullName}
        error={errors.fullName}
        constraints={{ required: true, minLength: 2, maxLength: 40 }}
      />
      <FormField
        name="email"
        type="email"
        label="Email"
        tag="recommended"
        value={data?.email}
        error={errors.email}
        constraints={{ maxLength: 320 }}
      />
      <FormField
        name="phoneNumber"
        type="tel"
        label="Phone Number"
        tag="recommended"
        value={data?.phoneNumber}
        error={errors.phoneNumber}
        constraints={{ pattern: '\\+?[0-9]{7,15}' }}
      />
      <FormField
        name="location"
        type="text"
        label="Location"
        tag="optional"
        value={data?.location}
        error={errors.location}
        constraints={{ minLength: 2, maxLength: 100 }}
      />
      <div className={styles.buttonsArea}>
        <button
          type="button"
          className={`${styles.button} ${styles.buttonSecondary}`}
          onClick={onCancel}
        >
          Cancel
        </button>
        <button
          type="submit"
          className={`${styles.button} ${styles.buttonPrimary}`}
        >
          Save
        </button>
      </div>
    </form>
  );
}
