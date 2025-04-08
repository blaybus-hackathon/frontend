import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/custom/input";
import { TextAreaInput } from "@/components/ui/TextAreaInput";
import { Radio, RadioItem } from "@/components/ui/custom/multiRadio";
import Header from "@/components/ui/temp/Header";
import { SectionTitle } from "@/components/ui/custom/SectionTitle";

import CareTypeSection from "@/pages/helper/AccountEdit/CareTypeSection ";
import CareExperienceSelector from "@/pages/helper/AccountEdit/CareerSection";
import IntroductionInput from "@/pages/helper/AccountEdit/IntroSection";
import LocationSection from "@/pages/helper/AccountEdit/LocationSection";

import useProfileStore from "@/store/useProfileStore";
import useHelperLocationStore from "@/store/suho/useHelperLocationStore";
// ✅ 5. 이미지 및 정적 파일
import location_icon from "@/assets/images/location.png";
import overview from "@/assets/images/overview.png";
import backarrow from "@/assets/images/back-arrow.png";

export default function AccountEdit() {
  const navigate = useNavigate();
  const location = useLocation();

  const { profileEdit, updateProfileField, syncLocation } = useProfileStore();
  const { selectedDistricts } = useHelperLocationStore(); // 상태만 가져옴

  // TODO : subscribe 변경 고민
  useEffect(() => {
    syncLocation();
  }, [selectedDistricts]);

  const formattedLocations = Object.entries(selectedDistricts)
    .flatMap(([city, districts]) =>
      Object.entries(districts).map(
        ([district, subDistricts]) =>
          `${city}<img src="${backarrow}" alt="backarrow" class="w-4 h-4 rotate-180 inline-block mx-1" />${district} (${subDistricts.join(
            ", "
          )})`
      )
    )
    .join(", ");

  // const [editedProfile, setEditedProfile] = useState(profile);

  // const handleBasicInfoChange = (field, value) => {
  //   setEditedProfile((prev) => ({
  //     ...prev,
  //     [field]: value,
  //   }));
  // };

  // const getCareTypeLabel = (category) => {
  //   if (category === "workTypes") {
  //     return (
  //       selectedTypes.workTypes
  //         ?.map(
  //           (type) => CARE_TYPES.workTypes.find((t) => t.id === type)?.label
  //         )
  //         .join(", ") || "미설정"
  //     );
  //   }
  //   const selected = CARE_TYPES[category]?.find(
  //     (item) => item.id === selectedTypes[category]
  //   );
  //   return selected?.label || "미설정";
  // };

  // const [careTypeData, setCareTypeData] = useState({ workTypes: [] });
  // const handleSaveCareType = (newCareType) => {
  //   console.log("저장된 데이터:", newCareType);
  //   setCareTypeData(newCareType); // 상태 업데이트
  // };

  const handleSave = async () => {
    try {
      // 모든 Store의 현재 상태로 새 프로필 생성
      const newProfile = {
        ...editedProfile,
        pay: {
          amount: selectedPay,
          type: payType,
        },
        careTypes: selectedTypes,
        locations: selectedDistricts,
        schedules: schedules,
      };

      // 한 번에 저장
      updateProfile(newProfile);
      await saveProfile();
      navigate("/helper/account");
    } catch (error) {
      console.error("프로필 저장 실패:", error);
    }
  };

  const handleCancel = () => {
    navigate("/helper/account");
  };
  const handleTest = () => {
    console.log("profileEdit 상태:", profileEdit);
  };
  const careExperience = useProfileStore(
    (state) => state.profileEdit.careExperience
  );

  return (
    <main className="max-w-md mx-auto flex flex-col justify-center gap-6 p-4">
      <Header title="나의 계정" />

      {/* 기본 정보 섹션 */}
      <section className="flex flex-col gap-6">
        {/* 프로필 이미지 */}
        {/* <section className="flex flex-row justify-between items-center gap-12  h-auto pr-6 pl-6 relative">
          <div className="relative">
            <img
              src={editedProfile?.profileImage || "/defaultProfile.png"}
              alt="profile_image"
              className="w-24 h-24 rounded-full "
            />
            <input
              type="file"
              accept="image/*"
              className="hidden"
              id="profile-image"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  // 이미지 미리보기 URL 생성
                  const imageUrl = URL.createObjectURL(file);
                  handleBasicInfoChange("profileImage", imageUrl);
                }
              }}
            />
            <label
              htmlFor="profile-image"
              className="absolute bottom-0 right-0 bg-primary text-white p-1 rounded-full cursor-pointer hover:bg-primary/90"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
              </svg>
            </label>
          </div>
          <div className="flex flex-col justify-center gap-2 text-left">
            <span>{profile.name || "홍길동"}</span>
            <p>서울특별시 용산구 거주</p>
          </div>
        </section> */}

        {/* 자기소개 섹션 */}
        <IntroductionInput />

        {/* 간병 경력 섹션 */}
        <CareExperienceSelector />

        {/* 나의 선호 지역 섹션 */}

        <LocationSection selectedDistricts={selectedDistricts} />

        {/* 나의 근무 가능 일정 섹션 */}
        {/* 클릭이벤트 */}
        {/* <section
          className="space-y-2 flex flex-col gap-2 hover:cursor-pointer"
          onClick={() => navigate("/helper/account/schedule")}
        >
          <span className="text-left font-bold">나의 근무 가능 일정</span>
          <span className="text-left">
            나의 근무 가능한 날짜와 시간대를 설정해 보세요.
          </span>
          <p className="text-left flex flex-row items-center gap-3 p-3 border-2 rounded-xl">
            <img
              className="w-[24px] h-[24px] "
              src={location_icon}
              alt="location_icon"
            />
            월, 화, 수
            <img
              src={backarrow}
              alt="backarrow"
              className="w-4 h-4 rotate-180"
            />
            13:00 ~ 20:00
          </p>
        </section> */}

        {/* 급여 섹션 */}
        {/* 클릭이벤트 */}
        {/* <section
          className="space-y-2 flex flex-col gap-2 hover:cursor-pointer"
          onClick={() => navigate("/helper/account/pay")}
        >
          <span className="text-left font-bold">나의 희망급여</span>
          <span className="text-left">나의 희망급여를 설정해 보세요!</span>
          <p className="text-left flex flex-row items-center gap-4 border-2 rounded-xl p-3">
            <img
              className="w-[24px] h-[24px]"
              src={overview}
              alt="overview_icon"
            />
            <span>
              {profile.pay.type === "hourly"
                ? "시급"
                : profile.pay.type === "daily"
                ? "일급"
                : "주급"}
            </span>
            <img
              src={backarrow}
              alt="backarrow"
              className="w-4 h-4 rotate-180"
            />
            <span className="">{profile.pay.amount?.toLocaleString()}원</span>
          </p>
        </section> */}

        {/* 돌봄 유형 섹션*/}
        <CareTypeSection />

        {/* 자격증 등록 섹션*/}
        {/* <section className="space-y-2 flex flex-col  gap-2">
          <span className="text-left font-bold">나의 소지 자격증</span>

          <Radio
            onValueChange={(value) => {
              //  제거: 더이상 여기서 state 업데이트 안함
            }}
            cols={1}
            multiple
            className="gap-4"
          >
            {["자격증1", "자격증2", "자격증3"].map((certificate) => {
              const isChecked =
                profileState.selectedOptions[certificate] || false;
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
                      value={profileState.inputs[certificate] || ""}
                      onChange={(e) => handleInputChange(e)} // event 객체 전달
                      placeholder={`${certificate} 자격증 정보를 입력하세요`}
                      className="border p-2 rounded-md"
                    />
                  )}
                </div>
              );
            })}
          </Radio>
        </section> */}

        {/* 저장/취소 버튼 */}
        <div className="flex gap-2">
          <Button type="button" onClick={handleSave} className="flex-1">
            저장
          </Button>
          <Button
            type="button"
            variant="outline"
            className="flex-1"
            onClick={handleCancel}
          >
            취소
          </Button>
        </div>
        <Button type="button" onClick={handleTest} />
      </section>
    </main>
  );
}
