import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useHeaderPropsStore } from '@/store/useHeaderPropsStore';
import { Tabs, TabsList, TabsContent, TabsTrigger } from '@/components/ui/custom/tabs';
import { cn } from '@/lib/utils';
import EmailCheckForm from '@/components/Auth/FindAccount/EmailCheckForm';
import EmailCheckResult from '@/components/Auth/FindAccount/EmailCheckResult';
import SendTempPwdForm from '@/components/Auth/FindAccount/SendTempPwdForm';
import SendTempPwdResult from '@/components/Auth/FindAccount/SendTempPwdResult';

export default function FindAccount() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('email');
  const [emailCheckResult, setEmailCheckResult] = useState(null);
  const [sendTempPwdResult, setSendTempPwdResult] = useState(null);

  const { setHeaderProps, clearHeaderProps } = useHeaderPropsStore((state) => state);

  useEffect(() => {
    setHeaderProps({
      title: '이메일/비밀번호 찾기',
      type: 'back',
      onBack: () => navigate('/signin'),
    });

    return () => {
      clearHeaderProps();
    };
  }, [navigate, clearHeaderProps, setHeaderProps]);

  return (
    <article className='py-8 lg:py-12'>
      <Tabs value={activeTab} onValueChange={setActiveTab} className='w-full'>
        <TabsList className='w-full grid grid-cols-2 gap-4'>
          <TabsTrigger
            value='email'
            className={cn(
              'rounded-[0.3rem] font-medium text-lg transition-all border-none',
              'data-[state=active]:bg-[var(--main)] data-[state=active]:text-white',
              'data-[state=inactive]:bg-[var(--button-inactive)] data-[state=inactive]:text-[var(--placeholder-gray)]',
            )}
          >
            이메일
          </TabsTrigger>
          <TabsTrigger
            value='password'
            className={cn(
              'rounded-[0.3rem] font-medium text-lg transition-all border-none',
              'data-[state=active]:bg-[var(--main)] data-[state=active]:text-white',
              'data-[state=inactive]:bg-[var(--button-inactive)] data-[state=inactive]:text-[var(--placeholder-gray)]',
            )}
          >
            비밀번호
          </TabsTrigger>
        </TabsList>

        <TabsContent value='email'>
          {emailCheckResult ? (
            <EmailCheckResult result={emailCheckResult} onReset={() => setEmailCheckResult(null)} />
          ) : (
            <EmailCheckForm onResult={setEmailCheckResult} />
          )}
        </TabsContent>
        <TabsContent value='password'>
          {sendTempPwdResult ? (
            <SendTempPwdResult
              result={sendTempPwdResult}
              onReset={() => setSendTempPwdResult(null)}
            />
          ) : (
            <SendTempPwdForm onResult={setSendTempPwdResult} />
          )}
        </TabsContent>
      </Tabs>
    </article>
  );
}
