import { useState, useEffect, useRef } from 'react';

import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';

import { cn } from '@/lib/utils';

const RadioGroup = ({ className, ...props }) => {
  return <RadioGroupPrimitive.Root className={cn('grid gap-6 w-full', className)} {...props} />;
};
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName;

const RadioGroupItem = ({ className, children, value, ...props }) => {
  const [selected, setSelected] = useState(false);
  const buttonRef = useRef(null);

  useEffect(() => {
    if (!buttonRef.current) return;

    const observer = new MutationObserver(() => {
      const dataState = buttonRef.current?.getAttribute('data-state');
      setSelected(dataState === 'checked');
    });

    observer.observe(buttonRef.current, {
      attributes: true,
      attributeFilter: ['data-state'],
    });

    return () => observer.disconnect();
  }, []);

  const radioValue = value || children;

  return (
    <RadioGroupPrimitive.Item
      ref={buttonRef}
      className={cn('w-full', className)}
      value={radioValue}
      {...props}
    >
      <div className='flex border border-gray-500 rounded-md py-4.5 px-4 gap-3.5 text-xl'>
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
            fill={selected ? 'var(--company-primary)' : '#B6B6B6'}
          />
          <path
            d='M8.39775 15.7273C8.17808 15.5076 7.82192 15.5076 7.60225 15.7273C7.38258 15.9469 7.38258 16.303 7.60225 16.5227L10.9773 19.8977C11.1969 20.1174 11.5531 20.1174 11.7727 19.8977L20.0227 11.6477C20.2424 11.4281 20.2424 11.0719 20.0227 10.8523C19.803 10.6326 19.4469 10.6326 19.2273 10.8523L11.375 18.7045L8.39775 15.7273Z'
            fill='white'
          />
        </svg>
        {children}
      </div>
    </RadioGroupPrimitive.Item>
  );
};
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName;

export { RadioGroup, RadioGroupItem };
