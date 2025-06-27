export const validateLicenseInfo = (licenseInfo) => {
  if (!licenseInfo || Object.keys(licenseInfo).length === 0) return false;

  return Object.entries(licenseInfo).every(([key, certData]) => {
    if (!certData.certNum || !certData.certDateIssue || !certData.certSerialNum) return false;
    if (key === 'helperOtherCerts' && !certData.certName) return false;
    return true;
  });
};
