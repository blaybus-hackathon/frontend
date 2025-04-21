import React from "react";
import useProfileStore from "@/store/useProfileStore";

function BaseSection() {
  const { profileEdit, updateProfileField } = useProfileStore();
  return (
    <section className="flex items-center gap-12 ">
      <div className="relative w-24 h-24">
        <img
          src={profileEdit?.profileImage || "/defaultProfile.png"} // Zustand 상태 사용
          alt="profile_image"
          className="w-24 h-24 rounded-full bg-[#DCDCDC]"
        />
        <input
          type="file"
          accept="image/*"
          className="hidden"
          id="profile-image"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              const imageUrl = URL.createObjectURL(file);
              updateProfileField("profileImage", imageUrl);
            }
          }}
        />
        <label
          htmlFor="profile-image"
          className="absolute bottom-0 right-0 bg-primary text-white p-1 rounded-full cursor-pointer hover:bg-primary/90"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
          </svg>
        </label>
      </div>
      <div className="flex flex-col gap-5 items-start">
        {/* <span>{profileEdit.name || "홍길동"}</span> */}
        <span className="text-[#191919] text-[23px] font-bold leading-none h-auto ">
          홍길동
        </span>
        {/* <span>{profileEdit.address || "서울특별시 용산구 거주"}</span> */}
        <span className="text-[#191919] font-pretendard text-[20px] font-medium leading-none ">
          서울특별시 용산구 거주
        </span>
      </div>
    </section>
  );
}

export default BaseSection;
