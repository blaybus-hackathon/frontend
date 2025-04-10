import { create } from 'zustand';

const elderRegiDummy = create((set) => ({
  workTypeList: [
    {
      id: 2,
      topCareId: 1,
      careName: '방문요양',
      careVal: 1,
    },
    {
      id: 3,
      topCareId: 1,
      careName: '입주요양',
      careVal: 2,
    },
    {
      id: 4,
      topCareId: 1,
      careName: '방문목욕',
      careVal: 4,
    },
    {
      id: 5,
      topCareId: 1,
      careName: '주야간보호',
      careVal: 8,
    },
    {
      id: 6,
      topCareId: 1,
      careName: '요양원',
      careVal: 16,
    },
    {
      id: 7,
      topCareId: 1,
      careName: ' 병원',
      careVal: 32,
    },
    {
      id: 8,
      topCareId: 1,
      careName: '병원동행',
      careVal: 64,
    },
  ],
  welfareList: [
    {
      id: 10,
      topCareId: 9,
      careName: '4대보험',
      careVal: 1,
    },
    {
      id: 11,
      topCareId: 9,
      careName: '퇴직급여',
      careVal: 2,
    },
    {
      id: 12,
      topCareId: 9,
      careName: '명절선물',
      careVal: 4,
    },
    {
      id: 13,
      topCareId: 9,
      careName: '장기근속 장려금',
      careVal: 8,
    },
    {
      id: 14,
      topCareId: 9,
      careName: '중증가산수당',
      careVal: 16,
    },
    {
      id: 15,
      topCareId: 9,
      careName: '교통비 지원',
      careVal: 32,
    },
    {
      id: 16,
      topCareId: 9,
      careName: '경조사비',
      careVal: 64,
    },
    {
      id: 17,
      topCareId: 9,
      careName: '식사(비) 지원',
      careVal: 128,
    },
    {
      id: 18,
      topCareId: 9,
      careName: '정부지원금',
      careVal: 256,
    },
    {
      id: 19,
      topCareId: 9,
      careName: '운전 수당',
      careVal: 512,
    },
  ],
  careLevelList: [
    {
      id: 21,
      topCareId: 20,
      careName: '등급없음',
      careVal: 1,
    },
    {
      id: 22,
      topCareId: 20,
      careName: '1등급',
      careVal: 2,
    },
    {
      id: 23,
      topCareId: 20,
      careName: '2등급',
      careVal: 4,
    },
    {
      id: 24,
      topCareId: 20,
      careName: '3등급',
      careVal: 8,
    },
    {
      id: 25,
      topCareId: 20,
      careName: '4등급',
      careVal: 16,
    },
    {
      id: 26,
      topCareId: 20,
      careName: '5등급',
      careVal: 32,
    },
    {
      id: 27,
      topCareId: 20,
      careName: '인지지원 등급',
      careVal: 64,
    },
  ],
  dementiaSymptomList: [
    {
      id: 29,
      topCareId: 28,
      careName: '정상 (치매 증상 없음)',
      careVal: 1,
    },
    {
      id: 30,
      topCareId: 28,
      careName: '했던 말을 반복하는 등 단기 기억 장애',
      careVal: 2,
    },
    {
      id: 31,
      topCareId: 28,
      careName: '길을 잃거나 자주 가던 곳을 헤맴',
      careVal: 4,
    },
    {
      id: 32,
      topCareId: 28,
      careName: '어린아이 같은 행동',
      careVal: 8,
    },
    {
      id: 33,
      topCareId: 28,
      careName: '집 밖을 배회',
      careVal: 16,
    },
    {
      id: 34,
      topCareId: 28,
      careName: '가족을 알아보지 못함',
      careVal: 32,
    },
    {
      id: 35,
      topCareId: 28,
      careName: '사람을 의심하는 망상',
      careVal: 64,
    },
    {
      id: 36,
      topCareId: 28,
      careName: '때리거나 욕설 등 공격적인 행동',
      careVal: 128,
    },
  ],
  inmateStateList: [
    {
      id: 38,
      topCareId: 37,
      careName: '독거',
      careVal: 1,
    },
    {
      id: 39,
      topCareId: 37,
      careName: '배우자와 동거, 돌봄 시간 중 집에 있음',
      careVal: 2,
    },
    {
      id: 40,
      topCareId: 37,
      careName: '배우자와 동거, 돌봄 시간 중 자리 비움',
      careVal: 4,
    },
    {
      id: 41,
      topCareId: 37,
      careName: '다른 가족과 동거, 돌봄 시간 중 집에 있음',
      careVal: 8,
    },
    {
      id: 42,
      topCareId: 37,
      careName: '다른 가족과 동거, 돌봄 시간 중 자리 비움',
      careVal: 16,
    },
  ],
  serviceMealList: [
    {
      id: 45,
      topCareId: 44,
      careName: '스스로 식사 가능',
      careVal: 1,
    },
    {
      id: 46,
      topCareId: 44,
      careName: '식사 차려드리기',
      careVal: 2,
    },
    {
      id: 47,
      topCareId: 44,
      careName: '죽, 반찬 등 요리 필요',
      careVal: 4,
    },
    {
      id: 48,
      topCareId: 44,
      careName: '경관식 보조',
      careVal: 8,
    },
  ],
  serviceToiletList: [
    {
      id: 50,
      topCareId: 49,
      careName: '스스로 배변 가능',
      careVal: 1,
    },
    {
      id: 51,
      topCareId: 49,
      careName: '가끔 대소변 실수 시 도움',
      careVal: 2,
    },
    {
      id: 52,
      topCareId: 49,
      careName: '기저귀 케어 필요',
      careVal: 4,
    },
    {
      id: 53,
      topCareId: 49,
      careName: '유치도뇨/방광루/장루 관리',
      careVal: 8,
    },
  ],
  serviceMobilityList: [
    {
      id: 55,
      topCareId: 54,
      careName: '스스로 거동 가능',
      careVal: 1,
    },
    {
      id: 56,
      topCareId: 54,
      careName: '이동시 부축 도움',
      careVal: 2,
    },
    {
      id: 57,
      topCareId: 54,
      careName: '휠체어 이동 보조',
      careVal: 4,
    },
    {
      id: 58,
      topCareId: 54,
      careName: '거동 불가',
      careVal: 8,
    },
  ],
  serviceDailyList: [
    {
      id: 60,
      topCareId: 59,
      careName: '청소,빨래 보조',
      careVal: 1,
    },
    {
      id: 61,
      topCareId: 59,
      careName: '목욕 보조',
      careVal: 2,
    },
    {
      id: 62,
      topCareId: 59,
      careName: '병원 동행',
      careVal: 4,
    },
    {
      id: 63,
      topCareId: 59,
      careName: '산책, 간단한 운동',
      careVal: 8,
    },
    {
      id: 64,
      topCareId: 59,
      careName: '말벗 등 정서지원',
      careVal: 16,
    },
    {
      id: 65,
      topCareId: 59,
      careName: '인지자극 활동',
      careVal: 32,
    },
  ],
  gender: [
    {
      id: 67,
      topCareId: 66,
      careName: '남성',
      careVal: 1,
    },
    {
      id: 68,
      topCareId: 66,
      careName: '여성',
      careVal: 2,
    },
  ],
  setElderCareData: (data) => set(data),
}));

export default elderRegiDummy;
