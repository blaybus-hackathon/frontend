import React, { useState, useReducer } from "react";
import { Radio, RadioItem } from "@/components/ui/custom/multiRadio";
import { Input } from "@/components/ui/custom/input";

// Reducer 함수: 상태 업데이트 로직을 담당
const reducer = (state, action) => {
  switch (action.type) {
    case "TOGGLE_OPTION":
      console.log("액션:", action);
      return {
        ...state,
        selectedOptions: {
          ...state.selectedOptions,

          [action.value]: action.checked,
        },
        inputs: action.checked
          ? state.inputs // 선택된 경우 기존 값 유지
          : Object.keys(state.inputs).reduce((acc, key) => {
              if (key !== action.value) {
                acc[key] = state.inputs[key];
              }
              return acc;
            }, {}),
      };
    case "UPDATE_INPUT_VALUE":
      console.log("액션:", action);
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.name]: action.value,
        },
      };
    default:
      return state;
  }
};

const initialProfileState = {
  selectedOptions: {},
  inputs: {},
};

export default function Test() {
  const [profileState, dispatch] = useReducer(reducer, initialProfileState);

  const handleRadioChange = (value, checked) => {
    dispatch({
      type: "TOGGLE_OPTION",
      value: value, // RadioItem에서 전달된 value 사용
      checked: checked,
    });
  };

  const handleInputChange = (event) => {
    dispatch({
      type: "UPDATE_INPUT_VALUE",
      name: event.target.name, // event.target.name 사용
      value: event.target.value,
    });
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">라디오 버튼 테스트 페이지</h2>
      <section className="space-y-4">
        <Radio
          onValueChange={(value) => {
            //  제거: 더이상 여기서 state 업데이트 안함
          }}
          cols={1}
          multiple
          className="gap-4"
        >
          {["자격증1", "자격증2", "자격증3"].map((certificate) => {
            const isChecked =
              profileState.selectedOptions[certificate] || false;
            return (
              <div key={certificate} className="flex flex-col gap-2">
                <RadioItem
                  value={certificate} // RadioItem에 value prop 전달
                  checked={isChecked}
                  onClick={() => handleRadioChange(certificate, !isChecked)}
                >
                  {certificate}
                </RadioItem>
                {isChecked && (
                  <Input
                    type="text"
                    name={certificate}
                    value={profileState.inputs[certificate] || ""}
                    onChange={(e) => handleInputChange(e)} // event 객체 전달
                    placeholder={`${certificate} 자격증 정보를 입력하세요`}
                    className="border p-2 rounded-md"
                  />
                )}
              </div>
            );
          })}
        </Radio>
      </section>
    </div>
  );
}
