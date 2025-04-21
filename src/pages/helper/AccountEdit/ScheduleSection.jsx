import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import backarrow from "@/assets/images/back-arrow.png";
import location_icon from "@/assets/images/location.png";

function ScheduleSection({ optimize, consult }) {
  const optimized = optimize();

  const navigate = useNavigate();

  return (
    <section
      className=" helper-section hover:cursor-pointer"
      onClick={() => navigate("/helper/account/schedule")}
    >
      <div className="flex flex-col items-start gap-2.5 self-stretch">
        <span className="helper-title">나의 근무 가능 일정</span>
        <span className="helper-subtitle ">
          나의 근무 가능한 날짜와 시간대를 설정해 보세요.
        </span>
      </div>

      <p className="profile-section__content-box">
        <img
          className="w-[24px] h-[24px] "
          src={location_icon}
          alt="location_icon"
        />

        <div>
          {optimized.length > 0 ? (
            optimized.map((item, index) => (
              <p key={index} className="flex items-center gap-4 py-1">
                <span className="profile-section__content-text">
                  {item.days}
                </span>
                <img
                  src={backarrow}
                  alt="backarrow"
                  className="w-4 h-4 rotate-180"
                />
                <span className="profile-section__content-text">
                  {item.time}
                </span>
              </p>
            ))
          ) : (
            <span className="profile-section__content-text">
              설정된 근무 가능 시간이 없습니다.
            </span>
          )}
        </div>
      </p>
      {/* <div className="text-right">{consult ? "협의 가능" : "협의 불가"}</div> */}
    </section>
  );
}
export default ScheduleSection;
