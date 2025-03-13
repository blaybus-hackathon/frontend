

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './components/ui/Components/select';


import { Input } from './components/ui/Components/input';


// 1️⃣ SelectTrigger → 크기, 보더, 배경색 변경
// 2️⃣ SelectContent → 드롭다운의 테두리, 배경, 애니메이션 변경
// 3️⃣ SelectItem → 선택된 항목 강조, hover 효과 추가

export default function Test() {
  return (
    <div className="max-w-md mx-auto flex flex-col items-center">


      <Select>
        <SelectTrigger className="w-[180px]  border-purple-400  border-2">
          <SelectValue placeholder="Theme" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="light">Light</SelectItem>
          <SelectItem value="dark">Dark</SelectItem>
          <SelectItem value="system">System</SelectItem>
        </SelectContent>
      </Select>

<Input/>
    </div>
  );
}


