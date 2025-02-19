import useSelectionStore from '@/store/useSelectionStore';
import { Button } from '@/components/ui/button';
export default function HelperButton({ groupName, options, isMultiSelect = false }) {
    const { selectedValues, setSelectedValue, toggleSelectedValue } = useSelectionStore();

    /**
     * handle multi selection
     */
    const handleSelect = (option) => {
        if (isMultiSelect) {
            toggleSelectedValue(groupName, option);
        } else {
            setSelectedValue(groupName, option);
        }
    };

    const isSelected = (option) => {
        return isMultiSelect
            ? selectedValues[groupName]?.includes(option)
            : selectedValues[groupName] === option;
    };

    return (
        <>
            {options.map((option) => (
                <Button
                    key={option}
                    className={` transition text-lg tracking-[-0.0125rem] rounded-[0.3rem] w-full ${(
                        isMultiSelect
                            ? selectedValues[groupName]?.includes(option)
                            : selectedValues[groupName] === option
                    )
                        ? 'bg-white text-black border border-[#C8C8C8] font-normal hover:bg-[#C8C8C8]/40  shadow-none' // active
                        : 'bg-white text-black border border-[#C8C8C8] font-normal hover:bg-[#C8C8C8]/40  shadow-none' // inactive
                        }`}
                    onClick={() => handleSelect(option)}
                >
                    <svg
                        width="29"
                        height="29"
                        viewBox="0 0 29 29"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <rect
                            width="29"
                            height="29"
                            rx="14.5"
                            fill={isSelected(option) ? "var(--helper-primary)" : "#B6B6B6"}
                        />
                        <path
                            d="M8.39775 15.7273C8.17808 15.5076 7.82192 15.5076 7.60225 15.7273C7.38258 15.9469 7.38258 16.303 7.60225 16.5227L10.9773 19.8977C11.1969 20.1174 11.5531 20.1174 11.7727 19.8977L20.0227 11.6477C20.2424 11.4281 20.2424 11.0719 20.0227 10.8523C19.803 10.6326 19.4469 10.6326 19.2273 10.8523L11.375 18.7045L8.39775 15.7273Z"
                            fill="white"
                        />
                    </svg>

                    {option}
                </Button>
            ))}
        </>
    );
}