import React from "react";
import { Radio, RadioItem } from "@/components/ui/custom/multiRadio";
import { Input } from "@/components/ui/custom/input";
import useProfileStore from "@/store/useProfileStore";

const CertificationSection = () => {
  const { profileEdit, updateProfileField } = useProfileStore();
  const certificates = ["자격증1", "자격증2", "자격증3"];

  const handleRadioChange = (certificate, isChecked) => {
    updateProfileField("selectedOptions", {
      ...profileEdit.selectedOptions,
      [certificate]: isChecked,
    });
    // 체크가 해제되면 해당 자격증 정보 입력 필드도 초기화 (선택 사항)
    if (!isChecked && profileEdit.inputs[certificate]) {
      updateProfileField("inputs", {
        ...profileEdit.inputs,
        [certificate]: "",
      });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    updateProfileField("inputs", {
      ...profileEdit.inputs,
      [name]: value,
    });
  };

  return (
    <section className="space-y-2 flex flex-col gap-2">
      <span className="text-left font-bold">나의 소지 자격증</span>

      <Radio cols={1} multiple className="gap-4">
        {certificates.map((certificate) => {
          const isChecked = profileEdit.selectedOptions[certificate] || false;
          return (
            <div key={certificate} className="flex flex-col gap-2">
              <RadioItem
                value={certificate} // RadioItem에 value prop 전달
                checked={isChecked}
                onClick={() => handleRadioChange(certificate, !isChecked)}
              >
                {certificate}
              </RadioItem>
              {isChecked && (
                <Input
                  type="text"
                  name={certificate}
                  value={profileEdit.inputs[certificate] || ""}
                  onChange={handleInputChange} // event 객체 전달
                  placeholder={`${certificate} 자격증 정보를 입력하세요`}
                  className="border p-2 rounded-md"
                />
              )}
            </div>
          );
        })}
      </Radio>
    </section>
  );
};

export default CertificationSection;
