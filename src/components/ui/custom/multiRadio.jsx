import React, { useState } from 'react';

const Radio = ({ className, children, onValueChange, cols, multiple = false, ...props }) => {
  const [checkedItems, setCheckedItems] = useState(multiple ? [] : null);
  const handleChecked = (val) => {
    if (multiple) {
      setCheckedItems((prev) => {
        const _checkedItems = prev.includes(val) ? prev.filter((x) => x !== val) : [...prev, val];
        onValueChange?.(_checkedItems);

        return _checkedItems;
      });
    } else {
      setCheckedItems(val);
      onValueChange?.(val);
    }
  };

  return (
    <div
      role='radiogroup'
      className={`grid ${cols ? `grid-cols-${cols}` : ''} gap-6 w-full ${className}`}
      {...props}
    >
      {children.map((child, idx) => {
        let value = child.props.value || child.props.children;

        return child
          ? React.cloneElement(child, {
              key: idx,
              onClick: () => {
                handleChecked(value);
              },
              checked: multiple ? checkedItems.includes(value) : checkedItems === value,
            })
          : null;
      })}
    </div>
  );
};

const RadioItem = ({ className, children, value, checked, ...props }) => {
  const radioValue = value || children;
  return (
    <button type='button' role='radio' className={className} value={radioValue} {...props}>
      <div className='flex border border-[var(--outline)] rounded-md py-4.5 px-4 gap-3.5 text-xl'>
        <svg
          width='29'
          height='29'
          viewBox='0 0 29 29'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <rect
            width='29'
            height='29'
            rx='14.5'
            fill={checked ? 'var(--company-primary)' : '#B6B6B6'}
          />
          <path
            d='M8.39775 15.7273C8.17808 15.5076 7.82192 15.5076 7.60225 15.7273C7.38258 15.9469 7.38258 16.303 7.60225 16.5227L10.9773 19.8977C11.1969 20.1174 11.5531 20.1174 11.7727 19.8977L20.0227 11.6477C20.2424 11.4281 20.2424 11.0719 20.0227 10.8523C19.803 10.6326 19.4469 10.6326 19.2273 10.8523L11.375 18.7045L8.39775 15.7273Z'
            fill='white'
          />
        </svg>
        {children}
      </div>
    </button>
  );
};

export { Radio, RadioItem };
