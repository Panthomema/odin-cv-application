import { useRef, useState } from 'react';
import utils from '../../styles/Utils.module.css';
import {
  constraints,
  errorMessages,
  getErrorMessage,
} from '../../utils/validation';
import Form from '../Form/Form';
import FormField from '../FormField/FormField';

export default function CreateEducationForm({ onSubmit, onCancel }) {
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

    console.log(startDateErrorMessage, endDateErrorMessage);

    setErrors((prevErrors) => ({
      ...prevErrors,
      startDate: startDateErrorMessage,
      endDate: endDateErrorMessage,
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
    const newExperience = Object.fromEntries(
      formData.entries().map(([key, value]) => [key, value.trim()]),
    );

    newExperience.id = crypto.randomUUID();
    newExperience.visible = true;

    onSubmit(newExperience);
  };

  return (
    <Form title="Create Education" onSubmit={handleSubmit} onCancel={onCancel}>
      <FormField
        name="institutionName"
        type="text"
        label="Institution Name"
        tag="required"
        onBlur={handleBlur}
        constraints={constraints.institutionName}
        error={errors.institutionName}
      />
      <FormField
        name="title"
        type="text"
        label="Title"
        tag="required"
        onBlur={handleBlur}
        constraints={constraints.title}
        error={errors.title}
      />
      <FormField
        name="location"
        type="text"
        label="Location"
        tag="optional"
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
          onBlur={handleDateBlur}
          constraints={constraints.endDate}
          error={errors.endDate}
        />
      </div>
    </Form>
  );
}
