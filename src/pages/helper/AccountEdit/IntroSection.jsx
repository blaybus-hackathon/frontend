import { useRef } from 'react';
import useProfileStore from '@/store/useProfileStore';
const IntroductionInput = () => {
  const INTRODUCTIONMAX = 75; // 소개 최대 글자 수
  const { profileEdit, updateProfileField } = useProfileStore();
  const textareaRef = useRef(null);

  const handleInput = (e) => {
    updateProfileField('introduction', e.target.value);

    const el = textareaRef.current;
    if (el) {
      el.style.height = 'auto';
      el.style.height = `${el.scrollHeight}px`;
    }
  };

  return (
    <section className='helper-section'>
      <p className='helper-title'>
        자기소개
        <span className='text-[var(--placeholder-gray)] text-[17px] ml-2 font-normal'>
          선택 (보호자에게 노출됩니다)
        </span>
      </p>
      <textarea
        ref={textareaRef}
        value={profileEdit.introduction}
        onInput={handleInput}
        placeholder='예) 한 사람, 한 사람의 필요에 맞춰 따뜻하고 세심한 돌봄을 제공하는 요양사입니다.'
        className='
        text-[#191919] font-pretendard text-[20px] font-normal leading-[150%]
        resize-none overflow-hidden min-h-[9rem] self-stretch
        p-[26px_17px]
        rounded-[10px] border border-[#C8C8C8] bg-white
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'
        maxLength={INTRODUCTIONMAX}
      />
    </section>
  );
};
export default IntroductionInput;
