import { useState, useEffect } from "react";
import { Button } from "@/components/ui/custom/Button";
import { Radio, RadioItem } from "@/components/ui/custom/multiRadio";
import { Input } from "@/components/ui/input";
import Header from "@/components/ui/temp/Header";

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
    <main className="max-w-md mx-auto flex flex-col gap-6">
      <Header title="근무 가능 일정" />
      <section className="flex flex-col gap-8 p-4">
      <div className="flex flex-col items-start gap-2.5 self-stretch">
          <span className="helper-title">
          근무 가능한 요일과 시간을 선택해 주세요!

          </span>
          <span className="profile-section__content-text">중복선택가능           <span className="helper-title_sub">필수</span></span>

        </div>

      {/* <Radio cols={1} multiple className="gap-4">

      </Radio> */}


<Button className="w-full" onClick={handleClick}>
        저장하기
      </Button>


      </section>
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


    </main>
  );
}
