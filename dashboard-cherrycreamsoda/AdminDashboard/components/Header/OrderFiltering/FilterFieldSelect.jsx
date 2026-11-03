import { useEffect, useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function FilterFieldSelect({ options, value, onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const controlRef = useRef(null);
  const selectedOption = options.find((option) => option.key === value);

  useEffect(() => {
    if (!isOpen) return undefined;

    function handlePointerDown(event) {
      if (!controlRef.current?.contains(event.target)) setIsOpen(false);
    }

    function handleKeyDown(event) {
      if (event.key === 'Escape') setIsOpen(false);
    }

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  return (
    <div className="adminFilterField" ref={controlRef}>
      <button
        className="adminFilterSelectTrigger"
        type="button"
        aria-label="Filter by field"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((current) => !current)}
      >
        <span>{selectedOption?.label ?? 'Filter by'}</span>
        <ChevronDown className="adminFilterSelectChevron" size={14} aria-hidden="true" />
      </button>
      {isOpen && (
        <div className="adminFilterSelectMenu" role="listbox" aria-label="Choose a field to filter by">
          {options.map((option) => (
            <button
              className="adminFilterSelectOption"
              key={option.key}
              type="button"
              role="option"
              aria-selected={option.key === value}
              onClick={() => {
                onChange(option.key);
                setIsOpen(false);
              }}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
