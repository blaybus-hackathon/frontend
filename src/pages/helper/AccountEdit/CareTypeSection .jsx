import { useNavigate } from "react-router-dom";
import homecontrols from "@/assets/images/home-controls.png";
import useProfileStore from "@/store/useProfileStore";

const CareTypeSection = () => {
  const navigate = useNavigate();
  const { profileEdit } = useProfileStore(); // Zustand store에서 데이터 가져오기
  const careTypeData = profileEdit.careTypes;

  return (
    <section
      className=" helper-section hover:cursor-pointer"
      onClick={() => navigate("/helper/account/care-type")}
    >
      <div className="flex flex-col items-start gap-2.5 self-stretch">
        <span className="helper-title">나의 희망 돌봄유형</span>
        <span className="helper-subtitle ">
          내가 자신있는 돌봄 유형을 설정해 보세요!
        </span>
      </div>

      <div className="profile-section__content-box">
        <img
          className="w-[24px] h-[24px]"
          src={homecontrols}
          alt="homeControls_icon"
        />
        <span className="profile-section__content-text">
          {careTypeData.workTypes.length > 0
            ? careTypeData.workTypes.map((item) => item.label).join(", ")
            : "설정되지 않음"}
        </span>
      </div>
    </section>
  );
};

export default CareTypeSection;
