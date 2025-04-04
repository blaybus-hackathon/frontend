import { useNavigate } from "react-router-dom";
import homecontrols from "@/assets/images/home-controls.png";
import useProfileStore from "@/store/useProfileStore";

const CareTypeSection = () => {
  const navigate = useNavigate();
  const { profileEdit } = useProfileStore(); // Zustand store에서 데이터 가져오기
  const careTypeData = profileEdit.careTypes;
  // console.log(careTypeData);

  return (
    <section
      className="space-y-2 flex flex-col gap-2 hover:cursor-pointer"
      onClick={() => navigate("/helper/account/care-type")}
    >
      <span className="text-left font-bold">나의 희망 돌봄유형</span>
      <span className="text-left">
        내가 자신있는 돌봄 유형을 설정해 보세요!
      </span>
      <p className="text-left flex flex-row items-center gap-4 border-2 rounded-xl p-3">
        <img
          className="w-[24px] h-[24px]"
          src={homecontrols}
          alt="homeControls_icon"
        />
        <span>
          {careTypeData.workTypes.length > 0
            ? careTypeData.workTypes
                .map((item) => item.label) // value 값을 바로 사용
                .join(", ")
            : "설정되지 않음"}
        </span>
      </p>
    </section>
  );
};

export default CareTypeSection;
