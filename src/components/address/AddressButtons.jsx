import { Button } from '@/components/ui/custom/Button';

export function AddressButtons({ list, onClick, selectedId, formatConfig }) {
  return (
    <>
      {list.map((address) => (
        <Button
          key={address.id}
          variant='outline'
          className='w-full h-16 px-3 py-2 flex items-center justify-center'
          data-selected={selectedId === address.id}
          onClick={() => onClick(address.id)}
        >
          <span
            className={`
              ${
                address.name.length >= (formatConfig?.threshold || 7)
                  ? `${formatConfig?.longClass || 'text-[1rem] leading-snug'} whitespace-nowrap break-normal`
                  : `${formatConfig?.shortClass || 'text-lg leading-tight'} whitespace-nowrap break-normal`
              }
              ${formatConfig?.className || 'text-center block'}
            `}
          >
            {address.name}
          </span>
        </Button>
      ))}
    </>
  );
}
