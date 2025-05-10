import { request, requestMultipart } from '@/api';

export const getManagerProfile = async () => {
  const response = await request('GET', '/center-manager/find');
  return response;
};

export const updateManagerProfile = async ({ cmSeq, cmPosition, photoFile, imgChangeYn }) => {
  const formData = new FormData();
  formData.append('cmSeq', cmSeq);
  formData.append('cmPosition', cmPosition);
  formData.append('photoFile', photoFile);
  formData.append('imgChangeYn', imgChangeYn);
  return await requestMultipart('POST', '/center-manager/update', formData);
};
