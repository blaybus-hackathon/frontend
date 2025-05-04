import { Button } from "../ui/custom/Button"
import FormattedText from "../ui/custom/FormattedText"

export function AddressButtons({list, onClick, selectedId, formatConfig}) {
  return (
    <>
      {list.map((address) => (
        <Button
          key={address.id}
          variant='outline'
          className='w-full h-[4rem]'
          data-selected={selectedId === address.id}
          onClick={() => onClick(address.id)}
        >
          <FormattedText
            text={address.name}
            {...formatConfig}
          />
        </Button>
      ))}
    </>
  )
}