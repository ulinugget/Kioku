import { ButtonProps } from '@radix-ui/themes';
import { Slot } from '@radix-ui/react-slot';
import { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../utils/cn';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-9 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none',
  {
    variants: {
      variant: {
        default: 'bg-lime-9 text-white hover:bg-lime-8 shadow-sm',
        outline:
          'border border-sage-6 bg-surface text-sage-12 shadow-sm hover:bg-sage-2',
        ghost: 'bg-transparent text-sage-12 hover:bg-sage-2',
        destructive: 'bg-red-9 text-white hover:bg-red-8',
      },
      size: {
        default: 'h-10 px-5 py-2 text-sm rounded-lg',
        sm: 'h-9 px-4 text-sm rounded-lg',
        lg: 'h-11 px-8 text-base rounded-lg',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps extends ButtonProps, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };