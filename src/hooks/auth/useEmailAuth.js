import { useMutation } from '@tanstack/react-query';
import { requestEmailAuth, verifyEmailAuth } from '@/services/signUpService';
import { handleApiError } from '@/utils/handleApiError';

/**
 * custom hook for email auth
 * - both send email and verify email
 */

export const useEmailAuthMutation = () => {
  // skip onSuccess/onError to use mutateAsync
  const sendEmailMutation = useMutation({ mutationFn: requestEmailAuth });
  const verifyEmailMutation = useMutation({ mutationFn: verifyEmailAuth });

  const sendEmail = async (email) => {
    try {
      const res = await sendEmailMutation.mutateAsync(email);
      const mailSeq = res?.data?.mailSeq ?? res?.mailSeq;

      if (!mailSeq) throw new Error('인증번호 전송 실패');

      alert('인증번호가 전송되었습니다.');
      return mailSeq;
    } catch (error) {
      console.error('Email auth error:', error);
      handleApiError(error, {
        4000: '이미 가입된 이메일입니다.',
        4009: '10분 이내에 재발송 불가능합니다.',
      });
      throw error;
    }
  };

  const verifyEmail = async ({ mailSeq, email, code }) => {
    try {
      const res = await verifyEmailMutation.mutateAsync({ mailSeq, email, code });
      if (res.checker) {
        alert('이메일 인증이 완료되었습니다.');
        return true;
      } else {
        const error = new Error('인증번호가 일치하지 않습니다.');
        error.response = { data: { code: 4001 } };
        throw error;
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  return {
    sendEmail,
    verifyEmail,
    sendEmailStatus: sendEmailMutation,
    verifyEmailStatus: verifyEmailMutation,
  };
};
