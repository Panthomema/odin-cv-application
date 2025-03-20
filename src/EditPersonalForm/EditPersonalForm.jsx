import { useCallback, useState } from 'react';
import Form from '../Form/Form';
import FormField from '../FormField/FormField';
import { constraints, getErrorMessage } from '../utils/validation';

export default function EditPersonalForm({ data, onSubmit, onCancel }) {
  const [errors, setErrors] = useState({});

  const handleBlur = useCallback((e) => {
    const field = e.target;

    if (field.tagName !== 'INPUT' || field.checkValidity()) return;

    const errorMessage = getErrorMessage(field) ?? field.validationMessage;

    setErrors((prevErrors) =>
      prevErrors[field.name] === errorMessage
        ? prevErrors
        : {
            ...prevErrors,
            [field.name]: errorMessage,
          },
    );
  }, []);

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
        constraints={constraints.fullName}
        error={errors.fullName}
      />
      <FormField
        name="email"
        type="email"
        label="Email"
        tag="recommended"
        value={data?.email}
        onBlur={handleBlur}
        constraints={constraints.email}
        error={errors.email}
      />
      <FormField
        name="phoneNumber"
        type="tel"
        label="Phone Number"
        tag="recommended"
        value={data?.phoneNumber}
        onBlur={handleBlur}
        constraints={constraints.phoneNumber}
        error={errors.phoneNumber}
      />
      <FormField
        name="location"
        type="text"
        label="Location"
        tag="optional"
        value={data?.location}
        onBlur={handleBlur}
        constraints={constraints.location}
        error={errors.location}
      />
    </Form>
  );
}
