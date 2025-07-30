import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

function CopyButton({ textToCopy }: { textToCopy: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);

      // Reset the "copied" state after a delay
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <Button
      onClick={handleCopy}
      aria-label={copied ? 'Copied' : 'Copy'}
      variant="ghost"
      size="icon"
    >
      {copied ? (
        <Check className="text-green-500 size-4" />
      ) : (
        <Copy className="text-gray-600 size-4" />
      )}
    </Button>
  );
}

export default CopyButton;
