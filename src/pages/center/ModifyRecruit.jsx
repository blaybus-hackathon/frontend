import { Button } from '@/components/ui/custom/Button';
import { Input } from '@/components/ui/custom/input';
import { useState, useEffect, useMemo, useRef } from 'react';
import { FormField } from '@/components/ui/custom/FormField';
import { useNavigate, useParams } from 'react-router-dom';
import { useHeaderPropsStore } from '@/store/useHeaderPropsStore';
import Spinner from '@/components/loading/Spinner';
import { Alert } from '@/components/ui/custom/alert';
import { useFormValidation } from '@/hooks/useFormValidation';
import { modifyRecruitSchema } from './validation/modifyRecruit.schema';

import { request } from '@/api';
import { useRecruitStore } from '@/store/center/useRecruitStore';

export default function ModifyInfo() {
  const {
    recruitData,
    setFields,
    fetchRecruitDetail,
    submitRecruitPost,
    isLoading,
    isSubmitting,
    error,
    errorCode,
  } = useRecruitStore();

  const navigate = useNavigate();
  const { patientLogSeq } = useParams();
  const inputRefs = useRef({});

  const [careOptions, setCareOptions] = useState({
    careLevelList: [],
    dementiaSymptomList: [],
    inmateStateList: [],
    serviceMealList: [],
    serviceToiletList: [],
    serviceMobilityList: [],
    serviceDailyList: [],
    welfareList: [],
    workTypeList: [],
  });

  // 초기값 저장을 위한 state
  const [initialValues, setInitialValues] = useState({});

  const [name, setName] = useState(recruitData.name);
  const [birthday, setBirthday] = useState(recruitData.birthDate);
  const [gender, setGender] = useState(recruitData.genderStr);
  const [weight, setWeight] = useState(recruitData.weight);
  const [disease, setDisease] = useState(recruitData.diseases);
  const [requestContents, setRequestContents] = useState(recruitData.requestContents);

  // 선택된 케어 옵션들 (단일/복수 선택 혼합)
  const [selectedGrade, setSelectedGrade] = useState(null); // 단일 선택
  const [selectedDemen, setSelectedDemen] = useState([]); // 복수 선택
  const [selectedWith, setSelectedWith] = useState(null); // 단일 선택
  const [selectedMeal, setSelectedMeal] = useState(null); // 단일 선택
  const [selectedToilet, setSelectedToilet] = useState([]); // 복수 선택
  const [selectedMobile, setSelectedMobile] = useState([]); // 복수 선택
  const [selectedDaily, setSelectedDaily] = useState([]); // 복수 선택
  const [selectedWelfare, setSelectedWelfare] = useState(null); // 단일 선택
  const [selectedWorkType, setSelectedWorkType] = useState(null); // 단일 선택

  const setHeaderProps = useHeaderPropsStore((state) => state.setHeaderProps);
  const clearHeaderProps = useHeaderPropsStore((state) => state.clearHeaderProps);

  // 폼 데이터 구성
  const formData = useMemo(
    () => ({
      name,
      birthDate: birthday,
      gender,
      weight,
      diseases: disease,
      careLevel: selectedGrade,
      inmateState: selectedWith,
      serviceMeal: selectedMeal,
      welfare: selectedWelfare,
      workType: selectedWorkType,
      requestContents,
      // 복수 선택 필드들
      dementiaSymptom: Array.isArray(selectedDemen)
        ? selectedDemen.reduce((acc, cur) => acc + cur, 0)
        : selectedDemen || 0,
      serviceToilet: Array.isArray(selectedToilet)
        ? selectedToilet.reduce((acc, cur) => acc + cur, 0)
        : selectedToilet || 0,
      serviceMobility: Array.isArray(selectedMobile)
        ? selectedMobile.reduce((acc, cur) => acc + cur, 0)
        : selectedMobile || 0,
      serviceDaily: Array.isArray(selectedDaily)
        ? selectedDaily.reduce((acc, cur) => acc + cur, 0)
        : selectedDaily || 0,
    }),
    [
      name,
      birthday,
      gender,
      weight,
      disease,
      selectedGrade,
      selectedWith,
      selectedMeal,
      selectedWelfare,
      selectedWorkType,
      requestContents,
      selectedDemen,
      selectedToilet,
      selectedMobile,
      selectedDaily,
    ],
  );

  // 폼 검증 훅
  const { errors, touched, isValid, onBlur, onChangeValidate, validateAll } = useFormValidation({
    values: formData,
    schema: modifyRecruitSchema,
    fieldRefs: inputRefs,
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        // 공고 상세 정보 로드
        await fetchRecruitDetail(patientLogSeq);

        // 케어 옵션 로드
        const res = await request('get', '/cmn/all-care-list');
        setCareOptions(res);
      } catch (error) {
        throw new Error(error);
      }
    };

    if (patientLogSeq) {
      loadData();
    } else {
      alert('잘못된 접근입니다.');
      navigate('/center');
    }
  }, [patientLogSeq, fetchRecruitDetail, navigate]);

  // 에러 상태 모니터링 및 처리
  useEffect(() => {
    if (error && errorCode) {
      console.error(`에러 발생 [${errorCode}]:`, error);

      // 특정 에러 코드에 따른 처리
      switch (errorCode) {
        case 'MISSING_PARAM':
        case 'MISSING_PATIENT_LOG_SEQ':
          alert('필수 정보가 누락되었습니다.');
          navigate('/center');
          break;
        case 8001:
        case 8000:
          alert(error);
          navigate('/center');
          break;
        case 7000:
        case 7001:
          alert(error);
          navigate('/center');
          break;
        default:
          if (error) {
            alert(error);
          }
          break;
      }
    }
  }, [error, errorCode, navigate]);

  // recruitData가 로드된 후 폼 상태 업데이트 및 초기값 저장
  useEffect(() => {
    if (recruitData.name) {
      const values = {
        name: recruitData.name,
        birthDate: recruitData.birthDate,
        gender: recruitData.gender === 1 ? '남성' : '여성',
        weight: recruitData.weight,
        diseases: recruitData.diseases,
        requestContents: recruitData.requestContents,
      };

      // 초기값 저장
      setInitialValues(values);

      // 현재 값 설정
      setName(values.name);
      setBirthday(values.birthDate);
      setGender(values.gender);
      setWeight(values.weight);
      setDisease(values.diseases);
      setRequestContents(values.requestContents);
    }
  }, [recruitData]);

  useEffect(() => {
    if (careOptions.careLevelList.length > 0 && recruitData.careChoice) {
      // 현재 선택된 항목들을 careVal 기준으로 설정 (첫 번째 항목만 선택)
      const gradeItem = careOptions.careLevelList.find((x) =>
        recruitData.careChoice.careLevelList?.includes(x.id),
      );
      const withItem = careOptions.inmateStateList.find((x) =>
        recruitData.careChoice.inmateStateList?.includes(x.id),
      );
      const mealItem = careOptions.serviceMealList.find((x) =>
        recruitData.careChoice.serviceMealList?.includes(x.id),
      );
      const welfareItem = careOptions.welfareList.find((x) =>
        recruitData.careChoice.welfareList?.includes(x.id),
      );
      const workTypeItem = careOptions.workTypeList.find((x) =>
        recruitData.careChoice.workTypeList?.includes(x.id),
      );

      setSelectedGrade(gradeItem?.careVal || null);
      setSelectedDemen(
        careOptions.dementiaSymptomList
          .filter((x) => recruitData.careChoice.dementiaSymptomList?.includes(x.id))
          .map((d) => d.careVal),
      );
      setSelectedWith(withItem?.careVal || null);
      setSelectedMeal(mealItem?.careVal || null);
      setSelectedToilet(
        careOptions.serviceToiletList
          .filter((x) => recruitData.careChoice.serviceToiletList?.includes(x.id))
          .map((t) => t.careVal),
      );
      setSelectedMobile(
        careOptions.serviceMobilityList
          .filter((x) => recruitData.careChoice.serviceMobilityList?.includes(x.id))
          .map((m) => m.careVal),
      );
      setSelectedDaily(
        careOptions.serviceDailyList
          .filter((x) => recruitData.careChoice.serviceDailyList?.includes(x.id))
          .map((d) => d.careVal),
      );
      setSelectedWelfare(welfareItem?.careVal || null);
      setSelectedWorkType(workTypeItem?.careVal || null);
    }
  }, [careOptions, recruitData.careChoice]);

  // 헤더 세팅
  useEffect(() => {
    setHeaderProps({
      type: 'back',
      title: '공고 수정하기',
      onBack: () => {
        navigate(`/center/recruit/detail/${patientLogSeq}`);
      },
    });

    return () => {
      clearHeaderProps();
    };
  }, [navigate, patientLogSeq, setHeaderProps, clearHeaderProps]);

  const renderButtons = (
    items,
    selectedValue = null,
    setSelectedValue = null,
    isMultiple = false,
    fieldName = null,
  ) => {
    // 첫 번째 버튼에 ref 설정을 위한 컨테이너 div 생성
    const buttonsWithRef = items.map((item, idx) => (
      <Button
        key={idx}
        variant={
          isMultiple
            ? selectedValue?.includes(item.careVal)
              ? 'default'
              : 'outline'
            : selectedValue === item.careVal
              ? 'default'
              : 'outline'
        }
        className={`h-16 text-lg font-medium w-full mb-0 ${
          fieldName && errors[fieldName] && touched[fieldName] ? 'border-red-500' : ''
        }`}
        onClick={() => {
          let newValue;
          if (isMultiple) {
            // 복수 선택: 배열에서 추가/제거
            if (selectedValue?.includes(item.careVal)) {
              const updatedValue = selectedValue.filter((x) => x !== item.careVal);
              setSelectedValue(updatedValue);
              // 복수 선택의 경우도 검증
              if (fieldName) {
                onChangeValidate(
                  fieldName,
                  updatedValue.length > 0 ? updatedValue.reduce((acc, cur) => acc + cur, 0) : 0,
                );
              }
            } else {
              const updatedValue = [...(selectedValue || []), item.careVal];
              setSelectedValue(updatedValue);
              // 복수 선택의 경우도 검증
              if (fieldName) {
                onChangeValidate(
                  fieldName,
                  updatedValue.reduce((acc, cur) => acc + cur, 0),
                );
              }
            }
          } else {
            // 단일 선택: 같은 값이면 선택 해제, 다른 값이면 새로 선택
            if (selectedValue === item.careVal) {
              newValue = null;
              setSelectedValue(null);
            } else {
              newValue = item.careVal;
              setSelectedValue(item.careVal);
            }

            // 단일 선택의 경우 즉시 검증
            if (fieldName) {
              onChangeValidate(fieldName, newValue);
            }
          }
        }}
        onBlur={() => fieldName && onBlur(fieldName)}
        ref={(el) => {
          // 첫 번째 버튼에 ref 설정
          if (fieldName && idx === 0 && el) {
            inputRefs.current[fieldName] = el;
          }
        }}
      >
        {item.careName}
      </Button>
    ));

    return buttonsWithRef;
  };

  // 초기값으로 복원
  const restoreInitialValues = () => {
    if (initialValues.name) {
      setName(initialValues.name);
      setBirthday(initialValues.birthDate);
      setGender(initialValues.gender);
      setWeight(initialValues.weight);
      setDisease(initialValues.diseases);
      setRequestContents(initialValues.requestContents);

      // 케어 옵션들도 초기값으로 복원
      if (careOptions.careLevelList.length > 0 && recruitData.careChoice) {
        const gradeItem = careOptions.careLevelList.find((x) =>
          recruitData.careChoice.careLevelList?.includes(x.id),
        );
        const withItem = careOptions.inmateStateList.find((x) =>
          recruitData.careChoice.inmateStateList?.includes(x.id),
        );
        const mealItem = careOptions.serviceMealList.find((x) =>
          recruitData.careChoice.serviceMealList?.includes(x.id),
        );
        const welfareItem = careOptions.welfareList.find((x) =>
          recruitData.careChoice.welfareList?.includes(x.id),
        );
        const workTypeItem = careOptions.workTypeList.find((x) =>
          recruitData.careChoice.workTypeList?.includes(x.id),
        );

        setSelectedGrade(gradeItem?.careVal || null);
        setSelectedDemen(
          careOptions.dementiaSymptomList
            .filter((x) => recruitData.careChoice.dementiaSymptomList?.includes(x.id))
            .map((d) => d.careVal),
        );
        setSelectedWith(withItem?.careVal || null);
        setSelectedMeal(mealItem?.careVal || null);
        setSelectedToilet(
          careOptions.serviceToiletList
            .filter((x) => recruitData.careChoice.serviceToiletList?.includes(x.id))
            .map((t) => t.careVal),
        );
        setSelectedMobile(
          careOptions.serviceMobilityList
            .filter((x) => recruitData.careChoice.serviceMobilityList?.includes(x.id))
            .map((m) => m.careVal),
        );
        setSelectedDaily(
          careOptions.serviceDailyList
            .filter((x) => recruitData.careChoice.serviceDailyList?.includes(x.id))
            .map((d) => d.careVal),
        );
        setSelectedWelfare(welfareItem?.careVal || null);
        setSelectedWorkType(workTypeItem?.careVal || null);
      }
    }
  };

  const modify = async () => {
    // 이미 제출 중인 경우 중복 실행 방지
    if (isSubmitting) {
      console.warn('이미 수정 중입니다.');
      return;
    }

    // 필수 필드 검증
    if (!patientLogSeq) {
      alert('공고 정보를 찾을 수 없습니다.');
      return;
    }

    // 폼 전체 검증
    const isValidForm = validateAll();
    if (!isValidForm) {
      return;
    }

    try {
      // 현재 폼 데이터를 스토어에 업데이트
      setFields({
        patientLogSeq: Number(patientLogSeq),
        name: name.trim(),
        birthDate: birthday,
        gender: gender === '남성' ? 1 : 2,
        weight: Number(weight),
        diseases: disease.trim(),
        requestContents: requestContents.trim(),
        welfare: selectedWelfare || 0,
        careLevel: selectedGrade || 0,
        workType: selectedWorkType || 0,
        dementiaSymptom: Array.isArray(selectedDemen)
          ? selectedDemen.reduce((acc, cur) => acc + cur, 0)
          : selectedDemen || 0,
        inmateState: selectedWith || 0,
        serviceMeal: selectedMeal || 0,
        serviceToilet: Array.isArray(selectedToilet)
          ? selectedToilet.reduce((acc, cur) => acc + cur, 0)
          : selectedToilet || 0,
        serviceMobility: Array.isArray(selectedMobile)
          ? selectedMobile.reduce((acc, cur) => acc + cur, 0)
          : selectedMobile || 0,
        serviceDaily: Array.isArray(selectedDaily)
          ? selectedDaily.reduce((acc, cur) => acc + cur, 0)
          : selectedDaily || 0,
      });

      await submitRecruitPost();

      alert('공고 수정이 완료되었습니다. 수정된 공고를 기반으로 다시 매칭을 진행해드릴게요!');
      navigate(`/center/recruit/detail/${patientLogSeq}`);
    } catch (error) {
      console.error(`공고 수정 실패 : ${error}`);
      // 수정 실패 시 초기값으로 복원
      restoreInitialValues();
    }
  };

  // 로딩 상태 처리
  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div>
      <div className='mt-8 gap-10 flex flex-col mb-3 w-full'>
        <FormField label='이름' required>
          <Input
            className={`h-16 text-lg rounded-md border-[var(--outline)] ${
              errors.name && touched.name ? 'border-red-500' : ''
            }`}
            width='100%'
            value={name}
            onChange={(e) => {
              const value = e.target.value;
              setName(value);
              onChangeValidate('name', value);
            }}
            onBlur={() => onBlur('name')}
            ref={(el) => (inputRefs.current.name = el)}
          />
          {errors.name && touched.name && <Alert description={errors.name} />}
        </FormField>
        <FormField label='생년월일' required>
          <Input
            className={`h-16 text-lg rounded-md border-[var(--outline)] ${
              errors.birthDate && touched.birthDate ? 'border-red-500' : ''
            }`}
            width='100%'
            value={birthday}
            onChange={(e) => {
              setBirthday(e.target.value);
            }}
            onBlur={() => onBlur('birthDate')}
            ref={(el) => (inputRefs.current.birthDate = el)}
          />
          {errors.birthDate && touched.birthDate && <Alert description={errors.birthDate} />}
        </FormField>
        <FormField label='보유질병' required>
          <Input
            className={`h-16 text-lg rounded-md border-[var(--outline)] ${
              errors.diseases && touched.diseases ? 'border-red-500' : ''
            }`}
            width='100%'
            type='text'
            value={disease}
            onChange={(e) => {
              const value = e.target.value;
              setDisease(value);
              onChangeValidate('diseases', value);
            }}
            onBlur={() => onBlur('diseases')}
            ref={(el) => (inputRefs.current.diseases = el)}
          />
          {errors.diseases && touched.diseases && <Alert description={errors.diseases} />}
        </FormField>

        <FormField label='몸무게' required>
          <div
            className={`h-16 text-lg rounded-md border w-full text-start relative ${
              errors.weight && touched.weight ? 'border-red-500' : 'border-[var(--outline)]'
            }`}
          >
            <input
              type='number'
              className='h-16 w-full px-4 rounded-md'
              value={weight}
              onChange={(e) => {
                const value = e.target.value;
                setWeight(value);
                onChangeValidate('weight', value);
              }}
              onBlur={() => onBlur('weight')}
              ref={(el) => (inputRefs.current.weight = el)}
            />
            <span className='absolute right-3 top-1/2 transform -translate-y-1/2 text-lg'>kg</span>
          </div>
          {errors.weight && touched.weight && <Alert description={errors.weight} />}
        </FormField>

        <FormField label='성별' required>
          <div className='flex gap-4 w-full'>
            <Button
              variant={gender === '여성' ? 'default' : 'outline'}
              className={`flex-1 h-16 text-lg mb-0 font-medium ${
                errors.gender && touched.gender ? 'border-red-500' : ''
              }`}
              onClick={() => {
                setGender('여성');
                onChangeValidate('gender', '여성');
              }}
              onBlur={() => onBlur('gender')}
              ref={(el) => (inputRefs.current.gender = el)}
            >
              여성
            </Button>
            <Button
              variant={gender === '남성' ? 'default' : 'outline'}
              className={`flex-1 h-16 text-lg mb-0 font-medium ${
                errors.gender && touched.gender ? 'border-red-500' : ''
              }`}
              onClick={() => {
                setGender('남성');
                onChangeValidate('gender', '남성');
              }}
              onBlur={() => onBlur('gender')}
            >
              남성
            </Button>
          </div>
          {errors.gender && touched.gender && <Alert description={errors.gender} />}
        </FormField>

        <FormField label='장기요양등급' required>
          <div className='w-full grid grid-cols-2 gap-4'>
            {renderButtons(
              careOptions.careLevelList,
              selectedGrade,
              setSelectedGrade,
              false,
              'careLevel',
            )}
          </div>
          {errors.careLevel && touched.careLevel && <Alert description={errors.careLevel} />}
        </FormField>

        <FormField label='동거인 여부' required>
          <div className='w-full grid gap-4'>
            {renderButtons(
              careOptions.inmateStateList,
              selectedWith,
              setSelectedWith,
              false,
              'inmateState',
            )}
          </div>
          {errors.inmateState && touched.inmateState && <Alert description={errors.inmateState} />}
        </FormField>
        <FormField label='식사 보조' required>
          <div className='w-full grid grid-cols-2 gap-4'>
            {renderButtons(
              careOptions.serviceMealList,
              selectedMeal,
              setSelectedMeal,
              false,
              'serviceMeal',
            )}
          </div>
          {errors.serviceMeal && touched.serviceMeal && <Alert description={errors.serviceMeal} />}
        </FormField>
        <FormField label='이동 보조' required isMultiple={true}>
          <div className='w-full grid grid-cols-2 gap-4'>
            {renderButtons(
              careOptions.serviceMobilityList,
              selectedMobile,
              setSelectedMobile,
              true,
              'serviceMobility',
            )}
          </div>
          {errors.serviceMobility && touched.serviceMobility && (
            <Alert description={errors.serviceMobility} />
          )}
        </FormField>
        <FormField label='일상 생활' required isMultiple={true}>
          <div className='w-full grid grid-cols-2 gap-4'>
            {renderButtons(
              careOptions.serviceDailyList,
              selectedDaily,
              setSelectedDaily,
              true,
              'serviceDaily',
            )}
          </div>
          {errors.serviceDaily && touched.serviceDaily && (
            <Alert description={errors.serviceDaily} />
          )}
        </FormField>
        <FormField label='치매 증상' required isMultiple={true}>
          <div className='w-full grid grid-cols-1 gap-4'>
            {renderButtons(
              careOptions.dementiaSymptomList,
              selectedDemen,
              setSelectedDemen,
              true,
              'dementiaSymptom',
            )}
          </div>
          {errors.dementiaSymptom && touched.dementiaSymptom && (
            <Alert description={errors.dementiaSymptom} />
          )}
        </FormField>

        <FormField label='배변 보조' required isMultiple={true}>
          <div className='w-full grid grid-cols-1 gap-4'>
            {renderButtons(
              careOptions.serviceToiletList,
              selectedToilet,
              setSelectedToilet,
              true,
              'serviceToilet',
            )}
          </div>
          {errors.serviceToilet && touched.serviceToilet && (
            <Alert description={errors.serviceToilet} />
          )}
        </FormField>

        <FormField label='복리후생' required>
          <div className='w-full grid grid-cols-2 gap-4'>
            {renderButtons(
              careOptions.welfareList,
              selectedWelfare,
              setSelectedWelfare,
              false,
              'welfare',
            )}
          </div>
          {errors.welfare && touched.welfare && <Alert description={errors.welfare} />}
        </FormField>

        <FormField label='근무종류' required>
          <div className='w-full grid grid-cols-2 gap-4'>
            {renderButtons(
              careOptions.workTypeList,
              selectedWorkType,
              setSelectedWorkType,
              false,
              'workType',
            )}
          </div>
          {errors.workType && touched.workType && <Alert description={errors.workType} />}
        </FormField>

        <FormField label='기타 요청 사항'>
          <textarea
            maxLength={300}
            placeholder='기타 작성 (최대 300자)'
            className={`border w-full rounded-md h-65 p-4 ${
              errors.requestContents && touched.requestContents ? 'border-red-500' : ''
            }`}
            value={requestContents}
            onChange={(e) => {
              const value = e.target.value;
              setRequestContents(value);
              onChangeValidate('requestContents', value);
            }}
            onBlur={() => onBlur('requestContents')}
            ref={(el) => (inputRefs.current.requestContents = el)}
          />
          <span className='w-full flex justify-end'>{`${requestContents.length}/300`}</span>
          {errors.requestContents && touched.requestContents && (
            <Alert description={errors.requestContents} />
          )}
        </FormField>

        <Button
          className='h-16 w-full bg-[var(--company-primary)] text-xl hover:bg-[var(--company-primary)]/90 font-bold'
          disabled={isSubmitting || isLoading || !isValid}
          onClick={() => {
            modify();
          }}
        >
          {isSubmitting ? '수정 중...' : '확인'}
        </Button>
      </div>
    </div>
  );
}
