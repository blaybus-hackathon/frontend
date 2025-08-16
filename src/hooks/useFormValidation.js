import { useCallback, useMemo, useState } from 'react';
import { validateWithSchema } from '@/utils/validators';

export function useFormValidation({ values, schema, fieldRefs }) {
  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});

  // 모든 필드를 touched 상태로 변환
  // set touched state for all fields
  const allTouched = useMemo(() => {
    const m = {};
    for (const k of Object.keys(schema || {})) m[k] = true;
    return m;
  }, [schema]);

  // 내부 유틸: 스키마 단일 필드 검증 (value, formData)
  // internal utility: validate single field (value, formData)
  const runRule = useCallback(
    (name, value, formData) => (schema?.[name] ? schema[name](value, formData) : ''),
    [schema],
  );

  // 공개 유틸: 동기 필드 에러 확인
  // public utility: check field error synchronously
  const getFieldError = useCallback(
    (name, value, formData = values) => runRule(name, value, formData),
    [runRule, values],
  );

  // 에러 상태 업데이트 헬퍼
  // helper to update error state
  const setFieldError = useCallback((name, message) => {
    setErrors((prev) => {
      if (!message) {
        if (!prev[name]) return prev;
        const { [name]: _, ...rest } = prev;
        return rest;
      }
      if (prev[name] === message) return prev;
      return { ...prev, [name]: message };
    });
  }, []);

  // onBlur: touched 설정 + 해당 필드 검증
  // onBlur: set touched + validate field
  const onBlur = useCallback(
    (name) => {
      setTouched((prev) => (prev[name] ? prev : { ...prev, [name]: true }));
      const msg = runRule(name, values[name], values);
      setFieldError(name, msg);
    },
    [runRule, values, setFieldError],
  );

  // 이미 touched 된 필드에 한해서만 실시간 검증
  // validate field only if it is touched
  const onChangeValidate = useCallback(
    (name, value) => {
      if (!touched[name]) return;
      const msg = runRule(name, value, values);
      setFieldError(name, msg);
    },
    [touched, runRule, values, setFieldError],
  );

  // 전체 검증 (옵션: 포커스/터치 제어)
  // validate all fields (optional: focus/touch control)
  const validateAll = useCallback(
    (opts = { focus: true, touch: true }) => {
      const { focus = true, touch = true } = opts;

      const rawErrs = validateWithSchema(values, schema); // 각 스키마는 (value, formData) 사용
      // 빈 문자열은 무시하고, 실제 메시지만 남김
      // ignore empty string
      const filtered = {};
      for (const k in rawErrs) if (rawErrs[k]) filtered[k] = rawErrs[k];

      setErrors(filtered);
      if (touch) setTouched((p) => ({ ...p, ...allTouched }));

      if (focus) {
        const firstKey = Object.keys(schema || {}).find((k) => rawErrs[k]);
        const target = firstKey && fieldRefs?.current?.[firstKey];
        if (target?.focus) setTimeout(() => target.focus(), 0);
      }

      return Object.keys(filtered).length === 0;
    },
    [values, schema, fieldRefs, allTouched],
  );

  const isValid = useMemo(() => Object.keys(errors).length === 0, [errors]);

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
    setFieldError,
    getFieldError,
    clearErrors,
    resetTouched,
  };
}
