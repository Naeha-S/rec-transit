
import React from 'react';
import { cn } from "@/lib/utils";

interface EnhancedLoadingProps {
  variant?: 'spinner' | 'dots' | 'pulse' | 'skeleton';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  text?: string;
}

export const EnhancedLoading: React.FC<EnhancedLoadingProps> = ({
  variant = 'spinner',
  size = 'md',
  className,
  text
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  const renderSpinner = () => (
    <div className={cn(
      'animate-spin rounded-full border-2 border-gray-300 border-t-college-blue',
      sizeClasses[size],
      className
    )} />
  );

  const renderDots = () => (
    <div className="flex space-x-1">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className={cn(
            'bg-college-blue rounded-full animate-pulse',
            size === 'sm' ? 'w-2 h-2' : size === 'md' ? 'w-3 h-3' : 'w-4 h-4'
          )}
          style={{
            animationDelay: `${i * 0.2}s`,
            animationDuration: '1s'
          }}
        />
      ))}
    </div>
  );

  const renderPulse = () => (
    <div className={cn(
      'bg-college-blue rounded-full animate-pulse',
      sizeClasses[size],
      className
    )} />
  );

  const renderVariant = () => {
    switch (variant) {
      case 'dots': return renderDots();
      case 'pulse': return renderPulse();
      default: return renderSpinner();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-2">
      {renderVariant()}
      {text && (
        <p className="text-sm text-muted-foreground animate-fade-in">
          {text}
        </p>
      )}
    </div>
  );
};
