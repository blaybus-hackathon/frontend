import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

import Header from "@/components/ui/temp/Header";

import CareTypeSection from "@/pages/helper/AccountEdit/CareTypeSection ";
import CareExperienceSelector from "@/pages/helper/AccountEdit/CareerSection";
import IntroductionInput from "@/pages/helper/AccountEdit/IntroSection";
import LocationSection from "@/pages/helper/AccountEdit/LocationSection";
import BaseSection from "@/pages/helper/AccountEdit/BaseSection";
import CertificateSection from "@/pages/helper/AccountEdit/CertificateSection";
import PaySection from "@/pages/helper/AccountEdit/PaySection";

import useProfileStore from "@/store/useProfileStore";
import useHelperLocationStore from "@/store/suho/useHelperLocationStore";
import useScheduleStore from "@/store/suho/useScheduleStore";
import usePayStore from "@/store/suho/usePayStore"; // 스케줄 스토어 임포트

// ✅ 5. 이미지 및 정적 파일
import backarrow from "@/assets/images/back-arrow.png";
import location_icon from "@/assets/images/location.png";
import ScheduleSection from "./ScheduleSection";

export default function AccountEdit() {
  const navigate = useNavigate();

  const { profileEdit, updateProfileField, syncLocation } = useProfileStore();
  const { selectedDistricts } = useHelperLocationStore(); // 상태만 가져옴
  const { schedule,consult,optimizedSchedule } = useScheduleStore();
  const { pay } = usePayStore();


 
  // TODO : subscribe 변경 고민
  useEffect(() => {
    syncLocation();
  }, [selectedDistricts, schedule,pay,consult]);

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

      console.log("저장할 프로필 정보:", newProfile); // 저장될 정보 확인

      // 한 번에 저장
      updateProfile(newProfile);
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

      {/* 프로필 섹션 */}
      <section className="flex flex-col gap-6">
        {/* 기본 정보 섹션 */}
        <BaseSection />

        {/* 자기소개 섹션 */}
        <IntroductionInput />

        {/* 간병 경력 섹션 */}
        <CareExperienceSelector />

        {/* 나의 선호 지역 섹션 */}

        <LocationSection selectedDistricts={selectedDistricts} />

        {/* 나의 근무 가능 일정 섹션 */}
        {/* 클릭이벤트 */}
        <ScheduleSection optimize={optimizedSchedule} consult={consult}/>

        {/* 급여 섹션 */}
        {/* 클릭이벤트 */}
        <PaySection pay = {pay}/>
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
              {profileEdit.payType === "hourly"
                ? "시급"
                : profileEdit.payType === "daily"
                ? "일급"
                : profileEdit.payType === "weekly"
                ? "주급"
                : "월급"}
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
        <CertificateSection />

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
