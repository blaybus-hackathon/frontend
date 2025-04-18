import React from "react";
import { useNavigate } from "react-router-dom";
import backarrow from "@/assets/images/back-arrow.png";
import overview from "@/assets/images/overview.png";

const PAY_TYPES = [
    { id: 'hourly', label: '시급' },
    { id: 'daily', label: '일급' },
    { id: 'weekly', label: '주급' },
    { id: 'monthly', label: '월급' },
  ];

function PaySection({pay}) {
    const navigate = useNavigate();
  

    return (
      <section
        className="space-y-2 flex flex-col gap-2 hover:cursor-pointer"
        onClick={() => navigate("/helper/account/pay")}
      >
        <span className="text-left font-bold">나의 희망급여</span>
        <span className="text-left">나의 희망급여를 설정해 보세요!</span>
        <p className="text-left flex flex-row items-center gap-4 border-2 rounded-xl p-3">
          <img className="w-[24px] h-[24px]" src={overview} alt="overview_icon" />
          {PAY_TYPES.find((t) => t.id === pay.type)?.label || '알 수 없음'}
          <img src={backarrow} alt="backarrow" className="w-4 h-4 rotate-180" />
          <span>{pay.amount}원</span>
        </p>
      </section>
    );
  }
  
  export default PaySection;