export const fetchDefaultImage = async () => {
  const response = await fetch('/default_profile.png');
  const blob = await response.blob();
  return URL.createObjectURL(blob);
};
