import React, { useState, useRef, useEffect } from 'react';

interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export const AccessibleDialog: React.FC<DialogProps> = ({
  isOpen,
  onClose,
  title,
  children
}) => {
  const dialogRef = useRef<HTMLDivElement>(null);
  const [lastActiveElement, setLastActiveElement] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      setLastActiveElement(document.activeElement as HTMLElement);
      dialogRef.current?.focus();
    } else if (lastActiveElement) {
      lastActiveElement.focus();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="dialog-title"
      aria-describedby="dialog-description"
      ref={dialogRef}
      tabIndex={-1}
    >
      <div role="document">
        <header>
          <h2 id="dialog-title">{title}</h2>
          <button
            onClick={onClose}
            aria-label="Close dialog"
            type="button"
          >
            ×
          </button>
        </header>

        <div id="dialog-description">
          {children}
        </div>

        <div role="group" aria-label="Dialog actions">
          <button
            onClick={onClose}
            type="button"
            aria-label="Cancel and close dialog"
          >
            Cancel
          </button>
          <button
            type="button"
            aria-label="Confirm and close dialog"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}; 