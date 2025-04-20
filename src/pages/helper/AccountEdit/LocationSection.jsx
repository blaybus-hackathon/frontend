import React from "react";
import { useNavigate } from "react-router-dom";
import location_icon from "@/assets/images/location.png";
import backarrow from "@/assets/images/back-arrow.png";

function LocationSection({ selectedDistricts }) {
  const navigate = useNavigate();

  return (
    <section
    /*space-y-2 flex flex-col gap-2*/
      className=" helper-section hover:cursor-pointer"
      onClick={() => navigate("/helper/location")}
    >
      <div className="flex flex-col items-start gap-2.5 self-stretch">
      <span className="helper-title">나의 선호 지역</span>
      <span className="helper-subtitle ">나의 희망근무 지역을 설정해 보세요!</span>
      </div>
      
      {/* text-left flex flex-row items-center gap-3 p-3 border-2 rounded-xl */}
      <p className="flex w-full p-5 items-center self-stretch rounded-[10px] border border-[#C8C8C8] bg-white gap-3">
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
