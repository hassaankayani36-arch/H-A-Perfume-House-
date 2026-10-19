import { useEffect, useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { statusOptions } from '../constants';
import { getOrderStatusClassName } from '../utils';

export default function OrderStatusSelect({ orderId, status, onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const controlRef = useRef(null);

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
    <div className="adminStatusControl" ref={controlRef}>
      <button
        className={`adminStatus ${getOrderStatusClassName(status)}`}
        type="button"
        aria-label={`Status for ${orderId}`}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((current) => !current)}
      >
        <span className="adminStatusLabel">{status}</span>
        <ChevronDown className="adminStatusChevron" size={14} aria-hidden="true" />
      </button>
      {isOpen && (
        <div className="adminStatusMenu" role="listbox" aria-label={`Choose status for ${orderId}`}>
          {statusOptions.map((option) => (
            <button
              className={`adminStatusOption ${getOrderStatusClassName(option)}`}
              key={option}
              type="button"
              role="option"
              aria-selected={option === status}
              onClick={() => {
                onChange(option);
                setIsOpen(false);
              }}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
