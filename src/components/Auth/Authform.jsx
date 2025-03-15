import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const AuthForm = ({ type, onSubmit, setLoginType }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = e.target.elements;
    onSubmit({
      email: email.value,
      password: password.value,
    });
  };

  return (
    <div className="w-full max-w-md bg-white rounded-lg  p-8">
      <h2 className="text-2xl font-bold text-center mb-6">돌봄 워크 Logo </h2>

      {/* 로그인 타입 선택 */}
      <div className="grid grid-cols-2 mb-6 gap-4">
        <Button
          onClick={() => setLoginType("company")}
          className={`font-medium  ${
            type === "company"
              ? " text-white bg-[#522E9A] hover:bg-[#522E9A]/90 "
              : "bg-[#F6F6F6] text-[#6C6C6C] hover:bg-[#F6F6F6]/90 "
          }`}
        >
          관리자용
        </Button>
        <Button
          onClick={() => setLoginType("helper")}
          className={`font-medium  ${
            type === "helper"
              ? " text-white bg-[#275280] hover:bg-[#275280]/90 "
              : "bg-[#F6F6F6] text-[#6C6C6C] hover:bg-[#F6F6F6]/90 "
          }`}
        >
          요양보호사용
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <div className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground">
            <NavigationIcon className="h-4 w-4" />
          </div>
          <Input
            id="email"
            type="email"
            placeholder="아이디를 입력해주세요. "
            className="w-full rounded-lg bg-background pl-8"
          />
        </div>

        <div className="relative">
          <div className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground">
            <HomeControlsIcon className="h-4 w-4" />
          </div>
          <Input
            id="password"
            type="password"
            placeholder="비밀번호를 입력해주세요. "
            className="w-full rounded-lg bg-background pl-8"
          />
        </div>

        <div>
          {/* 아이디 - 비밀번호 찾기 추가 필요. */}
          <Link className="block text-[#6C6C6C] text-right cursor-pointer hover:underline">
            아이디 비밀번호 찾기
          </Link>
        </div>
        <Button
          type="submit"
          className={`w-full ${
            type === "helper"
              ? "bg-[#275280] hover:bg-[#275280]/90"
              : "bg-[#522E9A] hover:bg-[#522E9A]/90"
          } text-white`}
        >
          로그인
        </Button>
      </form>

      <Button
        className={`mt-2 w-full bg-white hover:bg-white/90 rounded-xs border-1 border-[#522E9A]
        } text-[#522E9A]`}
      >
        돌봄워크 회원가입
      </Button>

      {/* 아이콘 추가 Label로 수정 필요. */}
      <Button
        type="submit"
        className={`mt-2 w-full bg-[#FEE500] hover:bg-[#FEE500]/90 rounded-xs 
        } text-black`}
      >
        카카오 로그인
      </Button>
    </div>
  );
};

AuthForm.propTypes = {
  type: PropTypes.oneOf(["helper", "company"]).isRequired,
  onSubmit: PropTypes.func.isRequired,
  setLoginType: PropTypes.func.isRequired,
};

function NavigationIcon(prop) {
  return (
    <svg
      {...prop}
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

function HomeControlsIcon(prop) {
  return (
    <svg
      {...prop}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6 8H15V6C15 5.16667 14.7083 4.45833 14.125 3.875C13.5417 3.29167 12.8333 3 12 3C11.1667 3 10.4583 3.29167 9.875 3.875C9.29167 4.45833 9 5.16667 9 6H7C7 4.61667 7.48333 3.44167 8.45 2.475C9.43333 1.49167 10.6167 1 12 1C13.3833 1 14.5583 1.49167 15.525 2.475C16.5083 3.44167 17 4.61667 17 6V8H18C18.55 8 19.0167 8.2 19.4 8.6C19.8 8.98333 20 9.45 20 10V20C20 20.55 19.8 21.025 19.4 21.425C19.0167 21.8083 18.55 22 18 22H6C5.45 22 4.975 21.8083 4.575 21.425C4.19167 21.025 4 20.55 4 20V10C4 9.45 4.19167 8.98333 4.575 8.6C4.975 8.2 5.45 8 6 8ZM6 20H18V10H6V20ZM12 17C12.55 17 13.0167 16.8083 13.4 16.425C13.8 16.025 14 15.55 14 15C14 14.45 13.8 13.9833 13.4 13.6C13.0167 13.2 12.55 13 12 13C11.45 13 10.975 13.2 10.575 13.6C10.1917 13.9833 10 14.45 10 15C10 15.55 10.1917 16.025 10.575 16.425C10.975 16.8083 11.45 17 12 17ZM6 20V10V20Z"
        fill="#3F4946"
      />
    </svg>
  );
}

export default AuthForm;
