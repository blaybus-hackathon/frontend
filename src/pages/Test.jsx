import { useState } from "react";
import PayInfoSection from "../pages/helper/AccountEdit/PayInfoSection";
import ScheduleSection from "../pages/helper/AccountEdit/ScheduleSection";

export default function test({ profile }) {
  const [schedules, setSchedules] = useState({});

  const setDaySchedule = (day, schedule) => {
    setSchedules((prevSchedules) => ({
      ...prevSchedules,
      [day]: schedule,
    }));
  };

  const removeDaySchedule = (day) => {
    const newSchedules = { ...schedules };
    delete newSchedules[day];
    setSchedules(newSchedules);
  };

  return (
    <div>
      <PayInfoSection pay={profile?.pay} />
      <ScheduleSection
        schedules={schedules}
        setDaySchedule={setDaySchedule}
        removeDaySchedule={removeDaySchedule}
      />
    </div>
  );
}
