import { useState } from "react";
import { Button } from "@/components/ui/custom/Button";
import { useNavigate } from "react-router-dom";
import Header from "@/components/ui/temp/Header";
import location_icon from "@/assets/images/location.png";
import useHelperLocationStore from "@/store/suho/useHelperLocationStore";
import backarrow from "@/assets/images/back-arrow.png";

const LOCATION_DATA = {
  서울: { 은평구: ["불광", "응암", "역촌"], 강남구: ["삼성", "대치", "역삼"] },
  경기: { 고양시: ["창릉"] },
  충청남도: {
    천안시: ["불당동", "성정동"],
    아산시: ["온양1동", "온양2동", "온양3동", "온양4동"],
  },
  부산: { 해운대: ["응애"] },
};

export default function LocationSelector() {
  const navigate = useNavigate();

  const handleClick = () => {
    if (!selectedCity && !selectedDistrict) {
      navigate("/helper/account/edit");
    } else if (selectedDistrict) {
      setSelectedDistrict(null); // 구/군 선택 상태 -> 도시 선택으로 돌아감
    } else {
      setSelectedCity(null); // 도시 선택 상태 -> 도시 선택 해제
    }
  };

  const {
    selectedDistricts,
    addDistrict,
    removeDistrict,
    resetDistricts,
    getTotalSelectedCount,
  } = useHelperLocationStore();
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);

  return (
    <main className="max-w-md mx-auto flex flex-col items-center gap-4 p-4">
      <div className="w-full flex items-center justify-between">
        <Header title="선호 지역" />
        {/* 앱솔루트 설정 */}
        <a
          variant=""
          onClick={resetDistricts}
          className="text-gray-500 hover:text-gray-700"
        >
          초기화
        </a>
      </div>

      <section className="flex flex-col gap-8 p-4">
        <div className="flex flex-col items-start gap-2.5 self-stretch">
          <span className="helper-title text-left">
            나의 선호하는 지역을 설정해 주세요!
          </span>
          <span className="helper-subtitle text-left ">
            돌봄워크가 나에게 맞는 일자리를 소개시켜 드릴게요. (최대 5개 지역
            선택 가능)
          </span>
        </div>

        <>
          {/* 1단계: 도시 선택 */}
          {!selectedCity ? (
            <div className="w-full grid grid-cols-3 gap-5">
              {Object.keys(LOCATION_DATA).map((city) => (
                <Button
                  variant="black"
                  key={city}
                  onClick={() => setSelectedCity(city)}
                  className=" text-lg rounded-[0.625rem] mb-0 w-[100%] font-normal"
                >
                  {city}
                </Button>
              ))}
            </div>
          ) : null}
        </>

        <>
          {/* 2단계: 구/군 선택 */}
          {selectedCity && !selectedDistrict ? (
            <div className="w-full grid grid-cols-3 gap-2">
              {Object.keys(LOCATION_DATA[selectedCity]).map((district) => (
                <Button
                  variant="black"
                  key={district}
                  onClick={() => setSelectedDistrict(district)}
                  className=" text-lg rounded-[0.625rem] mb-0 w-[100%]  font-normal"
                >
                  {district}
                </Button>
              ))}
            </div>
          ) : null}
        </>

        <>
          {/* 3단계: 동 선택 */}
          {selectedCity && selectedDistrict ? (
            <div className="w-full grid grid-cols-3 gap-2">
              {LOCATION_DATA[selectedCity][selectedDistrict].map(
                (subDistrict) => {
                  const isSelected =
                    selectedDistricts[selectedCity]?.[
                      selectedDistrict
                    ]?.includes(subDistrict);
                  return (
                    <Button
                      variant="black"
                      key={subDistrict}
                      onClick={() =>
                        isSelected
                          ? removeDistrict(
                              selectedCity,
                              selectedDistrict,
                              subDistrict
                            )
                          : addDistrict(
                              selectedCity,
                              selectedDistrict,
                              subDistrict
                            )
                      }
                      className={`className=" text-lg rounded-[0.625rem] mb-0 w-[100%]  font-normal" ${
                        isSelected ? "bg-[var(--main)] text-white " : " "
                      }`}
                    >
                      {subDistrict}
                    </Button>
                  );
                }
              )}
            </div>
          ) : null}
        </>

        {/* 선택된 지역 출력 */}
        <div className="flex flex-col items-start gap-2.5 self-stretch">
          <span className="helper-title text-left">
            나의 선호 지역{" "}
            <span className="helper-subtitle">
              ({getTotalSelectedCount()}/5)
            </span>
          </span>
          <span className="helper-subtitle text-left">
            나의 선호지역을 선택해 주세요.
          </span>
        </div>

        <p className="profile-section__content-box">
          <img
            className="w-[24px] h-[24px]"
            src={location_icon}
            alt="location_icon"
          />

          <div className="flex items-center gap-1 py-1">
            {Object.entries(selectedDistricts).length > 0 ? (
              <span className="flex flex-col  gap-2">
                {Object.entries(selectedDistricts).map(([city, districts]) =>
                  Object.entries(districts).map(([district, subDistricts]) => (
                    <div
                      key={`${city}-${district}`}
                      className="flex profile-section__content-text gap-4"
                    >
                      {city}
                      <img
                        src={backarrow}
                        alt="backarrow"
                        className="w-4 h-4 rotate-180 inline-block mx-1"
                      />
                      {district} ({subDistricts.join(", ")})
                    </div>
                  ))
                )}
              </span>
            ) : (
              <span className="profile-section__content-text">미설정</span>
            )}
          </div>
        </p>

        {/* 뒤로가기 버튼 */}
        <Button
          className="w-full"
          onClick={handleClick}
          disabled={
            getTotalSelectedCount() > 5 && !(selectedCity || selectedDistrict)
          }
        >
          선호지역 저장하기
        </Button>
        {getTotalSelectedCount() > 5 && (
          <p className="text-red-500 text-sm text-center">
            최대 5개까지만 선택할 수 있습니다.
          </p>
        )}
      </section>
    </main>
  );
}
