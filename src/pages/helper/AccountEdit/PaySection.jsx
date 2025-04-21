import React from "react";
import { useNavigate } from "react-router-dom";
import backarrow from "@/assets/images/back-arrow.png";
import overview from "@/assets/images/overview.png";

const PAY_TYPES = [
  { id: "hourly", label: "시급" },
  { id: "daily", label: "일급" },
  { id: "weekly", label: "주급" },
  { id: "monthly", label: "월급" },
];

function PaySection({ pay }) {
  const navigate = useNavigate();

  return (
    <section
      className="helper-section hover:cursor-pointer"
      onClick={() => navigate("/helper/account/pay")}
    >
      <span className="helper-title">나의 희망급여</span>
      <span className="helper-subtitle">나의 희망급여를 설정해 보세요!</span>

      <p className="profile-section__content-box">
        <img className="w-[24px] h-[24px]" src={overview} alt="overview_icon" />
        <span className="profile-section__content-text">
          {PAY_TYPES.find((t) => t.id === pay.type)?.label || ""}
        </span>
        <img src={backarrow} alt="backarrow" className="w-4 h-4 rotate-180" />
        <span className="profile-section__content-text">{pay.amount}원</span>
      </p>
    </section>
  );
}

export default PaySection;
