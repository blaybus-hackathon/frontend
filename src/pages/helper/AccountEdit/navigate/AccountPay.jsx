import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/custom/Button";
import { Input } from "@/components/ui/custom/input";
import Header from "@/components/ui/temp/Header";
import usePayStore from "@/store/suho/usePayStore";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectItem,
  SelectContent,
} from "@/components/ui/custom/select";

const PAY_TYPES = [
  { id: "hourly", label: "시급" },
  { id: "daily", label: "일급" },
  { id: "weekly", label: "주급" },
  { id: "monthly", label: "월급" },
];

export default function AccountPay() {
  const navigate = useNavigate();

  // store에서 직접 값과 함수 가져오기
  const { pay, setPay } = usePayStore();

  // 로컬 상태로 관리
  const [inputPay, setInputPay] = useState(pay.amount);
  const [selectedType, setSelectedType] = useState(pay.type || "hourly");

  // PayStore의 현재 값으로 초기화

  const handlePayChange = (e) => {
    const rawValue = e.target.value.replace(/[^\d]/g, "");
    setInputPay(rawValue);
  };

  const handleTypeChange = (type) => {
    setSelectedType(type);
  };

  const handleSave = () => {
    // PayStore만 업데이트
    setPay({
      amount: Number(inputPay),
      type: selectedType,
    });

    navigate("/helper/account/edit");
  };

  return (
    <main className="max-w-md mx-auto flex flex-col gap-6">
      <Header title="희망 급여 설정" />
      <section className="flex flex-col gap-8 p-4">
        <div className="flex flex-col items-start gap-2.5 self-stretch">
          <span className="helper-title">
            희망하시는 급여를 입력해 주세요.
            <span className="helper-title_sub">필수</span>
          </span>
        </div>

        <div className="w-full flex flex-row items-center gap-[10px]">
          <div className="w-[50%]">
            <Select value={selectedType} onValueChange={handleTypeChange}>
              <SelectTrigger className="w-full h-[65px] border-[#C8C8C8] border rounded-[10px] items-center justify-center px-8 py-5 flex gap-8 profile-section__content-text">
                <SelectValue placeholder="급여" />
              </SelectTrigger>
              <SelectContent>
                {PAY_TYPES.map(({ id, label }) => (
                  <SelectItem
                    key={id}
                    value={id}
                    className="text-[#191919] text-[20px] font-normal leading-none text-left"
                  >
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="profile-section__content-text flex-shrink-0">~</div>

          <div className="w-[50%]">
            <Input
              type="text"
              value={inputPay}
              onChange={handlePayChange}
              placeholder={`${
                PAY_TYPES.find((t) => t.id === selectedType)?.label
              }을 입력하세요`}
              className="h-[65px] flex items-center justify-center text-center profile-section__content-text border-[#C8C8C8] border rounded-[10px] px-8 py-5"
            />
          </div>
        </div>

        <Button onClick={handleSave} className="w-full" disabled={!inputPay}>
          저장하기
        </Button>
      </section>
    </main>
  );
}
