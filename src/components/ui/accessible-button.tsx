
import React, { forwardRef, useRef } from 'react';
import { Button, ButtonProps } from '@/components/ui/button';
import { announceToScreenReader } from '@/utils/accessibilityUtils';

interface AccessibleButtonProps extends ButtonProps {
  announceOnClick?: string;
  loadingText?: string;
  isLoading?: boolean;
  hasTooltip?: boolean;
  tooltipId?: string;
}

export const AccessibleButton = forwardRef<HTMLButtonElement, AccessibleButtonProps>(
  ({ 
    announceOnClick, 
    loadingText = "Loading...", 
    isLoading = false,
    hasTooltip = false,
    tooltipId,
    onClick,
    children,
    disabled,
    ...props 
  }, ref) => {
    const buttonRef = useRef<HTMLButtonElement>(null);

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (announceOnClick) {
        announceToScreenReader(announceOnClick);
      }
      
      if (onClick) {
        onClick(e);
      }
    };

    const ariaProps = {
      'aria-busy': isLoading,
      'aria-disabled': disabled || isLoading,
      'aria-describedby': hasTooltip ? tooltipId : undefined,
    };

    return (
      <Button
        ref={ref || buttonRef}
        onClick={handleClick}
        disabled={disabled || isLoading}
        {...ariaProps}
        {...props}
      >
        {isLoading ? (
          <>
            <span className="sr-only">{loadingText}</span>
            <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-current mr-2" />
            {children}
          </>
        ) : (
          children
        )}
      </Button>
    );
  }
);

AccessibleButton.displayName = "AccessibleButton";
