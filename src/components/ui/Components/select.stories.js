
// 진짜진짜 5시간했는데 모르겠음.
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from './select'


const meta = {
  title: 'Shadcn/select',
  component: () => (
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
  ),
  parameters: {
      layout: 'centered',
  },
};

export default meta;

export const SelectDemo = {
  args: {},
};