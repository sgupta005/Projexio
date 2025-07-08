import { useState, useRef, useEffect } from 'react';
import { CalendarIcon } from 'lucide-react';
import { format, parse } from 'date-fns';

interface DatePickerProps {
  value: string | null;
  onChange: (value: string | null) => void;
  placeholder?: string;
  className?: string;
}

export default function DatePicker({
  value,
  onChange,
  placeholder = 'Select date',
  className = '',
}: DatePickerProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [displayValue, setDisplayValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (value) {
      // When not focused, show formatted date
      if (!isFocused) {
        try {
          const date = parse(value, 'yyyy-MM-dd', new Date());
          setDisplayValue(format(date, 'MMM dd, yyyy'));
        } catch (error) {
          setDisplayValue(value);
        }
      } else {
        // When focused, show the value in yyyy-MM-dd format for the date input
        setDisplayValue(value);
      }
    } else {
      setDisplayValue('');
    }
  }, [value, isFocused]);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <div className="relative">
      {!isFocused && (
        <div className="absolute inset-y-0 right-2 flex items-center pointer-events-none">
          <CalendarIcon className="h-5 w-5 text-gray-400" />
        </div>
      )}
      <input
        ref={inputRef}
        type={isFocused ? 'date' : 'text'}
        className={`w-[200px] px-2 py-1.5 border h-[37.6px] border-gray-300 rounded-sm ${className}`}
        value={displayValue}
        placeholder={placeholder}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={(e) => onChange(e.target.value || null)}
      />
    </div>
  );
}
