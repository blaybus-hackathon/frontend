import { useEffect } from "react";
import { Radio, RadioItem } from "@/components/ui/custom/multiRadio";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Header from "@/components/ui/temp/Header";
import useProfileStore from "@/store/useProfileStore";

const CARE_TYPES = {
  workTypes: [
    { id: "work_homecare", label: "방문요양" },
    { id: "work_livein", label: "입주요양" },
    { id: "work_bath", label: "방문목욕" },
    { id: "work_daycare", label: "주야간보호" },
    { id: "work_nursinghome", label: "요양원" },
    { id: "work_hospitalescort", label: "병원동행" },
  ],
  careGrade: [
    { id: "none", label: "등급 없음" },
    { id: "1", label: "1등급" },
    { id: "2", label: "2등급" },
    { id: "3", label: "3등급" },
    { id: "4", label: "4등급" },
    { id: "5", label: "5등급" },
    { id: "6", label: "인지지원등급" },
  ],
  gender: [
    { id: "male", label: "남성" },
    { id: "female", label: "여성" },
  ],
  livingArrangement: [
    { id: "alone", label: "독거" },
    { id: "Spouse_in", label: "배우자와 동거, 돌봄 시간 중 집에 있음" },
    { id: "Spouse_out", label: "배우자와 동거, 돌봄 시간 중 자리 비움" },
    { id: "family_in", label: "다른 가족과 동거, 돌봄 시간 중 집에 있음" },
    { id: "family_out", label: "다른 가족과 동거, 돌봄 시간 중 집에 비움" },
  ],
  mealCare: [
    { id: "4", label: "스스로 가능" },
    { id: "3", label: "식사 차려드리기" },
    { id: "2", label: "요리 필요" },
    { id: "1", label: "경관식 보조" },
  ],
  mobilitySupport: [
    { id: "1", label: "스스로 가능" },
    { id: "2", label: "부축 도움" },
    { id: "3", label: "휠체어 이동" },
    { id: "4", label: "거동 불가" },
  ],
  dailyLife: [
    { id: "daily_cleaning", label: "청소, 빨래 보조" },
    { id: "daily_bath", label: "목욕 보조" },
    { id: "daily_hospital", label: "병원 동행" },
    { id: "daily_walk", label: "산책, 간단한 운동" },
    { id: "daily_talk", label: "말벗, 정서지원" },
    { id: "daily_cognitive", label: "인지자극 활동" },
  ],
};

export default function AccountCareType() {
  const navigate = useNavigate();
  const {
    profile,
    profileEdit,
    updateCareTypeWorkTypes,
    initializeProfileEdit,
    updateCareTypeField,
  } = useProfileStore();

  useEffect(() => {
    if (!profileEdit) {
      initializeProfileEdit(profile);
    }
  }, [profile, profileEdit, initializeProfileEdit]);

  const handleSave = () => {
    if (profileEdit.careTypes.workTypes.length === 0) {
      alert("근무 종류를 최소 1개 이상 선택해주세요.");
      return;
    }
    console.log(profileEdit.careTypes);
    navigate("/helper/account/edit"); // Zustand에 저장했으므로 navigate만
  };

  const toggleWorkType = (id, label, fieldName) => {
    const currentItems = profileEdit?.careTypes?.[fieldName] || [];
    const itemObject = { key: id, label: label };

    const isAlreadySelected = currentItems.some((item) => item.key === id);

    let updatedItems;
    if (isAlreadySelected) {
      updatedItems = currentItems.filter((item) => item.key !== id);
    } else {
      updatedItems = [...currentItems, itemObject];
    }
    updateCareTypeField(fieldName, updatedItems); // updateCareTypeField 사용
  };

  const setSelection = (key, value) => {
    updateCareTypeField(key, value);
  };

  return (
    <main className="max-w-md mx-auto flex flex-col gap-6">
      <Header title="돌봄 유형 설정" />
      <section className="flex flex-col gap-8 p-4">
      <div className="flex flex-col items-start gap-2.5 self-stretch">
          <span className="helper-title">
          희망하는 근무 종류를 선택해 주세요! 
          </span>
          <span className="profile-section__content-text">(최대 선택 5개)        
             <span className="helper-title_sub">필수</span>
             </span>
        </div>
        <div>

        </div>


        </section>

      {/* 근무 종류 (다중 선택) */}
      <section className="space-y-2">
        <div className="grid grid-cols-1 gap-2">
          
          {CARE_TYPES.workTypes.map(
            (
              { id, label } // id와 label 대신 key와 value 사용
            ) => (
              <Button
                key={id}
                type="button"
                variant={
                  profileEdit?.careTypes?.workTypes?.some(
                    (item) => item.key === id
                  )
                    ? "default"
                    : "outline"
                }
                onClick={() => toggleWorkType(id, label, "workTypes")}
              >
                {label} {/* label을 사용하여 레이블을 표시 */}
              </Button>
            )
          )}
        </div>
      </section>

      {/* 장기요양등급 */}
      <section className="space-y-2">
        <h2 className="font-semibold">장기요양등급</h2>
        <div className="grid grid-cols-3 gap-2">
          {CARE_TYPES.careGrade.map(({ id, label }) => (
            <Button
              key={id}
              type="button"
              variant={
                profileEdit?.careTypes?.careGrade === id ? "default" : "outline"
              }
              onClick={() => setSelection("careGrade", id)}
            >
              {label}
            </Button>
          ))}
        </div>
      </section>

      {/* 성별 */}
      <section className="space-y-2">
        <h2 className="font-semibold">성별</h2>
        <div className="grid grid-cols-2 gap-2">
          {CARE_TYPES.gender.map(({ id, label }) => (
            <Button
              key={id}
              type="button"
              variant={
                profileEdit?.careTypes?.gender === id ? "default" : "outline"
              }
              onClick={() => setSelection("gender", id)}
            >
              {label}
            </Button>
          ))}
        </div>
      </section>

      {/* 동거인 여부 */}
      <section className="space-y-2">
        <h2 className="font-semibold">동거인 여부</h2>
        <div className="grid grid-cols-2 gap-2">
          {CARE_TYPES.livingArrangement.map(({ id, label }) => (
            <Button
              key={id}
              type="button"
              variant={
                profileEdit?.careTypes?.Living === id ? "default" : "outline"
              }
              onClick={() => setSelection("Living", id)}
            >
              {label}
            </Button>
          ))}
        </div>
      </section>

      {/* 식사보조 */}
      <section className="space-y-2">
        <h2 className="font-semibold">식사보조</h2>
        <div className="grid grid-cols-2 gap-2">
          {CARE_TYPES.mealCare.map(({ id, label }) => (
            <Button
              key={id}
              type="button"
              variant={
                profileEdit?.careTypes?.mealCare === id ? "default" : "outline"
              }
              onClick={() => setSelection("mealCare", id)}
            >
              {label}
            </Button>
          ))}
        </div>
      </section>

      {/* 이동보조 */}
      <section className="space-y-2">
        <h2 className="font-semibold">이동보조</h2>
        <div className="grid grid-cols-2 gap-2">
          {CARE_TYPES.mobilitySupport.map(({ id, label }) => (
            <Button
              key={id}
              type="button"
              variant={
                profileEdit?.careTypes?.moveCare === id ? "default" : "outline"
              }
              onClick={() => setSelection("moveCare", id)}
            >
              {label}
            </Button>
          ))}
        </div>
      </section>

      {/* 일상생활 */}
      <section className="space-y-2">
        <h2 className="font-semibold">일상생활</h2>
        <div className="grid grid-cols-2 gap-2">
          {CARE_TYPES.dailyLife.map(({ id, label }) => (
            <Button
              key={id}
              type="button"
              variant={
                profileEdit?.careTypes?.dailyLife?.some(
                  (item) => item.key === id
                )
                  ? "default"
                  : "outline"
              }
              onClick={() => toggleWorkType(id, label, "dailyLife")}
            >
              {label}
            </Button>
          ))}
        </div>
      </section>

      {/* 저장 버튼 */}
      <Button onClick={handleSave} className="w-full mt-4">
        저장하기
      </Button>
    </main>
  );
}
