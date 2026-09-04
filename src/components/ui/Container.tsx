import { forwardRef, type HTMLAttributes } from 'react';
import { cn } from '../utils/cn';

const Container = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('bg-surface rounded-xl p-4', className)}
        {...props}
      />
    );
  }
);
Container.displayName = 'Container';

export { Container };
