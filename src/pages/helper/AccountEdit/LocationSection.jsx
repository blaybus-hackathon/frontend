import React from "react";
import { useNavigate } from "react-router-dom";
import location_icon from "@/assets/images/location.png";
import backarrow from "@/assets/images/back-arrow.png";

function LocationSection({ selectedDistricts }) {
  const navigate = useNavigate();

  return (
    <section
      className=" helper-section hover:cursor-pointer"
      onClick={() => navigate("/helper/location")}
    >
      <div className="flex flex-col items-start gap-2.5 self-stretch">
        <span className="helper-title">나의 선호 지역</span>
        <span className="helper-subtitle ">
          나의 희망근무 지역을 설정해 보세요!
        </span>
      </div>

      <p className="profile-section__content-box">
        <img
          className="w-[24px] h-[24px]"
          src={location_icon}
          alt="location_icon"
        />
        {/* TODO : 긴 문장 처리시 overflow 처리 필요. */}
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
    </section>
  );
}

export default LocationSection;
