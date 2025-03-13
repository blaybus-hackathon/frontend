import { Input } from "./Input";


export default {
  title: "Components/Input",
  component: Input,
  parameters:{
    layout:'centered',
  },
  tags: ["autodocs"],
  argTypes: {
    type: { control: "radio",
      options: ['text', 'password','email'],
     },
    placeholder: { control: "text" },
    label: { control: "boolean" }, 
    width: { control: "radio",
      options: ['16rem', '20rem', '24rem'],
     },
  },
  args: {
    label: false,  // label의 기본값을 true로 설정
  },
};



export const Default = {
  args: {
    placeholder: "Enter text...",
  },
};

export const WithLabel = {
  args: {
    placeholder: "Enter text...",
  },
};

export const PasswordInput = {
  args: {
    type: "password",
    placeholder: "Enter password...",
  },
};

export const CustomWidth = {
  args: {
    placeholder: "Custom width",
    width: "20rem",
  },
};