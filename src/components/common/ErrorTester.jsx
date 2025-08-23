import { Button } from '@/components/ui/custom/Button';
import { useState } from 'react';

export default function ErrorTester() {
  const [shouldThrow, setShouldThrow] = useState(false);

  if (shouldThrow) {
    throw new Error('테스트용 JavaScript 에러입니다!');
  }

  const triggerJavaScriptError = () => {
    setShouldThrow(true);
  };

  const triggerServerError = async () => {
    try {
      // send request to non-existent endpoint to trigger 500 error
      const response = await fetch('/api/test-error-500', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ test: true }),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
    } catch (error) {
      console.error('Server error test:', error);
      // redirect to error page
      window.location.href = '/error';
    }
  };

  const triggerDirectError = () => {
    window.location.href = '/error';
  };

  return (
    <div className='p-4 border rounded-lg bg-yellow-50 border-yellow-200'>
      <h3 className='font-bold text-yellow-800 mb-2'>에러 테스트</h3>
      <p className='text-sm text-yellow-700 mb-4'>
        개발 환경에서만 사용하세요. 에러 처리가 올바르게 작동하는지 테스트할 수 있습니다.
      </p>

      <div className='grid grid-cols-2 gap-2'>
        <Button
          onClick={triggerJavaScriptError}
          variant='outline'
          size='sm'
          className='text-red-600 border-red-200 hover:bg-red-50 hover:text-red-600'
        >
          JavaScript 에러
        </Button>

        <Button
          onClick={triggerServerError}
          variant='outline'
          size='sm'
          className='text-orange-600 border-orange-200 hover:bg-orange-50 hover:text-orange-600'
        >
          서버 에러 (500)
        </Button>

        <Button
          onClick={triggerDirectError}
          variant='outline'
          size='sm'
          className='text-blue-600 border-blue-200 hover:bg-blue-50 hover:text-blue-600'
        >
          에러 페이지 이동
        </Button>

        <Button
          onClick={() => {
            throw new Error('수동 JS 에러!');
          }}
          variant='outline'
          size='sm'
          className='text-purple-600 border-purple-200 hover:bg-purple-50 hover:text-purple-600'
        >
          즉시 JS 에러
        </Button>
      </div>
    </div>
  );
}
