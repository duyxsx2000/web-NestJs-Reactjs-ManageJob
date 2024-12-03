import React from 'react';
type Props = {
    textToCopy: string
}
const CopyButton = ({ textToCopy}: Props) => {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      alert('Text copied to clipboard');
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  return (
    <button onClick={handleCopy}>Copy to Clipboard</button>
  );
};

export default CopyButton;
