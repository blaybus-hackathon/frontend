import { Radio, RadioItem } from "@/components/ui/custom/multiRadio";
import useProfileStore from "@/store/useProfileStore";


const CareExperienceSelector = () => {
  const { profileEdit, updateProfileField } = useProfileStore();

  return (
    <section className="helper-section">
      <span className="helper-title">간병경력이 있으신가요?</span>

        <Radio
          onValueChange={(value) => updateProfileField("careExperience", value)}
          cols={2}
          className="flex items-center gap-8"
          value={profileEdit.careExperience} // Zustand에서 직접 가져옴
        >
          <RadioItem value="신입">신입</RadioItem>
          <RadioItem value="경력">경력</RadioItem>
        </Radio>

    </section>
  );
};
  
  export default CareExperienceSelector;