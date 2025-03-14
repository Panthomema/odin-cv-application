import { useState } from 'react';
import Form from '../Form/Form';
import FormField from '../FormField/FormField';
import styles from './CreateWorkExperienceForm.module.css';

export default function CreateWorkExperienceForm({ onValidData, onCancel }) {
  const [errors, setErrors] = useState({});

  const validationErrorMessages = {
    companyName: {
      valueMissing: 'Company name is required.',
      tooShort: 'Company name must be at least 2 characters.',
      tooLong: 'Company name cannot exceed 40 characters.',
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
    const newWorkExperience = Object.fromEntries(formData.entries());
    console.log(newWorkExperience);

    onValidData((prevData) => ({
      ...prevData,
      workExperience: [
        ...(prevData.workExperience ?? []),
        { id: crypto.randomUUID(), ...newWorkExperience },
      ],
    }));
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
        onBlur={handleBlur}
        constraints={{ required: true, minLength: 2, maxLength: 40 }}
        error={errors.companyName}
      />
      <FormField
        name="position"
        type="text"
        label="Position"
        tag="recommended"
        onBlur={handleBlur}
        constraints={{}}
        error={errors.position}
      />
      <div className={styles.inlineFields}>
        <FormField
          name="startDate"
          type="month"
          label="Start Date"
          tag="optional"
          onBlur={handleBlur}
          constraints={{}}
          error={errors.startDate}
        />
        <FormField
          name="endDate"
          type="month"
          label="End Date"
          tag="optional"
          onBlur={handleBlur}
          constraints={{}}
          error={errors.endDate}
        />
      </div>
      <FormField
        name="description"
        type="textarea"
        label="Description"
        tag="recommended"
        onBlur={handleBlur}
        constraints={{}}
        error={errors.description}
      />
    </Form>
  );
}
