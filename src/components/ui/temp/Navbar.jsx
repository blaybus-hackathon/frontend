import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import useProfileStore from "@/store/useProfileStore";

export default function Component() {
  const navigate = useNavigate();
  const { profile, clearProfile } = useProfileStore();
  console.log(profile);
  return (
    <nav className="fixed inset-x-0 top-0 z-50 bg-black shadow-sm ">
      <div className="w-full max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-20 items-center px-6">
          <div className="flex items-center">
            <a href="/" className="text-3xl font-bold text-white">
              로고
            </a>
          </div>
          <nav className="hidden md:flex gap-6 flex-1 justify-center mx-8">
            <Button
              href="#"
              size="lg"
              className="font-medium flex items-center text-sm transition-colors hover:underline"
            >
              무언가 하는 페이지
            </Button>
            <Button
              href="#"
              size="lg"
              className="font-medium flex items-center text-sm transition-colors hover:underline"
            >
              무언가 하는 페이지
            </Button>
            <Button
              href="#"
              size="lg"
              className="font-medium flex items-center text-sm transition-colors hover:underline"
            >
              무언가 하는 페이지
            </Button>
            <Button
              href="#"
              size="lg"
              className="font-medium flex items-center text-sm transition-colors hover:underline"
            >
              무언가 하는 페이지
            </Button>
          </nav>
          <div>
            {profile && profile.email !== "" ? (
              <Button
                onClick={() => {
                  clearProfile();
                  navigate("/signIn");
                }}
              >
                로그아웃
              </Button>
            ) : (
              <Button onClick={() => navigate("/signIn")}>로그인</Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
