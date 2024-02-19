import React, { useCallback } from "react";

export function useFormWithValidation() {
  const [values, setValues] = React.useState({});
  const [errors, setErrors] = React.useState({});
  const [isValid, setIsValid] = React.useState(false);
  const [isChange, setChange] = React.useState(false);
  const regexName = new RegExp(/^[a-zA-Zа-яА-Я\s\-]*$/)
  const regexEmail = new RegExp(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.([a-zA-Z-.]{2,})+$/)

  const handleChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;

    setIsValid(errors.name === '' ? true : false)
    
    setValues({...values, [name]: value});
    
    if (name === "name") {
      if (!value) {
        setErrors({...errors, [name]: 'Введите имя'});
      } else {
        setChange(true);
        if (value.length < 2) {
          setErrors({...errors, [name]: 'Минимум 2 символа'});
        } else {
          const validName = (regexName.test(value))
          setErrors({...errors, [name]: validName ? '' : 'Только русские и латинские буквы, пробел или дефис'})
        }   
      } 
    } else {
      if (name === "email") {
        if (!value) {
          setErrors({...errors, [name]: 'Введите email'});
        } else {
            setChange(true);
            const validEmail = (regexEmail.test(value))
            setErrors({...errors, [name]: validEmail ? '' : 'Некорректный email'})
          }
      } else {
        if (name === "password") {
          if (!value) {
            setErrors({...errors, [name]: 'Введите пароль'});
          } else {
            if (value.length < 2) {
              setErrors({...errors, [name]: 'Минимум 2 символа'});
            } else {
              setErrors({...errors, [name]: ''});
            }
          }
        } 
      } 
    }
    setIsValid(errors.name === '' ? true : false)
    setIsValid(target.closest("form").checkValidity());
  };

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false, newIsChange = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
      setChange(newIsChange)
    },
    [setValues, setErrors, setIsValid, setChange]
  );

  return { values, handleChange, errors, isValid, resetForm, isChange };
}