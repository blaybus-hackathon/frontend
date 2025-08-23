export function formatPhoneNumber(value) {
  const digits = value.replace(/\D/g, ''); // 숫자 이외 제거

  if (digits.length < 4) return digits;
  if (digits.length < 8) return `${digits.slice(0, 3)}-${digits.slice(3)}`;
  return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7, 11)}`;
}
