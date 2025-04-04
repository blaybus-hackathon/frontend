import { useNavigate } from "react-router-dom";

export default function PayInfoSection({ pay }) {
  const navigate = useNavigate();

  return (
    <section
      className="space-y-2 flex flex-col gap-2 hover:cursor-pointer"
      onClick={() => navigate("/helper/account/pay")}
    >
      <span className="text-left font-bold">나의 희망급여</span>
      <span className="text-left">나의 희망급여를 설정해 보세요!</span>
      <p className="text-left flex flex-row items-center gap-4 border-2 rounded-xl p-3">
        {/* 필요한 이미지 경로를 실제 경로로 변경하세요 */}
        <img
          className="w-[24px] h-[24px]"
          src="/overview.png"
          alt="overview_icon"
        />
        <span>
          {pay?.type === "hourly"
            ? "시급"
            : pay?.type === "daily"
            ? "일급"
            : pay?.type === "weekly"
            ? "주급"
            : "급여"}
        </span>
        {/* 필요한 이미지 경로를 실제 경로로 변경하세요 */}
        <img
          src="/backarrow.png"
          alt="backarrow"
          className="w-4 h-4 rotate-180"
        />
        <span className="">{pay?.amount?.toLocaleString()}원</span>
      </p>
    </section>
  );
}
