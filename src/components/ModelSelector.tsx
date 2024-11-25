import React from 'react';

interface ModelSelectorProps {
  selectedModel: 'gemini-pro' | 'gemini-flash';
  onModelChange: (model: 'gemini-pro' | 'gemini-flash') => void;
}

const ModelSelector: React.FC<ModelSelectorProps> = ({ selectedModel, onModelChange }) => {
  return (
    <div className="flex space-x-2 mt-2">
      <button
        onClick={() => onModelChange('gemini-pro')}
        className={`px-4 py-2 rounded ${
          selectedModel === 'gemini-pro'
            ? 'bg-white text-purple-700'
            : 'bg-transparent text-white border border-white'
        }`}
      >
        JW Pro
      </button>
      {/* <button
        onClick={() => onModelChange('gemini-flash')}
        className={`px-4 py-2 rounded ${
          selectedModel === 'gemini-flash'
            ? 'bg-white text-purple-700'
            : 'bg-transparent text-white border border-white'
        }`}
      >
        JW Flash
      </button> */}
    </div>
  );
};

export default ModelSelector;