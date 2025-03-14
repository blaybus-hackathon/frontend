import { Slot } from '@radix-ui/react-slot';
import { cva } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-[0.88rem] w-[88%] mb-[1.94rem] whitespace-nowrap transition-colors rounded-[0.625rem] text-xl font-bold disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 ring-ring/10 dark:ring-ring/20 dark:outline-ring/40 outline-ring/50 focus-visible:ring-4 focus-visible:outline-1 aria-invalid:focus-visible:ring-0 ",
  {
    variants: {
      variant: {
        default:
          'bg-[var(--main)] text-white border border-[var(--outline)] active:bg-[var(--main-hover)] hover:bg-[var(--main-hover)]',
        white:
          'bg-white text-[var(--main)] border border-[var(--main)] active:bg-[var(--main)] active:text-white hover:bg-[var(--main)] hover:text-white',
        disabled: 'bg-[var(--disabled)] text-white border border-[var(--disabled)]',
        outline: 'bg-white text-[var(--black)] border border-[var(--outline)] font-normal',
        ghost: 'bg-transparent hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
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

function Button({ className, variant, size, asChild = false, ...props }) {
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      data-slot='button'
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
