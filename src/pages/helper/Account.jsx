// ✅ 1. 외부 라이브러리 (React 및 패키지)
import { useNavigate } from "react-router-dom";

// ✅ 2. 상태 관리 (스토어, 컨텍스트 등)
import { CARE_TYPES } from "@/store/suho/useCareTypeStore";
import useAccountStore from "@/store/suho/useAccountStore";

// ✅ 3. UI 컴포넌트 (공통 UI → 커스텀 컴포넌트 순)
import { TextAreaInput } from "@/components/ui/TextAreaInput";
import { Button } from "@/components/ui/custom/Button";
import { SectionTitle } from "@/components/ui/custom/SectionTitle";
import { Input } from "@/components/ui/custom/input";
import { Radio, RadioItem } from "@/components/ui/custom/multiRadio";

// ✅ 4. 레이아웃 컴포넌트 (Header, Footer 등)
import Header from "@/components/ui/temp/Header";
import Footer from "@/components/ui/temp/Footer";

// ✅ 5. 이미지 및 정적 파일
import location from "@/assets/images/location.png";
import overview from "@/assets/images/overview.png";
import backarrow from "@/assets/images/back-arrow.png";
import homecontrols from "@/assets/images/home-controls.png";

export default function Account() {
  const navigate = useNavigate();
  const profile = useAccountStore((state) => state.profile);

  const getCareTypeLabel = (category) => {
    if (category === "workTypes") {
      return (
        profile.careTypes?.workTypes
          ?.map(
            (type) => CARE_TYPES.workTypes.find((t) => t.id === type)?.label
          )
          .join(", ") || "미설정"
      );
    }
    const selected = CARE_TYPES[category]?.find(
      (item) => item.id === profile.careTypes?.[category]
    );
    return selected?.label || "미설정";
  };

  const handleEdit = () => {
    navigate("/helper/account/edit", {
      state: { from: "/helper/account" },
    });
  };

  //TODO (3) : 이미지 업로드 기능
  //TODO (1) : 시멘틱코드 의식할것.
  //TODO (1) : 프리티어 설정에서 tailwind 플러그인 도입할것것
  //TODO (1) : section이 중복되므로 컴포넌트로 만들어 중복된 코드 작성 회피 필요.
  return (
    <>
      <main className="max-w-md mx-auto flex flex-col justify-center gap-6 p-4">
        <Header title="나의 계정" />

        {/* 기본 정보 */}
        <section className="flex flex-col gap-6">
          {/* 프로필 이미지 */}
          <section className="flex items-center">
            <div className="flex flex-row justify-between items-center gap-12  h-auto pr-6 pl-6">
              <img
                src="/defaultProfile.png"
                alt="프로필 이미지"
                className="w-24 h-24 rounded-full "
              />
              <div className="flex flex-col justify-center gap-2 text-left">
                <span>{profile.name || "홍길동"}</span>

                <p>서울특별시 용산구 거주</p>
              </div>
            </div>
          </section>

          {/* 자기 소개 섹션 */}
          <section className="space-y-2">
            <div className="flex flex-col pr-6 pl-6 gap-2">
              <span className="text-left font-bold">자기소개</span>
              {/* 내용은 zustand에저장한 내용 가져올 것 */}
              <p className="border-1 rounded-xl text-left p-4">
                한 사람,한 사람의 필요에 맞춰 따뜻하고 세심한 돌봄을 제공하는
                요양사입니다
              </p>
            </div>
          </section>

          {/* 간병 경력 섹션 */}
          <section className="space-y-2">
            <div className="flex flex-col pr-6 pl-6 gap-2">
              <span className="text-left font-bold">간병경력</span>
              <p className="border-2 rounded-xl text-center p-3">신입</p>
            </div>
          </section>

          {/* 선호 지역 섹션 */}
          <section className="space-y-2 flex flex-col pr-6 pl-6 gap-2">
            <span className="text-left font-bold">선호지역</span>

            <p className="text-left flex flex-row items-center gap-3 p-3 border-2 rounded-xl">
              <img
                className="w-[24px] h-[24px] "
                src={location}
                alt="location_icon"
              />
              서울
              <img
                src={backarrow}
                alt="backarrow"
                className="w-4 h-4 rotate-180"
              />
              서울 전체
            </p>
          </section>

          {/* 나의 근무 가능 일정 섹션 */}
          {/* TODO : 피그마 아이콘 변경 */}
          <section className="space-y-2 flex flex-col pr-6 pl-6 gap-2">
            <span className="text-left font-bold">나의 근무 가능 일정</span>
            <p className="text-left flex flex-row items-center gap-3 p-3 border-2 rounded-xl">
              <img
                className="w-[24px] h-[24px] "
                src={location}
                alt="location_icon"
              />
              월, 화, 수
              <img
                src={backarrow}
                alt="backarrow"
                className="w-4 h-4 rotate-180"
              />
              13:00 ~ 20:00
            </p>
          </section>

          {/* 급여 섹션 */}
          <section className="space-y-2 flex flex-col pr-6 pl-6 gap-2">
            <span className="text-left font-bold">나의 희망급여</span>
            <p className="text-left flex flex-row items-center gap-4 border-2 rounded-xl p-3">
              <img
                className="w-[24px] h-[24px]"
                src={overview}
                alt="overview_icon"
              />
              <span>
                {profile.pay.type === "hourly"
                  ? "시급"
                  : profile.pay.type === "daily"
                  ? "일급"
                  : "주급"}
              </span>
              <img
                src={backarrow}
                alt="backarrow"
                className="w-4 h-4 rotate-180"
              />
              <span className="">{profile.pay.amount?.toLocaleString()}원</span>
            </p>
          </section>

          {/* 돌봄 유형 섹션*/}
          <section className="space-y-2 flex flex-col pr-6 pl-6 gap-2">
            <span className="text-left font-bold">나의 희망 돌봄유형</span>
            <p className="text-left flex flex-row items-center gap-4 border-2 rounded-xl p-3">
              <img
                className="w-[24px] h-[24px]"
                src={homecontrols}
                alt="homeControls_icon"
              />
              <span className="">{getCareTypeLabel("workTypes")}</span>
            </p>
          </section>

          {/* 자격증 등록 섹션*/}
          <section className="space-y-2 flex flex-col pr-6 pl-6 gap-2">
            <span className="text-left font-bold">나의 소지 자격증</span>
            <p className="text-left flex flex-row items-center gap-4 border-2 rounded-xl p-3">
              <span className="">요양보호사</span>
            </p>
          </section>
        </section>
        <Button
          variant="default"
          onClick={handleEdit}
          className="mt-6 mr-6 ml-6 "
        >
          수정하기
        </Button>
      </main>
      <Footer />
    </>
  );
}
