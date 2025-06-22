import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/custom/Button';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/custom/select';
import { Input } from '@/components/ui/input';
import Header from '@/components/ui/temp/Header';

import { useNavigate } from 'react-router-dom';

import useScheduleStore from '@/store/suho/useScheduleStore';

const DAYS_DATA = ['월', '화', '수', '목', '금', '토', '일'];

export default function AccountSchedule() {
  const navigate = useNavigate();
  const { schedule, updateSchedule, resetSchedule, consult, setConsult } = useScheduleStore();

  const [openDays, setOpenDays] = useState(() => {
    const initialOpenDays = {};
    DAYS_DATA.forEach((day) => {
      if (schedule[day]?.start !== '' && schedule[day]?.end !== '') {
        initialOpenDays[day] = true;
      }
    });
    return initialOpenDays;
  });

  const handleConsultClick = () => {
    setConsult(!consult);
  };

  const handleClick = () => {
    navigate('/helper/account/edit');
  };

  const toggleDay = (day) => {
    setOpenDays((prev) => {
      const updatedOpenDays = { ...prev, [day]: !prev[day] };
      return updatedOpenDays;
    });
  };

  const handleTimeChange = (day, type, value) => {
    updateSchedule(day, type, value);
  };

  useEffect(() => {
    DAYS_DATA.forEach((day) => {
      if (!openDays[day]) {
        updateSchedule(day, 'start', '');
        updateSchedule(day, 'end', '');
      }
    });
  }, [openDays, updateSchedule]);

  return (
    <main className='max-w-md mx-auto flex flex-col gap-6'>
      <section className='flex flex-col gap-8 items-center py-10'>
        <div className='flex flex-col items-start gap-2.5 self-stretch'>
          <span className='helper-title text-start !leading-[1.5]'>
            근무 가능한 요일과 시간을 선택해 주세요!
          </span>
          <span className='profile-section__content-text'>
            중복선택가능 <span className='helper-title_sub'>필수</span>
          </span>
        </div>

        <div className='flex flex-col w-full gap-4'>
          {DAYS_DATA.map((day) => (
            <div key={day} className='flex  flex-col items-center  justify-center text-left w-full'>
              <Button
                variant='white'
                size='default'
                onClick={() => toggleDay(day)}
                className='mb-0 border-gray-400  gap-2 justify-start !px-6 w-full cursor-pointer text-black'
              >
                <svg
                  width='29'
                  height='29'
                  viewBox='0 0 29 29'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-full w-auto'
                >
                  <rect
                    width='29'
                    height='29'
                    rx='14.5'
                    fill={openDays[day] ? '#9b4dff' : '#B6B6B6'}
                  />
                  <path
                    d='M8.39775 15.7273C8.17808 15.5076 7.82192 15.5076 7.60225 15.7273C7.38258 15.9469 7.38258 16.303 7.60225 16.5227L10.9773 19.8977C11.1969 20.1174 11.5531 20.1174 11.7727 19.8977L20.0227 11.6477C20.2424 11.4281 20.2424 11.0719 20.0227 10.8523C19.803 10.6326 19.4469 10.6326 19.2273 10.8523L11.375 18.7045L8.39775 15.7273Z'
                    fill='white'
                  />
                </svg>
                {day}요일
              </Button>

              {openDays[day] && (
                <div className='w-full flex flex-row items-center gap-[10px] mt-2'>
                  <div className='flex-1'>
                    <Select
                      value={String(schedule[day]?.start || '')}
                      onValueChange={(value) => handleTimeChange(day, 'start', value)}
                    >
                      <SelectTrigger className='h-[65px] flex gap-8 px-2 w-full justify-center items-center border-[#C8C8C8] border profile-section__content-text'>
                        <SelectValue placeholder='시작시간' />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 24 }, (_, i) => i + 1).map((hour) => {
                          const formattedHour = String(hour).padStart(2, '0') + ':00';
                          return (
                            <SelectItem
                              key={hour}
                              value={String(hour)}
                              className='text-[#191919] text-[20px] font-normal leading-none text-left'
                            >
                              {formattedHour}
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className='profile-section__content-text flex-shrink-0 !w-2'>~</div>

                  <div className='flex-1'>
                    <Select
                      value={String(schedule[day]?.end || '')}
                      onValueChange={(value) => handleTimeChange(day, 'end', value)}
                    >
                      <SelectTrigger className='h-[65px] flex gap-8 px-2 w-full justify-center items-center border-[#C8C8C8] border profile-section__content-text'>
                        <SelectValue placeholder='종료시간' />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 24 }, (_, i) => i + 1).map((hour) => {
                          const formattedHour = String(hour).padStart(2, '0') + ':00';
                          return (
                            <SelectItem
                              key={hour}
                              value={String(hour)}
                              className='text-[#191919] text-[20px] font-normal leading-none text-left'
                            >
                              {formattedHour}
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className='flex items-start w-full gap-2 profile-section__content-text'>
          <span
            onClick={handleConsultClick}
            className='inline-flex items-center gap-2 cursor-pointer'
          >
            <svg
              width='29'
              height='29'
              viewBox='0 0 29 29'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
              className=''
            >
              <rect width='29' height='29' rx='14.5' fill={consult ? '#9b4dff' : '#B6B6B6'} />
              <path
                d='M8.39775 15.7273C8.17808 15.5076 7.82192 15.5076 7.60225 15.7273C7.38258 15.9469 7.38258 16.303 7.60225 16.5227L10.9773 19.8977C11.1969 20.1174 11.5531 20.1174 11.7727 19.8977L20.0227 11.6477C20.2424 11.4281 20.2424 11.0719 20.0227 10.8523C19.803 10.6326 19.4469 10.6326 19.2273 10.8523L11.375 18.7045L8.39775 15.7273Z'
                fill='white'
              />
            </svg>
            {consult ? '협의 가능' : '협의 불가'}
          </span>
        </div>

        <Button className='w-full mb-0' onClick={handleClick}>
          저장하기
        </Button>
      </section>
    </main>
  );
}
