import { Slot } from '@radix-ui/react-slot';
import { cva } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  "inline-flex items-center justify-center w-[88%] whitespace-nowrap transition-colors rounded-[0.625rem] text-xl font-bold disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:n ot([class*='size-'])]:size-4 [&_svg]:shrink-0 ring-ring/10 dark:ring-ring/20 dark:outline-ring/40 outline-ring/50 focus-visible:ring-4 focus-visible:outline-1 aria-invalid:focus-visible:ring-0 cursor-pointer",
  {
    variants: {
      variant: {
        default:
          'bg-[var(--main)] text-white border border-[var(--outline)] active:bg-[var(--main-hover)] hover:bg-[var(--main-hover)]',
        white:
          'bg-white text-[var(--main)] border border-[var(--main)] active:brightness-90 hover:brightness-90 transition-all',
        black:
          'bg-white text-black border border-[var(--main)] active:bg-[var(--main)] active:text-black hover:bg-[var(--main)] hover:text-white',

        disabled: 'bg-[var(--disabled)] text-white border border-[var(--disabled)]',
        outline:
          'bg-white text-[var(--black)] border border-[var(--outline)] font-normal hover:bg-[var(--main)] hover:text-white active:bg-[var(--main)] active:text-white data-[selected=true]:bg-[var(--main)] data-[selected=true]:text-white data-[selected=true]',
        ghost: 'bg-transparent hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 underline hover:underline rounded-none',
      },
      size: {
        default: 'py-4 has-[>svg]:px-3',
        sm: 'py-2 has-[>svg]:px-2.5',
        lg: 'py-3 has-[>svg]:px-4',
        icon: 'size-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

function Button({ className, variant, size, asChild = false, selected, ...props }) {
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      data-slot='button'
      data-selected={selected}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
