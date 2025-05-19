import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import useAuthStore from "@/store/suho/useAuthStore";
import axios from "axios";

// 자격증 타입 상수
const CERTIFICATE_TYPES = {
  ESSENTIAL: "essential",
  CARE: "care",
  NURSE: "nurse",
  POSTPARTUM: "postPartum",
  OTHER: "other",
};

// 자격증 기본 데이터
const INITIAL_CERT_DATA = {
  [CERTIFICATE_TYPES.ESSENTIAL]: {
    certName: "요양보호사 자격증",
    certNum: "",
    certDateIssue: "",
    certSerialNum: "1001",
  },
  [CERTIFICATE_TYPES.CARE]: {
    certName: "간병사 자격증",
    certNum: "",
    certDateIssue: "",
    certSerialNum: "1002",
  },
  [CERTIFICATE_TYPES.NURSE]: {
    certName: "병원 동행 매니저 자격증",
    certNum: "",
    certDateIssue: "",
    certSerialNum: "1003",
  },
  [CERTIFICATE_TYPES.POSTPARTUM]: {
    certName: "산후 관리사 자격증",
    certNum: "",
    certDateIssue: "",
    certSerialNum: "1004",
  },
  [CERTIFICATE_TYPES.OTHER]: {
    certName: "기타 자격증",
    certNum: "",
    certDateIssue: "",
    certSerialNum: "",
  },
};

export default function ThirdStep({ onPrev }) {
  const navigate = useNavigate();
  const {
    email,
    password,
    name,
    phone,
    addressDetail,
    carOwnYn,
    eduYn,
    setPassword,
    setName,
    setPhone,
    setAddressDetail,
    setCarOwnYn,
    setEduYn,
    clearAll,
  } = useAuthStore();

  // 자격증 토글 상태
  const [certToggles, setCertToggles] = useState({
    [CERTIFICATE_TYPES.ESSENTIAL]: false,
    [CERTIFICATE_TYPES.CARE]: false,
    [CERTIFICATE_TYPES.NURSE]: false,
    [CERTIFICATE_TYPES.POSTPARTUM]: false,
    [CERTIFICATE_TYPES.OTHER]: false,
  });

  // 자격증 데이터 상태
  const [certData, setCertData] = useState(INITIAL_CERT_DATA);

  // 자격증 데이터 변경 핸들러
  const handleCertDataChange = (certType, field, value) => {
    setCertData((prev) => ({
      ...prev,
      [certType]: {
        ...prev[certType],
        [field]: value,
      },
    }));
  };

  // 자격증 토글 핸들러
  const toggleCert = (certType) => {
    setCertToggles((prev) => {
      const newValue = !prev[certType];

      if (!newValue) {
        // 토글이 꺼질 때 데이터 초기화
        setCertData((prevData) => ({
          ...prevData,
          [certType]: {
            ...INITIAL_CERT_DATA[certType],
          },
        }));
      }

      return {
        ...prev,
        [certType]: newValue,
      };
    });
  };

  // 자격증 유효성 검사
  const isLicenseValid = () => {
    const isCertValid = (certData) =>
      certData.certNum && certData.certDateIssue && certData.certSerialNum;

    return Object.entries(certToggles).some(
      ([type, isEnabled]) => isEnabled && isCertValid(certData[type])
    );
  };

  // 회원가입 데이터 생성
  const createSignUpData = () => {
    const createCertData = (type) => {
      if (!certToggles[type]) return null;

      const data = certData[type];
      return {
        certName: data.certName,
        certNum: data.certNum,
        certDateIssue: parseInt(data.certDateIssue),
        certSerialNum: parseInt(data.certSerialNum),
      };
    };

    return {
      email,
      password,
      roleType: "MEMBER",
      name,
      phone,
      addressDetail,
      profilepic: 1,
      carOwnYn,
      eduYn,
      essentialCertNo: createCertData(CERTIFICATE_TYPES.ESSENTIAL),
      careCertNo: createCertData(CERTIFICATE_TYPES.CARE),
      nurseCertNo: createCertData(CERTIFICATE_TYPES.NURSE),
      postPartumCertNo: createCertData(CERTIFICATE_TYPES.POSTPARTUM),
      helperOtherCerts: createCertData(CERTIFICATE_TYPES.OTHER),
    };
  };

  // 회원가입 처리
  const handleSignUp = async () => {
    try {
      const signUpData = createSignUpData();
      const response = await axios.post(
        "http://localhost:8080/api/sign/up/helper",
        signUpData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.status === 200) {
        console.log("회원가입 성공:", response.data);
        clearAll();
        navigate("/");
      }
    } catch (error) {
      console.error("회원가입 실패:", error);
      alert("회원가입 중 오류가 발생했습니다.");
    }
  };

  const handleTest = () => {
    const signUpData = createSignUpData();
    console.log(signUpData);
  };

  // 자격증 입력 필드 렌더링
  const renderCertInputFields = (type) => {
    if (!certToggles[type]) return null;

    return (
      <div className="flex flex-col gap-2 pl-6">
        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-600">자격증 번호</label>
          <Input
            type="text"
            placeholder="자격증 번호를 입력하세요"
            value={certData[type].certNum}
            onChange={(e) =>
              handleCertDataChange(type, "certNum", e.target.value)
            }
            className="w-full"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-600">발급일자</label>
          <Input
            type="text"
            placeholder="YYYYMMDD 형식으로 입력하세요"
            value={certData[type].certDateIssue}
            onChange={(e) =>
              handleCertDataChange(type, "certDateIssue", e.target.value)
            }
            className="w-full"
          />
        </div>
        {type === CERTIFICATE_TYPES.OTHER && (
          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-600">일련번호</label>
            <Input
              type="text"
              placeholder="일련번호를 입력하세요"
              value={certData[type].certSerialNum}
              onChange={(e) =>
                handleCertDataChange(type, "certSerialNum", e.target.value)
              }
              className="w-full"
            />
          </div>
        )}
      </div>
    );
  };

  // 자격증 섹션 렌더링
  const renderCertSection = (type, label) => (
    <div className="flex flex-col gap-2 border rounded-lg p-4">
      <Button
        className="flex items-center gap-2 bg-white hover:bg-white text-black border border-gray-300"
        onClick={() => toggleCert(type)}
      >
        <svg
          width="29"
          height="29"
          viewBox="0 0 29 29"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            width="29"
            height="29"
            rx="14.5"
            fill={certToggles[type] ? "var(--helper-primary)" : "#B6B6B6"}
          />
          <path
            d="M8.39775 15.7273C8.17808 15.5076 7.82192 15.5076 7.60225 15.7273C7.38258 15.9469 7.38258 16.303 7.60225 16.5227L10.9773 19.8977C11.1969 20.1174 11.5531 20.1174 11.7727 19.8977L20.0227 11.6477C20.2424 11.4281 20.2424 11.0719 20.0227 10.8523C19.803 10.6326 19.4469 10.6326 19.2273 10.8523L11.375 18.7045L8.39775 15.7273Z"
            fill="white"
          />
        </svg>
        {label}
      </Button>
      {renderCertInputFields(type)}
    </div>
  );

  return (
    <main className="flex flex-col gap-1 max-w-2xl mx-auto">
      <p className="text-left font-bold">
        회원가입을 위해
        <br />
        개인정보를 입력해주세요!
      </p>

      {/* 기본 정보 입력 필드들 */}
      <div className="flex items-center gap-2 mt-6">
        <span className="font-bold">이메일</span>
      </div>
      <Input value={email} readOnly className="h-12 bg-gray-100" />

      {/* 비밀번호 */}
      <div className="flex items-center gap-2 mt-4">
        <span className="font-bold">비밀번호</span>
        <span className="text-sm text-red-500">필수</span>
      </div>
      <Input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="비밀번호를 입력해주세요."
        className="h-12"
      />

      {/* 이름 */}
      <div className="flex items-center gap-2 mt-4">
        <span className="font-bold">이름</span>
        <span className="text-sm text-red-500">필수</span>
      </div>
      <Input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="예) 홍길동"
        className="h-12"
      />

      {/* 전화번호 */}
      <div className="flex items-center gap-2 mt-4">
        <span className="font-bold">전화번호</span>
        <span className="text-sm text-red-500">필수</span>
      </div>
      <Input
        type="text"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder="예) 010-0000-0000"
        className="h-12"
      />

      {/* 주소 */}
      <div className="flex items-center gap-2 mt-4">
        <span className="font-bold">주소</span>
        <span className="text-sm text-red-500">필수</span>
      </div>
      <Input
        type="text"
        value={addressDetail}
        onChange={(e) => setAddressDetail(e.target.value)}
        placeholder="예) 서울특별시 강남구 테헤란로 14길 6 남도빌딩 3층"
        className="h-12"
      />

      {/* 차량소유여부 */}
      <div className="flex items-center gap-2 mt-4">
        <span className="font-bold">차량소유여부</span>
        <span className="text-sm text-red-500">필수</span>
      </div>
      <div className="flex gap-6 items-center justify-center">
        <Button
          className="flex gap-2 bg-white hover:bg-white text-black border border-gray-300"
          onClick={() => setCarOwnYn(true)}
        >
          <svg
            width="29"
            height="29"
            viewBox="0 0 29 29"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              width="29"
              height="29"
              rx="14.5"
              fill={carOwnYn === true ? "var(--helper-primary)" : "#B6B6B6"}
            />
            <path
              d="M8.39775 15.7273C8.17808 15.5076 7.82192 15.5076 7.60225 15.7273C7.38258 15.9469 7.38258 16.303 7.60225 16.5227L10.9773 19.8977C11.1969 20.1174 11.5531 20.1174 11.7727 19.8977L20.0227 11.6477C20.2424 11.4281 20.2424 11.0719 20.0227 10.8523C19.803 10.6326 19.4469 10.6326 19.2273 10.8523L11.375 18.7045L8.39775 15.7273Z"
              fill="white"
            />
          </svg>
          예
        </Button>
        <Button
          className="flex gap-2 bg-white hover:bg-white text-black border border-gray-300"
          onClick={() => setCarOwnYn(false)}
        >
          <svg
            width="29"
            height="29"
            viewBox="0 0 29 29"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              width="29"
              height="29"
              rx="14.5"
              fill={carOwnYn === false ? "var(--helper-primary)" : "#B6B6B6"}
            />
            <path
              d="M8.39775 15.7273C8.17808 15.5076 7.82192 15.5076 7.60225 15.7273C7.38258 15.9469 7.38258 16.303 7.60225 16.5227L10.9773 19.8977C11.1969 20.1174 11.5531 20.1174 11.7727 19.8977L20.0227 11.6477C20.2424 11.4281 20.2424 11.0719 20.0227 10.8523C19.803 10.6326 19.4469 10.6326 19.2273 10.8523L11.375 18.7045L8.39775 15.7273Z"
              fill="white"
            />
          </svg>
          아니요
        </Button>
      </div>

      {/* 치매교육 이수 여부 */}
      <div className="flex items-center gap-2 mt-4">
        <span className="font-bold">치매교육 이수 여부</span>
        <span className="text-sm text-red-500">필수</span>
      </div>
      <div className="flex gap-6 justify-center">
        <Button
          className="flex gap-2 bg-white hover:bg-white text-black border border-gray-300"
          onClick={() => setEduYn(true)}
        >
          <svg
            width="29"
            height="29"
            viewBox="0 0 29 29"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              width="29"
              height="29"
              rx="14.5"
              fill={eduYn === true ? "var(--helper-primary)" : "#B6B6B6"}
            />
            <path
              d="M8.39775 15.7273C8.17808 15.5076 7.82192 15.5076 7.60225 15.7273C7.38258 15.9469 7.38258 16.303 7.60225 16.5227L10.9773 19.8977C11.1969 20.1174 11.5531 20.1174 11.7727 19.8977L20.0227 11.6477C20.2424 11.4281 20.2424 11.0719 20.0227 10.8523C19.803 10.6326 19.4469 10.6326 19.2273 10.8523L11.375 18.7045L8.39775 15.7273Z"
              fill="white"
            />
          </svg>
          예
        </Button>
        <Button
          className="flex items-center gap-2 bg-white hover:bg-white text-black border border-gray-300"
          onClick={() => setEduYn(false)}
        >
          <svg
            width="29"
            height="29"
            viewBox="0 0 29 29"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              width="29"
              height="29"
              rx="14.5"
              fill={eduYn === false ? "var(--helper-primary)" : "#B6B6B6"}
            />
            <path
              d="M8.39775 15.7273C8.17808 15.5076 7.82192 15.5076 7.60225 15.7273C7.38258 15.9469 7.38258 16.303 7.60225 16.5227L10.9773 19.8977C11.1969 20.1174 11.5531 20.1174 11.7727 19.8977L20.0227 11.6477C20.2424 11.4281 20.2424 11.0719 20.0227 10.8523C19.803 10.6326 19.4469 10.6326 19.2273 10.8523L11.375 18.7045L8.39775 15.7273Z"
              fill="white"
            />
          </svg>
          아니요
        </Button>
      </div>

      {/* 자격증 등록 섹션 */}
      <div className="flex items-center gap-2 mt-4">
        <span className="font-bold">자격증 등록</span>
        <span className="text-sm text-red-500">필수</span>
      </div>

      <div className="flex flex-col gap-3">
        {renderCertSection(CERTIFICATE_TYPES.ESSENTIAL, "요양보호사")}
        {renderCertSection(CERTIFICATE_TYPES.CARE, "간병사")}
        {renderCertSection(CERTIFICATE_TYPES.NURSE, "병원동행매니저")}
        {renderCertSection(CERTIFICATE_TYPES.POSTPARTUM, "산후관리사")}
        {renderCertSection(CERTIFICATE_TYPES.OTHER, "기타 자격증")}
      </div>

      {/* 버튼 영역 */}
      <div className="flex justify-between mt-4">
        <Button
          onClick={onPrev}
          className="bg-[var(--helper-primary)] hover:bg-[var(--helper-primary)]/90 text-white"
        >
          이전
        </Button>

        <Button
          className="bg-[var(--helper-primary)] hover:bg-[var(--helper-primary)]/90 text-white"
          onClick={handleSignUp}
          disabled={
            !password ||
            !name ||
            !phone ||
            !addressDetail ||
            carOwnYn === null ||
            eduYn === null ||
            !isLicenseValid()
          }
        >
          가입하기
        </Button>
        <Button onClick={handleTest}></Button>
      </div>
    </main>
  );
}
