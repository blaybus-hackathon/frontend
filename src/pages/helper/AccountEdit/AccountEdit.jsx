import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/custom/Button";

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
  const { schedule, consult, optimizedSchedule } = useScheduleStore();
  const { pay } = usePayStore();

  // TODO : subscribe 변경 고민
  useEffect(() => {
    syncLocation();
  }, [selectedDistricts, schedule, pay, consult]);

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

  return (
    <main className="max-w-md mx-auto flex flex-col gap-6 ">
      <Header title="나의 계정" />

      {/* 프로필 섹션 */}
      <section className="flex flex-col items-stretch gap-12">
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
        <ScheduleSection optimize={optimizedSchedule} consult={consult} />

        {/* 급여 섹션 */}
        {/* 클릭이벤트 */}
        <PaySection pay={pay} />

        {/* 돌봄 유형 섹션*/}
        <CareTypeSection />

        {/* 자격증 등록 섹션*/}
        <CertificateSection />

        {/* 저장/취소 버튼 */}
        <div className="flex gap-2">
          <Button
            type="button"
            variant="default"
            onClick={handleSave}
            className="flex-1"
          >
            저장
          </Button>
          <Button
            type="button"
            variant="white"
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
