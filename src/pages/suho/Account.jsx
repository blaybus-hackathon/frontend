import { useNavigate } from "react-router-dom";

import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import useAccountStore from "@/store/suho/useAccountStore";

import { CARE_TYPES } from "@/store/suho/useCareTypeStore"; // 레이블 변환용으로만 사용

import HelperButton from "@/components/ui/Button/HelperButton";
import Footer from "@/components/Footer";

export default function Account() {
  const navigate = useNavigate();
  const profile = useAccountStore((state) => state.profile);

  const getCareTypeLabel = (category) => {
    if (category === "workTypes") {
      return (
        profile.careTypes?.workTypes
          ?.map(
            (type) => CARE_TYPES.workTypes.find((t) => t.id === type)?.label
          )
          .join(", ") || "미설정"
      );
    }
    const selected = CARE_TYPES[category]?.find(
      (item) => item.id === profile.careTypes?.[category]
    );
    return selected?.label || "미설정";
  };

  const handleEdit = () => {
    navigate("/helper/account/edit", {
      state: { from: "/helper/account" },
    });
  };

  return (
    <>
      <main className="max-w-md mx-auto flex flex-col gap-4 p-4">
        <Header title="프로필" />

        {/* 기본 정보 */}
        <section className="space-y-4">
          {/* 프로필 이미지 */}
          <div className="flex items-center">
            <div className="flex flex-row justify-between items-center gap-12 w-24 h-24">
              <img
                src="/defaultProfile.png"
                alt="프로필 이미지"
                className="w-full h-full rounded-full object-cover"
              />
              <div className="flex flex-col items-center gap-2">
                <span>{profile.name || "미설정"}</span>

                <p>지역</p>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <p>
              <span className="text-gray-500">연락처: </span>
              {profile.phone || "미설정"}
            </p>
            <p>
              <span className="text-gray-500">자기소개: </span>
              {profile.introduction || "미설정"}
            </p>
          </div>
        </section>

        {/* 희망 급여 섹션 */}
        <section className="space-y-4">
          <h2 className="font-semibold">희망 급여</h2>
          <div>
            {profile.pay ? (
              <p>
                {profile.pay.type === "hourly"
                  ? "시급"
                  : profile.pay.type === "daily"
                  ? "일급"
                  : "주급"}
                {profile.pay.amount?.toLocaleString()}원
              </p>
            ) : (
              <p>설정된 급여가 없습니다.</p>
            )}
          </div>
        </section>

        {/* 돌봄 유형 섹션 */}
        <section className="space-y-4">
          <h2 className="font-semibold">돌봄 유형</h2>
          <div className="space-y-2 text-sm">
            <p>
              <span className="text-gray-500">근무 종류: </span>
              {getCareTypeLabel("workTypes")}
            </p>
            <p>
              <span className="text-gray-500">장기요양등급: </span>
              {getCareTypeLabel("careGrade")}
            </p>

            <p>
              <span className="text-gray-500">동거인 여부: </span>
              {getCareTypeLabel("livingArrangement")}
            </p>
            <p>{getCareTypeLabel("gender")}</p>
            <p>
              <span className="text-gray-500">식사보조: </span>
              {getCareTypeLabel("mealCare")}
            </p>
            <p>
              <span className="text-gray-500">이동보조: </span>
              {getCareTypeLabel("mobilitySupport")}
            </p>
            <p>
              <span className="text-gray-500">일상생활: </span>
              {getCareTypeLabel("dailyLife")}
            </p>
          </div>
        </section>

        {/* 선호 지역 섹션 */}
        <section className="space-y-4">
          <h2 className="font-semibold">선호 지역</h2>
          <div>
            {Object.entries(profile.locations || {})
              .filter(([_, districts]) => districts.length > 0)
              .map(([city, districts]) =>
                districts.map((district) => `${city}-${district}`)
              )
              .flat()
              .join(", ") || "선택된 지역이 없습니다."}
          </div>
        </section>

        {/* 근무 가능 시간 섹션 */}
        <section className="space-y-4">
          <h2 className="font-semibold">근무 가능 시간</h2>
          <div>
            {Object.entries(profile.schedules || {})
              .map(([day, time]) => `${day}요일 ${time.start}시-${time.end}시`)
              .join(", ") || "설정된 근무시간이 없습니다."}
          </div>
        </section>

        <Button onClick={handleEdit} className="mt-4">
          프로필 수정하기
        </Button>
      </main>
      <Footer />
    </>
  );
}
