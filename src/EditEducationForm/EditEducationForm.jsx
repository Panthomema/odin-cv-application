import { useRef, useState } from 'react';
import Form from '../Form/Form';
import FormField from '../FormField/FormField';
import utils from '../styles/Utils.module.css';
import {
  constraints,
  errorMessages,
  getErrorMessage,
} from '../utils/validation';

export default function EditEducationForm({
  education,
  onSubmit,
  onDelete,
  onCancel,
}) {
  const [errors, setErrors] = useState({});
  const startDateRef = useRef(null);
  const endDateRef = useRef(null);

  const handleBlur = (e) => {
    const field = e.target;
    if (
      (field.tagName !== 'INPUT' && field.tagName !== 'TEXTAREA') ||
      field.checkValidity()
    )
      return;

    const errorMessage = getErrorMessage(field) ?? field.validationMessage;

    setErrors((prevErrors) => ({
      ...prevErrors,
      [field.name]: errorMessage,
    }));
  };

  const handleDateBlur = () => {
    const startDateField = startDateRef.current;
    const endDateField = endDateRef.current;

    let startDateErrorMessage = null;
    let endDateErrorMessage = null;

    if (endDateField?.value && !startDateField?.value) {
      startDateErrorMessage = errorMessages.startDate.valueMissing;
    }

    if (
      startDateField?.value &&
      endDateField?.value &&
      new Date(startDateField?.value) > new Date(endDateField?.value)
    ) {
      startDateErrorMessage = errorMessages.startDate.greaterThanEnd;
      endDateErrorMessage = errorMessages.endDate.lowerThanStart;
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

    if (endDateField?.value && !startDateField?.value) {
      newErrors.startDate = errorMessages.startDate.valueMissing;
    }

    if (
      startDateField?.value &&
      endDateField?.value &&
      new Date(startDateField?.value) > new Date(endDateField?.value)
    ) {
      newErrors.startDate = errorMessages.startDate.greaterThanEnd;
      newErrors.endDate = errorMessages.endDate.lowerThanStart;
    }

    Array.from(form.elements).forEach((field) => {
      if (
        (field.tagName === 'INPUT' || field.tagName === 'TEXTAREA') &&
        !field.checkValidity()
      ) {
        newErrors[field.name] =
          getErrorMessage(field) ?? field.validationMessage;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const formData = new FormData(form);
    const updatedEducation = Object.fromEntries(
      formData.entries().map(([key, value]) => [key, value.trim()]),
    );

    onSubmit(education.id, updatedEducation);
  };

  return (
    <Form
      title="Edit Education"
      onSubmit={handleSubmit}
      onCancel={onCancel}
      canDelete
      onDeleteClick={() => onDelete(education.id)}
    >
      <FormField
        name="institutionName"
        type="text"
        label="Institution Name"
        tag="required"
        value={education.institutionName}
        onBlur={handleBlur}
        constraints={constraints.institutionName}
        error={errors.institutionName}
      />
      <FormField
        name="title"
        type="text"
        label="Title"
        tag="required"
        value={education.title}
        onBlur={handleBlur}
        constraints={constraints.title}
        error={errors.title}
      />
      <FormField
        name="location"
        type="text"
        label="Location"
        tag="optional"
        value={education.location}
        onBlur={handleBlur}
        constraints={constraints.location}
        error={errors.location}
      />
      <div className={utils.inlineFields}>
        <FormField
          ref={startDateRef}
          name="startDate"
          type="month"
          label="Start Date"
          tag="optional"
          value={education.startDate}
          onBlur={handleDateBlur}
          constraints={constraints.startDate}
          error={errors.startDate}
        />
        <FormField
          ref={endDateRef}
          name="endDate"
          type="month"
          label="End Date"
          tag="optional"
          value={education.endDate}
          onBlur={handleDateBlur}
          constraints={constraints.endDate}
          error={errors.endDate}
        />
      </div>
    </Form>
  );
}
