import React from "react";
import { useNavigate } from "react-router-dom";
import location_icon from "@/assets/images/location.png";
import backarrow from "@/assets/images/back-arrow.png";

function LocationSection({ selectedDistricts }) {
  const navigate = useNavigate();

  return (
    <section
      className="space-y-2 flex flex-col gap-2  hover:cursor-pointer"
      onClick={() => navigate("/helper/location")}
    >
      <span className="text-left font-bold">나의 선호 지역</span>
      <span className="text-left">나의 희망근무 지역을 설정해 보세요.</span>

      <p className="text-left flex flex-row items-center gap-3 p-3 border-2 rounded-xl">
        <img
          className="w-[24px] h-[24px]"
          src={location_icon}
          alt="location_icon"
        />
        {Object.entries(selectedDistricts).length > 0 ? (
          <span className="flex flex-col  gap-2">
            {Object.entries(selectedDistricts).map(([city, districts]) =>
              Object.entries(districts).map(([district, subDistricts]) => (
                <div // span 대신 div 사용 (블록 레벨)
                  key={`${city}-${district}`}
                  className="flex items-center gap-1"
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
          <span>미설정</span>
        )}
      </p>
    </section>
  );
}

export default LocationSection;
