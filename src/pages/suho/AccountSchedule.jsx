import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import useScheduleStore from '@/store/suho/useScheduleStore';
import { useNavigate } from 'react-router-dom';

const DAYS = ['월', '화', '수', '목', '금', '토', '일'];

export default function AccountSchedule() {
    const navigate = useNavigate();
    const { schedules, setDaySchedule, removeDaySchedule } = useScheduleStore();

    const handleDayToggle = (day) => {
        if (schedules[day]) {
            removeDaySchedule(day);
        } else {
            setDaySchedule(day, { start: '', end: '' });
        }
    };

    const handleTimeChange = (day, type, value) => {
        // 24시간 형식 유효성 검사
        if (value && (value < 0 || value > 24)) return;

        setDaySchedule(day, {
            ...schedules[day],
            [type]: value
        });
    };

    return (
        <main className="max-w-md mx-auto flex flex-col gap-4 p-4">
            {DAYS.map(day => (
                <div key={day} className=" items-center gap-4">
                    <Button
                        type="button"
                        variant={schedules[day] ? "default" : "outline"}
                        onClick={() => handleDayToggle(day)}
                        className=""
                    >
                        {day}요일
                    </Button>

                    {schedules[day] && (
                        <div className="flex items-center gap-4">
                            <Input
                                type="number"
                                min="0"
                                max="24"
                                placeholder="시작"
                                value={schedules[day]?.start || ''}
                                onChange={(e) => handleTimeChange(day, 'start', e.target.value)}
                                className=""
                            />
                            <span>-</span>
                            <Input
                                type="number"
                                min="0"
                                max="24"
                                placeholder="종료"
                                value={schedules[day]?.end || ''}
                                onChange={(e) => handleTimeChange(day, 'end', e.target.value)}
                                className=""
                            />
                            <span>시</span>
                        </div>
                    )}
                </div>
            ))}

            <Button
                className="w-full"
                disabled={Object.keys(schedules).length === 0}
                onClick={() => navigate('/helper/account/edit')}
            >
                저장하기
            </Button>
        </main>
    );
}
