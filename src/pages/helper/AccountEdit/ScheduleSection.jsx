import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import backarrow from "@/assets/images/back-arrow.png";
import location_icon from "@/assets/images/location.png";

import useScheduleStore from "@/store/suho/useScheduleStore";
function ScheduleSection() {
  const { schedule, consult } = useScheduleStore();

  const navigate = useNavigate();

  const optimizedScheduleData = useMemo(() => {
    return useScheduleStore.getState().optimizedSchedule();
  }, [schedule]);

  return (
    <section
      className="space-y-2 flex flex-col gap-2 hover:cursor-pointer"
      onClick={() => navigate("/helper/account/schedule")}
    >
      <span className="text-left font-bold">나의 근무 가능 일정</span>
      <span className="text-left">
        나의 근무 가능한 날짜와 시간대를 설정해 보세요.
      </span>
      <p className="text-left flex flex-row items-center gap-3 p-3 border-2 rounded-xl">
        <img
          className="w-[24px] h-[24px] "
          src={location_icon}
          alt="location_icon"
        />

        <div>
          {optimizedScheduleData.length > 0 ? (
            optimizedScheduleData.map((item, index) => (
              <div key={index} className="flex items-center gap-2 py-1">
                <span>{item.days}</span>
                <img
                  src={backarrow}
                  alt="backarrow"
                  className="w-4 h-4 rotate-180"
                />
                <span>{item.time}</span>
              </div>
            ))
          ) : (
            <span>설정된 근무 가능 시간이 없습니다.</span>
          )}
        </div>
      </p>
      <div className="text-right">{consult ? "협의 가능" : "협의 불가"}</div>
    </section>
  );
}
export default ScheduleSection;
