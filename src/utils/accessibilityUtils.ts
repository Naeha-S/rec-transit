
// Screen reader utilities
export const announceToScreenReader = (message: string): void => {
  const announcement = document.createElement('div');
  announcement.setAttribute('aria-live', 'polite');
  announcement.setAttribute('aria-atomic', 'true');
  announcement.className = 'sr-only';
  announcement.textContent = message;
  
  document.body.appendChild(announcement);
  
  setTimeout(() => {
    document.body.removeChild(announcement);
  }, 1000);
};

export const announceUrgent = (message: string): void => {
  const announcement = document.createElement('div');
  announcement.setAttribute('aria-live', 'assertive');
  announcement.setAttribute('aria-atomic', 'true');
  announcement.className = 'sr-only';
  announcement.textContent = message;
  
  document.body.appendChild(announcement);
  
  setTimeout(() => {
    document.body.removeChild(announcement);
  }, 1000);
};

// Focus management
export const focusManager = {
  trapFocus: (element: HTMLElement): (() => void) => {
    const focusableElements = element.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    ) as NodeListOf<HTMLElement>;
    
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    
    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement.focus();
            e.preventDefault();
          }
        }
      }
    };
    
    element.addEventListener('keydown', handleTabKey);
    firstElement?.focus();
    
    return () => {
      element.removeEventListener('keydown', handleTabKey);
    };
  },

  saveFocus: (): (() => void) => {
    const activeElement = document.activeElement as HTMLElement;
    return () => {
      activeElement?.focus();
    };
  }
};

// Keyboard navigation helpers
export const keyboardNavigation = {
  handleArrowKeys: (
    event: KeyboardEvent,
    items: HTMLElement[],
    currentIndex: number,
    onIndexChange: (index: number) => void
  ): void => {
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        const nextIndex = currentIndex < items.length - 1 ? currentIndex + 1 : 0;
        onIndexChange(nextIndex);
        items[nextIndex]?.focus();
        break;
      case 'ArrowUp':
        event.preventDefault();
        const prevIndex = currentIndex > 0 ? currentIndex - 1 : items.length - 1;
        onIndexChange(prevIndex);
        items[prevIndex]?.focus();
        break;
      case 'Home':
        event.preventDefault();
        onIndexChange(0);
        items[0]?.focus();
        break;
      case 'End':
        event.preventDefault();
        const lastIndex = items.length - 1;
        onIndexChange(lastIndex);
        items[lastIndex]?.focus();
        break;
    }
  }
};
