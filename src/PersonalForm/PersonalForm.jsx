import { useRef, useState } from 'react';
import FormField from '../FormField/FormField';
import utils from '../styles/Utils.module.css';
import styles from './PersonalForm.module.css';

export default function PersonalForm({ data, onSubmit, onCancel }) {
  const [errors, setErrors] = useState({});
  const formRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = formRef.current;

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    const newErrors = {};
    Array.from(form.elements).forEach((field) => {
      if (field.tagName === 'INPUT' && !field.checkValidity()) {
        newErrors[field.name] = field.validationMessage;
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
        constraints={{ required: true, minLength: 2, maxLength: 60 }}
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
