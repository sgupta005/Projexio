import React, { useState, useRef, KeyboardEvent, ChangeEvent } from 'react';

import SpinnerMini from './SpinnerMini';
import Input from './Input';
import Button from './Button';

export default function InviteCodeInput({
  setInviteCode,
  isLoading,
}: {
  setInviteCode: React.Dispatch<React.SetStateAction<string>>;
  isLoading: boolean;
}) {
  const [code, setCode] = useState(['', '', '', '']);
  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  const handleChange = (index: number, value: string) => {
    if (value.length <= 1 && /^[0-9]*$/.test(value)) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);

      if (value !== '' && index < 3) {
        inputRefs[index + 1].current?.focus();
      }
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && code[index] === '' && index > 0) {
      inputRefs[index - 1].current?.focus();
    }
  };

  const handleSubmit = () => {
    const fullCode = code.join('');
    setInviteCode(fullCode);
  };

  const isCodeComplete = code.every((digit) => digit !== '');

  return (
    <div className="flex flex-col items-center space-y-4 p-4">
      <div className="flex space-x-2">
        {code.map((digit, index) => (
          <Input
            id={`digit-${index}`}
            key={index}
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={1}
            value={digit}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleChange(index, e.target.value)
            }
            onKeyDown={(e: KeyboardEvent<HTMLInputElement>) =>
              handleKeyDown(index, e)
            }
            ref={inputRefs[index]}
            className="w-12 h-12 text-center text-2xl"
            aria-label={`Digit ${index + 1}`}
          />
        ))}
      </div>
      <Button onClick={handleSubmit} disabled={!isCodeComplete}>
        {isLoading ? <SpinnerMini /> : 'Submit'}
      </Button>
    </div>
  );
}
