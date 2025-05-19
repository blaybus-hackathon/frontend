import { useEffect } from "react";
import { Radio, RadioItem } from "@/components/ui/custom/multiRadio";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/custom/Button";
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

      {/* 근무 종류 (다중 선택) */}
      <section className="flex flex-col gap-8 p-4">
        <section>
          <div className="flex flex-col items-start gap-2.5 self-stretch">
            <span className="helper-title">
              희망하는 근무 종류를 선택해 주세요!
            </span>
            <span className="profile-section__content-text">
              (최대 선택 5개)
            </span>
          </div>

          <div className="grid grid-cols-1 gap-2 mt-4">
            {CARE_TYPES.workTypes.map(({ id, label }) => {
              const isSelected = profileEdit?.careTypes?.workTypes?.some(
                (item) => item.key === id
              );

              return (
                <Button
                  key={id}
                  type="button"
                  variant="white"
                  size="default"
                  onClick={() => toggleWorkType(id, label, "workTypes")}
                  className="border-gray-400 gap-2 justify-start !px-6 w-full cursor-pointer mb-0 text-black"
                >
                  <svg
                    width="29"
                    height="29"
                    viewBox="0 0 29 29"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-full w-auto"
                  >
                    <rect
                      width="29"
                      height="29"
                      rx="14.5"
                      fill={isSelected ? "#9b4dff" : "#B6B6B6"} // 선택 시 색상 변경
                    />
                    <path
                      d="M8.39775 15.7273C8.17808 15.5076 7.82192 15.5076 7.60225 15.7273C7.38258 15.9469 7.38258 16.303 7.60225 16.5227L10.9773 19.8977C11.1969 20.1174 11.5531 20.1174 11.7727 19.8977L20.0227 11.6477C20.2424 11.4281 20.2424 11.0719 20.0227 10.8523C19.803 10.6326 19.4469 10.6326 19.2273 10.8523L11.375 18.7045L8.39775 15.7273Z"
                      fill="white"
                    />
                  </svg>
                  {label} {/* label을 사용하여 레이블을 표시 */}
                </Button>
              );
            })}
          </div>
        </section>

        <div className="flex flex-col items-start gap-2.5 self-stretch">
          <span className="helper-title">
            희망하는 돌봄유형을 선택해 주세요!
          </span>
          <span className="profile-section__content-text">중복선택가능</span>
        </div>

        <section className="">
          <div className="flex flex-col items-start gap-2.5 self-stretch">
            <span className="helper-title">
              장기요양등급
              <span className="helper-title_sub ">선택</span>
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 mt-4">
            {CARE_TYPES.careGrade.map(({ id, label }) => {
              const isSelected = profileEdit?.careTypes?.careGrade === id;

              return (
                <Button
                  key={id}
                  type="button"
                  variant="white"
                  size="default"
                  onClick={() => setSelection("careGrade", id)}
                  className="border-gray-400 gap-2 justify-start !px-6 w-full cursor-pointer mb-0 text-black"
                >
                  <svg
                    width="29"
                    height="29"
                    viewBox="0 0 29 29"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-full w-auto"
                  >
                    <rect
                      width="29"
                      height="29"
                      rx="14.5"
                      fill={isSelected ? "#9b4dff" : "#B6B6B6"} // 선택 시 색상 변경
                    />
                    <path
                      d="M8.39775 15.7273C8.17808 15.5076 7.82192 15.5076 7.60225 15.7273C7.38258 15.9469 7.38258 16.303 7.60225 16.5227L10.9773 19.8977C11.1969 20.1174 11.5531 20.1174 11.7727 19.8977L20.0227 11.6477C20.2424 11.4281 20.2424 11.0719 20.0227 10.8523C19.803 10.6326 19.4469 10.6326 19.2273 10.8523L11.375 18.7045L8.39775 15.7273Z"
                      fill="white"
                    />
                  </svg>
                  {label}
                </Button>
              );
            })}
          </div>
        </section>

        {/* 성별 */}
        <section className="">
          <div className="flex flex-col items-start gap-2.5 self-stretch">
            <span className="helper-title">
              성별
              <span className="helper-title_sub ">선택</span>
            </span>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-4">
            {CARE_TYPES.gender.map(({ id, label }) => {
              const isSelected = profileEdit?.careTypes?.gender === id;

              return (
                <Button
                  key={id}
                  type="button"
                  variant="white"
                  size="default"
                  onClick={() => setSelection("gender", id)}
                  className="border-gray-400 gap-2 justify-start !px-6 w-full cursor-pointer mb-0 text-black"
                >
                  <svg
                    width="29"
                    height="29"
                    viewBox="0 0 29 29"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-full w-auto"
                  >
                    {/* 선택된 상태일 때 색상 변경 */}
                    <rect
                      width="29"
                      height="29"
                      rx="14.5"
                      fill={isSelected ? "#9b4dff" : "#B6B6B6"}
                    />
                    <path
                      d="M8.39775 15.7273C8.17808 15.5076 7.82192 15.5076 7.60225 15.7273C7.38258 15.9469 7.38258 16.303 7.60225 16.5227L10.9773 19.8977C11.1969 20.1174 11.5531 20.1174 11.7727 19.8977L20.0227 11.6477C20.2424 11.4281 20.2424 11.0719 20.0227 10.8523C19.803 10.6326 19.4469 10.6326 19.2273 10.8523L11.375 18.7045L8.39775 15.7273Z"
                      fill="white"
                    />
                  </svg>
                  {label}
                </Button>
              );
            })}
          </div>
        </section>

        {/* 동거인 여부 */}
        <section className="">
          <div className="flex flex-col items-start gap-2.5 self-stretch mt-4">
            <span className="helper-title">
              동거인 여부
              <span className="helper-title_sub ">선택</span>
            </span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {CARE_TYPES.livingArrangement.map(({ id, label }) => {
              const isSelected = profileEdit?.careTypes?.Living === id;

              return (
                <Button
                  key={id}
                  type="button"
                  variant="white"
                  size="default"
                  onClick={() => setSelection("Living", id)}
                  className="border-gray-400 gap-2 justify-start !px-6 w-full cursor-pointer mb-0 text-black"
                >
                  <svg
                    width="29"
                    height="29"
                    viewBox="0 0 29 29"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-full w-auto"
                  >
                    <rect
                      width="29"
                      height="29"
                      rx="14.5"
                      fill={isSelected ? "#9b4dff" : "#B6B6B6"} // 선택 시 색상 변경
                    />
                    <path
                      d="M8.39775 15.7273C8.17808 15.5076 7.82192 15.5076 7.60225 15.7273C7.38258 15.9469 7.38258 16.303 7.60225 16.5227L10.9773 19.8977C11.1969 20.1174 11.5531 20.1174 11.7727 19.8977L20.0227 11.6477C20.2424 11.4281 20.2424 11.0719 20.0227 10.8523C19.803 10.6326 19.4469 10.6326 19.2273 10.8523L11.375 18.7045L8.39775 15.7273Z"
                      fill="white"
                    />
                  </svg>
                  {label}
                </Button>
              );
            })}
          </div>
        </section>

        {/* 식사보조 */}
        <section className="">
          <div className="flex flex-col items-start gap-2.5 self-stretch ">
            <span className="helper-title">
              식사 보조
              <span className="helper-title_sub ">선택</span>
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 mt-4">
            {CARE_TYPES.mealCare.map(({ id, label }) => {
              const isSelected = profileEdit?.careTypes?.mealCare === id;

              return (
                <Button
                  key={id}
                  type="button"
                  variant="white"
                  size="default"
                  onClick={() => setSelection("mealCare", id)}
                  className="border-gray-400 gap-2 justify-start !px-6 w-full cursor-pointer mb-0 text-black"
                >
                  <svg
                    width="29"
                    height="29"
                    viewBox="0 0 29 29"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-full w-auto"
                  >
                    <rect
                      width="29"
                      height="29"
                      rx="14.5"
                      fill={isSelected ? "#9b4dff" : "#B6B6B6"} // 선택 시 색상 변경
                    />
                    <path
                      d="M8.39775 15.7273C8.17808 15.5076 7.82192 15.5076 7.60225 15.7273C7.38258 15.9469 7.38258 16.303 7.60225 16.5227L10.9773 19.8977C11.1969 20.1174 11.5531 20.1174 11.7727 19.8977L20.0227 11.6477C20.2424 11.4281 20.2424 11.0719 20.0227 10.8523C19.803 10.6326 19.4469 10.6326 19.2273 10.8523L11.375 18.7045L8.39775 15.7273Z"
                      fill="white"
                    />
                  </svg>
                  {label}
                </Button>
              );
            })}
          </div>
        </section>

        {/* 이동보조 */}
        <section className="">
          <div className="flex flex-col items-start gap-2.5 self-stretch ">
            <span className="helper-title">
              이동 보조
              <span className="helper-title_sub ">선택</span>
            </span>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-4">
            {CARE_TYPES.mobilitySupport.map(({ id, label }) => {
              const isSelected = profileEdit?.careTypes?.moveCare === id;

              return (
                <Button
                  key={id}
                  type="button"
                  variant="white"
                  size="default"
                  onClick={() => setSelection("moveCare", id)}
                  className="border-gray-400 gap-2 justify-start !px-6 w-full cursor-pointer mb-0 text-black"
                >
                  <svg
                    width="29"
                    height="29"
                    viewBox="0 0 29 29"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-full w-auto"
                  >
                    <rect
                      width="29"
                      height="29"
                      rx="14.5"
                      fill={isSelected ? "#9b4dff" : "#B6B6B6"} // 선택 시 색상 변경
                    />
                    <path
                      d="M8.39775 15.7273C8.17808 15.5076 7.82192 15.5076 7.60225 15.7273C7.38258 15.9469 7.38258 16.303 7.60225 16.5227L10.9773 19.8977C11.1969 20.1174 11.5531 20.1174 11.7727 19.8977L20.0227 11.6477C20.2424 11.4281 20.2424 11.0719 20.0227 10.8523C19.803 10.6326 19.4469 10.6326 19.2273 10.8523L11.375 18.7045L8.39775 15.7273Z"
                      fill="white"
                    />
                  </svg>
                  {label}
                </Button>
              );
            })}
          </div>
        </section>

        {/* 일상생활 */}
        <section className="">
          <div className="flex flex-col items-start gap-2.5 self-stretch">
            <span className="helper-title">
              일상 생활
              <span className="helper-title_sub ">선택</span>
            </span>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-4">
            {CARE_TYPES.dailyLife.map(({ id, label }) => {
              const isSelected = profileEdit?.careTypes?.dailyLife?.some(
                (item) => item.key === id
              );
              return (
                <Button
                  key={id}
                  type="button"
                  variant="white"
                  size="default"
                  onClick={() => toggleWorkType(id, label, "dailyLife")}
                  className="border-gray-400 gap-2 justify-start !px-6 w-full cursor-pointer mb-0 text-black"
                >
                  <svg
                    width="29"
                    height="29"
                    viewBox="0 0 29 29"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-full w-auto"
                  >
                    <rect
                      width="29"
                      height="29"
                      rx="14.5"
                      fill={isSelected ? "#9b4dff" : "#B6B6B6"}
                    />
                    <path
                      d="M8.39775 15.7273C8.17808 15.5076 7.82192 15.5076 7.60225 15.7273C7.38258 15.9469 7.38258 16.303 7.60225 16.5227L10.9773 19.8977C11.1969 20.1174 11.5531 20.1174 11.7727 19.8977L20.0227 11.6477C20.2424 11.4281 20.2424 11.0719 20.0227 10.8523C19.803 10.6326 19.4469 10.6326 19.2273 10.8523L11.375 18.7045L8.39775 15.7273Z"
                      fill="white"
                    />
                  </svg>
                  {label}
                </Button>
              );
            })}
          </div>
        </section>

        {/* 저장 버튼 */}
        <Button onClick={handleSave} className="w-full mt-4">
          저장하기
        </Button>
      </section>
    </main>
  );
}
