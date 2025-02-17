import useSelectionStore from '@/store/useSelectionStore';

export default function ButtonGroup({ groupName, options, isMultiSelect = false }) {
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

  return (
    <>
      {options.map((option) => (
        <button
          key={option}
          className={`h-[4.1875rem] transition text-lg tracking-[-0.0125rem] rounded-[0.625rem] w-full ${
            (
              isMultiSelect
                ? selectedValues[groupName]?.includes(option)
                : selectedValues[groupName] === option
            )
              ? 'bg-[var(--company-primary)] text-white font-normal' // active
              : 'bg-[var(--button-inactive)] text-[var(--button-black)] font-normal' // inactive
          }`}
          onClick={() => handleSelect(option)}
        >
          {option}
        </button>
      ))}
    </>
  );
}
