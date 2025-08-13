import { useCallback, useMemo, useState } from 'react';
import { validateWithSchema } from '@/utils/validators';

export function useFormValidation({ values, schema, fieldRefs }) {
  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});

  // 모든 field 터치 처리
  const allTouched = useMemo(() => {
    const m = {};
    for (const k of Object.keys(schema || {})) m[k] = true;
    return m;
  }, [schema]);

  // error update helper
  const setFieldError = useCallback((name, message) => {
    setErrors((prev) => {
      if (!message) {
        // remove field if message is empty
        if (!prev[name]) return prev;
        const { [name]: _, ...rest } = prev;
        return rest;
      }
      // update field if message is different
      if (prev[name] === message) return prev;
      return { ...prev, [name]: message };
    });
  }, []);

  const validateField = useCallback(
    (name, value) => (schema?.[name] ? schema[name](value) : ''),
    [schema],
  );

  const onBlur = useCallback(
    (name) => {
      setTouched((prev) => (prev[name] ? prev : { ...prev, [name]: true }));
      const msg = validateField(name, values[name]);
      setFieldError(name, msg);
    },
    [validateField, values, setFieldError],
  );

  // 이미 터치된 필드에 대해서만 실시간 유효성 검사
  const onChangeValidate = useCallback(
    (name, value) => {
      if (!touched[name]) return;
      const msg = validateField(name, value);
      setFieldError(name, msg);
    },
    [touched, validateField, setFieldError],
  );

  const validateAll = useCallback(() => {
    const errs = validateWithSchema(values, schema);

    // error update (delete empty string)
    setErrors(() => {
      const next = {};
      for (const k in errs) if (errs[k]) next[k] = errs[k];
      return next;
    });

    // all touched
    setTouched((p) => ({ ...p, ...allTouched }));

    // focus first error
    const firstKey = Object.keys(schema || {}).find((k) => errs[k]);
    const target = firstKey && fieldRefs?.current?.[firstKey];
    // run after render
    if (target?.focus) setTimeout(() => target.focus(), 0);

    return Object.keys(errs).length === 0;
  }, [values, schema, fieldRefs, allTouched]);

  const isValid = useMemo(() => Object.keys(errors).length === 0, [errors]);

  // 외부에서 지우기 위한 함수
  const clearErrors = useCallback(() => setErrors({}), []);
  const resetTouched = useCallback(() => setTouched({}), []);

  return {
    errors,
    touched,
    isValid,
    onBlur,
    onChangeValidate,
    validateAll,
    setTouched,
    setErrors,
    setFieldError, // 개별 에러 설정
    clearErrors,
    resetTouched,
  };
}
