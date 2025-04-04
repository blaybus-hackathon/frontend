import { Radio, RadioItem } from "@/components/ui/custom/multiRadio";
import useProfileStore from "@/store/useProfileStore";


const CareExperienceSelector = () => {
  const { profileEdit, updateProfileField } = useProfileStore();

  return (
    <section className="space-y-2 flex flex-col gap-2">
      <span className="text-left font-bold">간병경력이 있으신가요?</span>
      <div className="flex flex-col gap-2 justify-between">
        <Radio
          onValueChange={(value) => updateProfileField("careExperience", value)}
          cols={2}
          className="gap-12"
          value={profileEdit.careExperience} // Zustand에서 직접 가져옴
        >
          <RadioItem value="신입">신입</RadioItem>
          <RadioItem value="경력">경력</RadioItem>
        </Radio>
      </div>
    </section>
  );
};
  
  export default CareExperienceSelector;