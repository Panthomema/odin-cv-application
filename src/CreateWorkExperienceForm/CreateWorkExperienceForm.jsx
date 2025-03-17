import { useRef, useState } from 'react';
import Form from '../Form/Form';
import FormField from '../FormField/FormField';
import styles from './CreateWorkExperienceForm.module.css';

export default function CreateWorkExperienceForm({ onValidData, onCancel }) {
  const [errors, setErrors] = useState({});
  const startDateRef = useRef(null);
  const endDateRef = useRef(null);

  const formatDateYearMonth = (date) =>
    `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, 0)}`;

  const formatDateYearMonthText = (date) =>
    new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' }).format(
      date,
    );

  const today = new Date();
  const fiftyYearsAgo = new Date();
  fiftyYearsAgo.setFullYear(fiftyYearsAgo.getFullYear() - 50);

  const maxDate = formatDateYearMonth(today);
  const maxDateText = formatDateYearMonthText(today);
  const minDate = formatDateYearMonth(fiftyYearsAgo);
  const minDateText = formatDateYearMonthText(fiftyYearsAgo);

  const validationErrorMessages = {
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
      rangeOverflow: `Start date must be earlier than ${maxDateText}.`,
      badInput: 'Start date requires month and year.',
      valueMissing: 'Start date is required if end date is provided.',
      greaterThanEnd: "Start date can't be greater than end date.",
    },
    endDate: {
      rangeUnderflow: `End date must be greater than ${minDateText}.`,
      rangeOverflow: `End date must be earlier than ${maxDateText}.`,
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

  const handleBlur = (e) => {
    const field = e.target;
    if (field.tagName !== 'INPUT' || field.tagName === 'TEXTAREA') return;

    const errorMessage = !field.checkValidity()
      ? (getErrorMessage(field) ?? field.validationMessage)
      : null;

    setErrors((prevErrors) => ({
      ...prevErrors,
      [field.name]: errorMessage,
    }));
  };

  const handleDateBlur = () => {
    const startDateField = startDateRef.current;
    const endDateField = endDateRef.current;

    if (startDateField.value) {
      endDateField.min = startDateField.value;
    }

    let startDateErrorMessage = null;
    let endDateErrorMessage = null;

    if (endDateField.value && !startDateField.value) {
      startDateErrorMessage = validationErrorMessages.startDate.valueMissing;
    }

    if (
      startDateField.value &&
      endDateField.value &&
      new Date(startDateField.value) > new Date(endDateField.value)
    ) {
      startDateErrorMessage = validationErrorMessages.startDate.greaterThanEnd;
      endDateErrorMessage = validationErrorMessages.endDate.lowerThanStart;
    }

    if (!startDateField.checkValidity()) {
      startDateErrorMessage =
        getErrorMessage(startDateField) ?? startDateField.validationMessage;
    }

    if (!endDateField.checkValidity()) {
      endDateErrorMessage =
        getErrorMessage(endDateField) ?? endDateField.validationMessage;
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      startDate: startDateErrorMessage ?? prevErrors.startDate,
      endDate: endDateErrorMessage ?? prevErrors.endDate,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const startDateField = startDateRef.current;
    const endDateField = endDateRef.current;

    const newErrors = {};

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

    Array.from(form.elements).forEach((field) => {
      if (
        (field.tagName === 'INPUT' || field.tagName === 'TEXTAREA') &&
        !field.checkValidity()
      ) {
        console.log(field.validity);
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
        constraints={{ minLength: 2, maxLength: 50 }}
        error={errors.position}
      />
      <div className={styles.inlineFields}>
        <FormField
          ref={startDateRef}
          name="startDate"
          type="month"
          label="Start Date"
          tag="optional"
          onBlur={handleDateBlur}
          constraints={{ min: minDate, max: maxDate }}
          error={errors.startDate}
        />
        <FormField
          ref={endDateRef}
          name="endDate"
          type="month"
          label="End Date"
          tag="optional"
          onBlur={handleDateBlur}
          constraints={{ min: minDate, max: maxDate }}
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
