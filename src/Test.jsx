import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";

export default function Test() {
  return (
    <div className="max-w-md mx-auto flex flex-col items-center">
      <div className="flex items-center gap-12">
        {/* NavigationIcon을 프로필 이미지로 사용 */}
        <div className="w-12 h-12 rounded-full bg-gray-200 flex-shrink-0 flex items-center justify-center">
          <NavigationIcon className="w-8 h-8" />
        </div>

        {/* 텍스트 정보 */}
        <div className="flex flex-col">
          <p className="font-bold text-base">김수호</p>
          <p className="text-sm text-gray-600">서울특별시 은평구 거주</p>
        </div>
      </div>

      <Button className=" w-full mt-4 bg-[var(--helper-primary)] text-white hover:bg-[var(--helper-primary)]/90 ">
        프로필 수정
      </Button>

      <p>자기소개</p>
      <p className="text-gray-600">선택 (보호자에게 노출 됩니다.)</p>
      <Input 
      id="" 
      type="" 
      placeholder="예) 한 사람, 한 사람의 필요에 맞춰 따뜻하고 세심한 돌봄을 제공하는 요양사입니다."
      className="w-full rounded-lg pl-8"
      >
      </Input>

      <p>간병경력이 있으신가요?</p>
      <p className=" ">선택</p>
      <div className="flex flex-row gap-12">
        <Button>
          신입
        </Button>
        <Button>
          경력
        </Button>
      </div>

      <p>
        나의 강점을 선택해주세요.
      </p>
      <p>
        (최대 3개)
      </p>
      <p>
        보호자에게 노출되는 항목입니다.
      </p>

      <div className="grid  ">
        <Button>
          1
        </Button>
        <Button>
          1
        </Button>
        <Button>
          1
        </Button>

      </div>

      <div>
        <p>자격증 등록</p>
        <p>필수</p>
        <label htmlFor=""></label>
      </div>

      <Button>
        저장하기
      </Button>
      

    </div>
  );
}

function NavigationIcon(props) {
  return (
    <svg
      {...props}
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <path 
        d="M12 12C10.9 12 9.95833 11.6083 9.175 10.825C8.39167 10.0417 8 9.1 8 8C8 6.9 8.39167 5.95833 9.175 5.175C9.95833 4.39167 10.9 4 12 4C13.1 4 14.0417 4.39167 14.825 5.175C15.6083 5.95833 16 6.9 16 8C16 9.1 15.6083 10.0417 14.825 10.825C14.0417 11.6083 13.1 12 12 12ZM4 20V17.2C4 16.6333 4.14167 16.1167 4.425 15.65C4.725 15.1667 5.11667 14.8 5.6 14.55C6.63333 14.0333 7.68333 13.65 8.75 13.4C9.81667 13.1333 10.9 13 12 13C13.1 13 14.1833 13.1333 15.25 13.4C16.3167 13.65 17.3667 14.0333 18.4 14.55C18.8833 14.8 19.2667 15.1667 19.55 15.65C19.85 16.1167 20 16.6333 20 17.2V20H4ZM6 18H18V17.2C18 17.0167 17.95 16.85 17.85 16.7C17.7667 16.55 17.65 16.4333 17.5 16.35C16.6 15.9 15.6917 15.5667 14.775 15.35C13.8583 15.1167 12.9333 15 12 15C11.0667 15 10.1417 15.1167 9.225 15.35C8.30833 15.5667 7.4 15.9 6.5 16.35C6.35 16.4333 6.225 16.55 6.125 16.7C6.04167 16.85 6 17.0167 6 17.2V18ZM12 10C12.55 10 13.0167 9.80833 13.4 9.425C13.8 9.025 14 8.55 14 8C14 7.45 13.8 6.98333 13.4 6.6C13.0167 6.2 12.55 6 12 6C11.45 6 10.975 6.2 10.575 6.6C10.1917 6.98333 10 7.45 10 8C10 8.55 10.1917 9.025 10.575 9.425C10.975 9.80833 11.45 10 12 10Z" 
        fill="#4D4447"
      />
    </svg>
  );
}
