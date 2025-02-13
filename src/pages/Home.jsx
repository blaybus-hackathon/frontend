import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button"


export default function Home() {
  const navigate = useNavigate();
  const handleButtonClick = () => {
    navigate("/test");
  };
  return (
    <>

      <div>Home</div>
      <button
        onClick={handleButtonClick}
        className="mt-4 p-2 bg-blue-500 text-white rounded"
      >
        go to Test
      </button>

      <Button>button Test</Button>
    </>
  );
}
