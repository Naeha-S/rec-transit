
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface AnimatedCardProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
  hover?: boolean;
  clickable?: boolean;
  onClick?: () => void;
  delay?: number;
}

export const AnimatedCard: React.FC<AnimatedCardProps> = ({
  children,
  title,
  className,
  hover = true,
  clickable = false,
  onClick,
  delay = 0
}) => {
  return (
    <Card 
      className={cn(
        'transition-all duration-300 animate-fade-in',
        hover && 'hover:shadow-lg hover:-translate-y-1',
        clickable && 'cursor-pointer hover:scale-105',
        className
      )}
      style={{ animationDelay: `${delay}ms` }}
      onClick={onClick}
    >
      {title && (
        <CardHeader>
          <CardTitle className="text-lg font-semibold animate-fade-in">
            {title}
          </CardTitle>
        </CardHeader>
      )}
      <CardContent className="animate-fade-in" style={{ animationDelay: `${delay + 100}ms` }}>
        {children}
      </CardContent>
    </Card>
  );
};
