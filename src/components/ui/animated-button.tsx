
import React from 'react';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface AnimatedButtonProps extends React.ComponentProps<typeof Button> {
  children: React.ReactNode;
  animation?: 'scale' | 'bounce' | 'pulse';
}

// Enhanced button component with micro-animations
export const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  children,
  animation = 'scale',
  className,
  ...props
}) => {
  const animationClasses = {
    scale: 'transition-transform duration-200 hover:scale-105 active:scale-95',
    bounce: 'transition-transform duration-300 hover:animate-bounce',
    pulse: 'transition-all duration-200 hover:bg-opacity-80 active:scale-95'
  };

  return (
    <Button
      className={cn(
        animationClasses[animation],
        'shadow-sm hover:shadow-md transition-shadow',
        className
      )}
      {...props}
    >
      {children}
    </Button>
  );
};
