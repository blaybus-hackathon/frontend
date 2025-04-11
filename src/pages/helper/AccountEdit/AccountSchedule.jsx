import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { useNavigate } from "react-router-dom";

import useScheduleStore from "@/store/suho/useScheduleStore";

const DAYS_DATA = ["월", "화", "수", "목", "금", "토", "일"];

export default function AccountSchedule() {
  const navigate = useNavigate();
  const { schedule, updateSchedule, resetSchedule, consult, setConsult } =
    useScheduleStore();

  const [openDays, setOpenDays] = useState(() => {
    const initialOpenDays = {};
    DAYS_DATA.forEach((day) => {
      if (schedule[day]?.start !== "" && schedule[day]?.end !== "") {
        initialOpenDays[day] = true;
      }
    });
    return initialOpenDays;
  });

  const handleConsultClick = () => {
    setConsult(!consult);
  };

  const handleClick = () => {
    navigate("/helper/account/edit");
  };

  const toggleDay = (day) => {
    setOpenDays((prev) => {
      const updatedOpenDays = { ...prev, [day]: !prev[day] };
      if (updatedOpenDays == false)
        console.log("토글 상태 변경:", day, updatedOpenDays); // 로그 추가
      return updatedOpenDays;
    });
  };

  const handleTimeChange = (day, type, value) => {
    updateSchedule(day, type, value);
  };

  useEffect(() => {
    DAYS_DATA.forEach((day) => {
      if (!openDays[day]) {
        updateSchedule(day, "start", "");
        updateSchedule(day, "end", "");
      }
    });
  }, [openDays, updateSchedule]);

  return (
    <main className="max-w-md mx-auto flex flex-col gap-4 p-4">
      {DAYS_DATA.map((day) => (
        <div key={day} className="flex  flex-col items-center gap-4">
          <Button
            type="button"
            className="w-full"
            onClick={() => toggleDay(day)}
          >
            {day}요일
          </Button>

          {openDays[day] && (
            <div className="flex items-center gap-2">
              <Input
                type="number"
                min="0"
                max="24"
                placeholder="시작"
                className="w-20"
                value={schedule[day]?.start || ""}
                onChange={(e) => handleTimeChange(day, "start", e.target.value)}
              />

              <span>~</span>
              <Input
                type="number"
                min="0"
                max="24"
                placeholder="종료"
                className="w-20"
                value={schedule[day]?.end || ""}
                onChange={(e) => handleTimeChange(day, "end", e.target.value)}
              />
            </div>
          )}
        </div>
      ))}

      <Button onClick={handleConsultClick} className="w-full">
        {consult ? "협의 가능" : "협의 불가"}
      </Button>

      <Button className="w-full" onClick={handleClick}>
        저장하기
      </Button>
    </main>
  );
}
