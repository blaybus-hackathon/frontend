// === Post Recruit Page 3 ===
import { Input } from '@/components/ui/custom/input';
import { Button } from '@/components/ui/custom/Button';
import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/custom/select';

import { getCareItems } from '@/services/center';
import { DAYS } from '@/constants/days';
import { TIMES } from '@/constants/times';
import { Alert } from '@/components/ui/custom/alert';
import { FormField } from '@/components/ui/custom/FormField';
import { TimeSelector } from '@/components/ui/custom/TimeSelector';
import { handleApiError } from '@/utils/handleApiError';
import { usePatientStore } from '@/store/center/usePatientStore';

import { recruitSettingSchema } from './validation/recruitSetting.schema';
import { useFormValidation } from '@/hooks/useFormValidation';
import NextButton from '@/components/ui/custom/Button/NextButton';

export default function MatchingManage3({ handleMatchingPage }) {
  const navigate = useNavigate();
  const inputRefs = useRef({});

  const timeList = usePatientStore((s) => s.patientData.timeList);
  const workType = usePatientStore((s) => s.patientData.workType);
  const welfare = usePatientStore((s) => s.patientData.welfare);
  const address = usePatientStore((s) => s.patientData.address);
  const timeNegotiation = usePatientStore((s) => s.patientData.timeNegotiation);
  const wageState = usePatientStore((s) => s.patientData.wageState);
  const wage = usePatientStore((s) => s.patientData.wage);
  const payNego = usePatientStore((s) => s.patientData.wageNegotiation);

  const setField = usePatientStore((s) => s.setField);
  const setTime = usePatientStore((s) => s.setTime);
  const removeTime = usePatientStore((s) => s.removeTime);
  const getTimeIndex = usePatientStore((s) => s.getTimeIndex);
  const isNextEnabled = usePatientStore((s) => s.isNextEnabled);
  const submitRecruitPost = usePatientStore((s) => s.submitRecruitPost);

  const [workTypeOpts, setWorkTypeOpts] = useState([]);
  const [welfareOpts, setWelfareOpts] = useState([]);

  const timeByDay = useMemo(() => {
    // { [dayIdx]: { start, end } }
    const map = {};
    if (timeList && Array.isArray(timeList)) {
      timeList.forEach((timeData) => {
        const dayIdx = timeData.ptDate - 1; // ptDate: 1~7 -> dayIdx: 0~6

        // 유효한 dayIdx 범위 체크 (0~6)
        if (dayIdx >= 0 && dayIdx <= 6) {
          map[dayIdx] = { start: timeData.ptStartTime, end: timeData.ptEndTime };
        } else {
          console.warn('invalid dayIdx:', dayIdx);
        }
      });
    }
    return map;
  }, [timeList]);

  const isDaySelected = useCallback((dayIdx) => !!timeByDay[dayIdx], [timeByDay]);

  const selectedDayIndices = useMemo(
    () =>
      timeList && Array.isArray(timeList)
        ? timeList.map((timeData) => timeData.ptDate - 1).sort((a, b) => a - b)
        : [],
    [timeList],
  );

  const formData = useMemo(() => {
    const days = DAYS.reduce((acc, _, idx) => {
      acc[idx] = isDaySelected(idx);
      return acc;
    }, {});

    const workStartTimes = {};
    const workEndTimes = {};

    for (const k of Object.keys(timeByDay)) {
      const dayIdx = Number(k);
      const start = timeByDay[dayIdx]?.start;
      const end = timeByDay[dayIdx]?.end;
      if (start != null) workStartTimes[dayIdx] = getTimeIndex(start);
      if (end != null) workEndTimes[dayIdx] = getTimeIndex(end);
    }

    return {
      workType: workType || null,
      address: address || '',
      days,
      times: { workStartTimes, workEndTimes },
      wage: wage ?? '',
      welfare: welfare || null,
    };
  }, [workType, address, timeByDay, isDaySelected, getTimeIndex, wage, welfare]);

  // 폼 검증
  const { errors, touched, isValid, onBlur, onChangeValidate, validateAll } = useFormValidation({
    values: formData,
    schema: recruitSettingSchema,
    fieldRefs: inputRefs,
  });

  const showPerFieldAlert = !errors.times?.summary;

  // 근무 종류 / 복리후생 옵션 조회
  useEffect(() => {
    (async () => {
      try {
        const res = await getCareItems(['WORK_TYPE', 'WELFARE']);
        setWorkTypeOpts(res.workTypeList);
        setWelfareOpts(res.welfareList);
      } catch (error) {
        handleApiError(error);
      }
    })();
  }, []);

  const toggleDay = (dayIdx) => {
    if (isDaySelected(dayIdx)) {
      const ptDate = dayIdx + 1;
      removeTime(ptDate);
    } else {
      const ptDate = dayIdx + 1;
      setTime(ptDate);
    }

    // days 필드 즉시 검증
    const newDays = DAYS.reduce((acc, _, idx) => {
      acc[idx] = idx === dayIdx ? !isDaySelected(dayIdx) : isDaySelected(idx);
      return acc;
    }, {});
    onChangeValidate('days', newDays);
  };

  // 시작시간 변경
  const onChangeStartTime = useCallback(
    (dayIdx, startIdx) => {
      const startStr = TIMES[startIdx];
      const current = timeByDay[dayIdx];
      const endStr = current?.end ?? null;

      setTime(dayIdx + 1, startStr, endStr);
      onBlur('times');
    },
    [setTime, timeByDay, onBlur],
  );

  // 종료시간 변경
  const onChangeEndTime = useCallback(
    (dayIdx, endIdx) => {
      const endStr = TIMES[endIdx];
      const current = timeByDay[dayIdx];
      const startStr = current?.start ?? null;

      setTime(dayIdx + 1, startStr, endStr);
      onBlur('times');
    },
    [setTime, timeByDay, onBlur],
  );

  // 근무 종류 선택
  const selectWorkType = (careVal) => {
    setField('workType', careVal);
    onChangeValidate('workType', careVal);
  };

  // 복리후생 토글
  const toggleWelfare = (careVal) => {
    const newWelfare = welfare ^ careVal;
    setField('welfare', newWelfare);
    onChangeValidate('welfare', newWelfare);
  };

  const postRecruit = async () => {
    const isValidForm = validateAll();
    if (!isValidForm) return;

    try {
      await submitRecruitPost();
      handleMatchingPage((prev) => prev + 1);
    } catch (error) {
      handleApiError(error);
    }
  };

  // 렌더링 헬퍼
  // 근무 형태 렌더링
  const renderWorkType = () =>
    workTypeOpts.map((wt) => (
      <Button
        key={wt.careVal}
        variant={workType === wt.careVal ? 'default' : 'outline'}
        onClick={() => selectWorkType(wt.careVal)}
        onBlur={() => onBlur('workType')}
        ref={(el) => (inputRefs.current.workType = el)}
        className={`w-full text-lg lg:text-xl font-normal ${errors.workType && touched.workType ? 'border-red-500' : ''}`}
      >
        {wt.careName}
      </Button>
    ));

  const renderWelfare = () =>
    welfareOpts.map((wf) => {
      const checked = (welfare & wf.careVal) === wf.careVal;
      return (
        <Button
          key={wf.careVal}
          variant={checked ? 'default' : 'outline'}
          onClick={() => toggleWelfare(wf.careVal)}
          onBlur={() => onBlur('welfare')}
          ref={(el) => (inputRefs.current.welfare = el)}
          className={`w-full text-lg lg:text-xl font-normal ${errors.welfare && touched.welfare ? 'border-red-500' : ''}`}
        >
          {wf.careName}
        </Button>
      );
    });

  //요일 선택 렌더링
  const renderDays = () =>
    DAYS.map((day, idx) => (
      <Button
        key={idx}
        variant={isDaySelected(idx) ? 'default' : 'outline'}
        className={`h-16 text-lg lg:text-xl font-normal w-full mb-0 ${errors.days && touched.days ? 'border-red-500' : ''}`}
        onClick={() => toggleDay(idx)}
        onBlur={() => onBlur('days')}
        ref={(el) => (inputRefs.current.days = el)}
      >
        {day}
      </Button>
    ));

  //요일별 시간 설정
  const renderTimeSet = () =>
    selectedDayIndices.map((dayIdx) => {
      const current = timeByDay[dayIdx] || {};
      const startIdx = current.start != null ? getTimeIndex(current.start) : undefined;
      const endIdx = current.end != null ? getTimeIndex(current.end) : undefined;

      const startError = errors.times?.workStartTimes?.[dayIdx];
      const endError = errors.times?.workEndTimes?.[dayIdx];

      return (
        <div key={dayIdx} className='w-full text-start'>
          <label className='inline-block text-lg lg:text-xl font-normal my-2'>{DAYS[dayIdx]}</label>
          <div className='flex w-full items-center gap-4'>
            <TimeSelector
              useIndex
              value={startIdx}
              placeholder='시작시간'
              className={`flex-1 border-[var(--outline)] border-2 h-16 text-lg lg:text-xl ${startError ? 'border-red-500' : ''}`}
              onChange={(idx) => onChangeStartTime(dayIdx, idx)}
              onBlur={() => onBlur('times')}
            />
            <span className='inline-flex items-center text-lg lg:text-xl'>~</span>
            <TimeSelector
              useIndex
              value={endIdx}
              placeholder='종료시간'
              className={`flex-1 border-[var(--outline)] border-2 h-16 text-lg lg:text-xl ${endError ? 'border-red-500' : ''}`}
              onChange={(idx) => onChangeEndTime(dayIdx, idx)}
              onBlur={() => onBlur('times')}
            />
          </div>
          {showPerFieldAlert && startError && <Alert description={startError} />}
          {showPerFieldAlert && endError && <Alert description={endError} />}
        </div>
      );
    });

  const nextEnabled = isNextEnabled();

  return (
    <>
      <div className='mx-auto flex flex-col items-center mb-12'>
        <p className='font-bold text-xl tracking-[-0.1rem] pt-8 pb-3 w-full mx-auto text-start'>
          구인정보를 입력해주세요
        </p>
        <p className='font-normal text-xl tracking-[-0.1rem] w-full mx-auto text-start'>
          일정 범위 내 날짜/시간/요일 협의 가능
        </p>
      </div>

      <div className='mx-auto flex flex-col gap-10 mb-3'>
        <FormField label='근무 종류' required>
          <div className='grid grid-cols-2 w-full gap-4'>{renderWorkType()}</div>
          {errors.workType && touched.workType && <Alert description={errors.workType} />}
        </FormField>

        <FormField label='근무지 주소' required>
          <Input
            className={`h-16 rounded-md font-normal cursor-pointer ${errors.address && touched.address ? 'border-red-500' : ''}`}
            width='100%'
            placeholder='주소입력'
            value={address}
            readOnly
            onChange={(e) => setField('address', e.target.value)}
            onBlur={() => onBlur('address')}
            ref={(el) => (inputRefs.current.address = el)}
            onClick={() => {
              navigate('/center/address?from=recruit');
            }}
          />
          {errors.address && touched.address && <Alert description={errors.address} />}
        </FormField>

        <FormField label='구인 날짜' required isMultiple>
          <div className='w-full grid grid-cols-2 gap-4'>{renderDays()}</div>
          {errors.days && touched.days && <Alert description={errors.days} />}
        </FormField>

        <FormField label='구인 시간' required>
          {renderTimeSet()}
          {errors.times?.summary && <Alert description={errors.times.summary} />}

          <div
            className='flex text-lg lg:text-xl mt-7'
            onClick={() => setField('timeNegotiation', !timeNegotiation)}
          >
            <svg
              width='29'
              height='29'
              viewBox='0 0 29 29'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
              className='!size-7 mr-3'
            >
              <rect
                width='29'
                height='29'
                rx='14.5'
                fill={timeNegotiation ? 'var(--company-primary)' : '#B6B6B6'}
                className='!size-7'
              />
              <path
                d='M8.39775 15.7273C8.17808 15.5076 7.82192 15.5076 7.60225 15.7273C7.38258 15.9469 7.38258 16.303 7.60225 16.5227L10.9773 19.8977C11.1969 20.1174 11.5531 20.1174 11.7727 19.8977L20.0227 11.6477C20.2424 11.4281 20.2424 11.0719 20.0227 10.8523C19.803 10.6326 19.4469 10.6326 19.2273 10.8523L11.375 18.7045L8.39775 15.7273Z'
                fill='white'
              />
            </svg>
            협의 가능
          </div>
        </FormField>

        <FormField label='희망급여' required>
          <div className='flex w-full gap-4'>
            <Select
              defaultValue={1}
              value={wageState}
              onValueChange={(val) => setField('wageState', val)}
            >
              <SelectTrigger className='flex-1 border-[var(--outline)] border-2 h-16 text-lg lg:text-xl font-normal'>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={1}>시급</SelectItem>
                <SelectItem value={2}>일급</SelectItem>
                <SelectItem value={3}>주급</SelectItem>
              </SelectContent>
            </Select>
            <span className='inline-flex items-center text-lg lg:text-xl'>~</span>
            <div
              className={`flex-1 h-16 border rounded-md px-3 py-2 relative text-lg lg:text-xl ${errors.wage && touched.wage ? 'border-red-500' : 'border-[var(--outline)]'}`}
            >
              <Input
                width='auto'
                className='border-0 px-0 py-0 h-11.5 text-lg lg:text-xl focus:ring-0 focus:outline-none'
                onChange={(e) => {
                  const v = e.target.value;
                  const parsed = v === '' ? null : Number(v);
                  setField('wage', parsed);
                  onChangeValidate('wage', parsed);
                }}
                onBlur={() => onBlur('wage')}
                ref={(el) => (inputRefs.current.wage = el)}
                value={wage ?? ''}
                type='number'
              />
              <span className='absolute right-3 top-1/2 -translate-y-1/2 text-lg lg:text-xl'>
                원
              </span>
            </div>
          </div>
          {errors.wage && touched.wage && <Alert description={errors.wage} />}
          <p
            className='flex text-lg lg:text-xl mt-7'
            onClick={() => setField('wageNegotiation', !payNego)}
          >
            <svg
              width='29'
              height='29'
              viewBox='0 0 29 29'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
              className='!size-7 mr-3'
            >
              <rect
                width='29'
                height='29'
                rx='14.5'
                fill={payNego ? 'var(--company-primary)' : '#B6B6B6'}
                className='!size-7'
              />
              <path
                d='M8.39775 15.7273C8.17808 15.5076 7.82192 15.5076 7.60225 15.7273C7.38258 15.9469 7.38258 16.303 7.60225 16.5227L10.9773 19.8977C11.1969 20.1174 11.5531 20.1174 11.7727 19.8977L20.0227 11.6477C20.2424 11.4281 20.2424 11.0719 20.0227 10.8523C19.803 10.6326 19.4469 10.6326 19.2273 10.8523L11.375 18.7045L8.39775 15.7273Z'
                fill='white'
              />
            </svg>
            협의 가능
          </p>
        </FormField>

        <FormField label='복리후생' required isMultiple>
          <div className='w-full grid grid-cols-2 gap-4'>{renderWelfare()}</div>
          {errors.welfare && touched.welfare && <Alert description={errors.welfare} />}
        </FormField>

        <NextButton disabled={!nextEnabled || !isValid} onClick={postRecruit} />
      </div>
    </>
  );
}
