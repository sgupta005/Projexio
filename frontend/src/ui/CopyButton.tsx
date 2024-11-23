import { useState } from 'react';
import { Copy, Check } from 'lucide-react';

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
    <button
      onClick={handleCopy}
      className="px-3 border rounded-sm bg-white hover:bg-gray-100 transition shadow-sm"
      aria-label={copied ? 'Copied' : 'Copy'}
    >
      {copied ? (
        <Check className="text-green-500 size-4" />
      ) : (
        <Copy className="text-gray-600 size-4" />
      )}
    </button>
  );
}

export default CopyButton;
