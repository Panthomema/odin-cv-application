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
    position: {
      tooShort: 'Position must be at least 2 characters.',
      tooLong: 'Position cannot exceed 40 characters.',
    },
    startDate: {
      min: 'Start date must be greater than December 1960.',
      max: 'Start date must be earlier than next month.',
      badInput: 'Start date requires month and year.',
      valueMissing: 'Start date is required if end date is provided.',
      greaterThanEnd: "Start date can't be greater than end date.",
    },
    endDate: {
      min: 'End date must be greater than December 1960.',
      max: 'End date must be earlier than next month.',
      badInput: 'End date requires month and year.',
      lowerThanStart: "End date can't be lower than start date.",
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

  const formatDate = (date) =>
    `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, 0)}`;

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
    const startDateField = form.elements.startDate;
    const endDateField = form.elements.endDate;

    Array.from(form.elements).forEach((field) => {
      if (field.tagName === 'INPUT' && !field.checkValidity()) {
        console.log(field.validity);
        newErrors[field.name] =
          getErrorMessage(field) ?? field.validationMessage;
      }
    });

    if (endDateField.value && !startDateField.value) {
      newErrors.startDate = validationErrorMessages.startDate.valueMissing;
    }

    if (
      startDateField.value &&
      endDateField.value &&
      new Date(startDateField.value) > new Date(endDateField.value)
    ) {
      newErrors.startDate = validationErrorMessages.startDate.greaterThanEnd;
      newErrors.endDate = validationErrorMessages.endDate.lowerThanStart;
    }

    if (Object.keys(newErrors).length > 0) {
      console.log(newErrors);
      setErrors(newErrors);
      return;
    }

    const formData = new FormData(form);
    const newWorkExperience = Object.fromEntries(formData.entries());
    console.log(newWorkExperience);

    return; // for debugging

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
        constraints={{ minLength: 2, maxLength: 50 }}
        error={errors.position}
      />
      <div className={styles.inlineFields}>
        <FormField
          name="startDate"
          type="month"
          label="Start Date"
          tag="optional"
          onBlur={handleBlur}
          constraints={{ min: '1960-01', max: formatDate(new Date()) }}
          error={errors.startDate}
        />
        <FormField
          name="endDate"
          type="month"
          label="End Date"
          tag="optional"
          onBlur={handleBlur}
          constraints={{ min: '1900-01', max: formatDate(new Date()) }}
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
