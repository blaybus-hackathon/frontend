import { Radio, RadioItem } from '@/components/ui/custom/multiRadio';
import useHelperAccountStore from '@/store/helper/useHelperAccoutStore';

const CareExperienceSelector = () => {
  const { helper, setPart } = useHelperAccountStore();

  return (
    <section className='helper-section'>
      <p className='helper-title'>
        간병경력이 있으신가요?
        <span className='text-[var(--placeholder-gray)] text-[17px] ml-2 font-normal'>선택</span>
      </p>

      <Radio
        onValueChange={(value) => setPart({ careExperience: value })}
        cols={2}
        className='flex items-center gap-8'
        value={helper.careExperience} // Zustand에서 직접 가져옴
      >
        <RadioItem className='hover:cursor-pointer' value={false}>
          신입
        </RadioItem>
        <RadioItem className='hover:cursor-pointer' value={true}>
          경력
        </RadioItem>
      </Radio>
    </section>
  );
};

export default CareExperienceSelector;
