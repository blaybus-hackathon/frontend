import React from "react";
import useProfileStore from "@/store/useProfileStore";

function BaseSection() {
  const { profileEdit, updateProfileField } = useProfileStore();
  return (
    <section className="flex flex-row justify-between items-center gap-12 h-auto pr-6 pl-6 relative">
      <div className="relative">
        <img
          src={profileEdit?.profileImage || "/defaultProfile.png"} // Zustand 상태 사용
          alt="profile_image"
          className="w-24 h-24 rounded-full "
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
      <div className="flex flex-col justify-center gap-2 text-left">
        {/* <span>{profileEdit.name || "홍길동"}</span> */}
        <span>{"홍길동"}</span>
        {/* <span>{profileEdit.address || "서울특별시 용산구 거주"}</span> */}
        <p>서울특별시 용산구 거주</p>
      </div>
    </section>
  );
}

export default BaseSection;
