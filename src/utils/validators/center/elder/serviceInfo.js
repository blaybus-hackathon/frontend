export const validateServiceInfo = (serviceInfo) => {
  if (!serviceInfo) return false;

  const { serviceMeal = 0, serviceToilet = 0, serviceMobility = 0, serviceDaily = 0 } = serviceInfo;

  return serviceMeal > 0 && serviceToilet > 0 && serviceMobility > 0 && serviceDaily > 0;
};
