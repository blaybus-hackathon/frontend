import { TextAreaInput } from "@/components/ui/TextAreaInput";  
import useProfileStore from "@/store/useProfileStore";
const IntroductionInput = () => {
  const { profileEdit, updateProfileField } = useProfileStore();

  return (
    <section className="space-y-2">
      <p className="text-left font-bold">자기소개</p>
      <TextAreaInput
        value={profileEdit.introduction}
        onChange={(e) => updateProfileField("introduction", e.target.value)}
        placeholder="자기소개"
        className="min-h-[6.25rem] border-1 rounded-xl text-left p-4"
      />
    </section>
  );
};
  export default IntroductionInput;