'use client';

import React from 'react';
import { ChevronDown, Brain } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { MODEL_OPTIONS, ModelOption } from '@/lib/types';

interface ModelSelectorProps {
  selectedModel: string;
  onModelChange: (model: string) => void;
  disabled?: boolean;
}

const ModelSelector: React.FC<ModelSelectorProps> = ({
  selectedModel,
  onModelChange,
  disabled = false,
}) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const selectedOption = MODEL_OPTIONS.find(option => option.id === selectedModel) || MODEL_OPTIONS[0];

  const handleSelectOption = (option: ModelOption) => {
    onModelChange(option.id);
    setIsOpen(false);
  };

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.model-selector')) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <div className="model-selector relative">
      <Button
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        variant="outline"
        className="flex items-center gap-2"
      >
        <div className="p-1 rounded-lg bg-primary">
          <Brain size={14} className="text-primary-foreground" />
        </div>
        <span className="text-sm font-medium">{selectedOption.name}</span>
        <ChevronDown
          size={14}
          className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </Button>

      {isOpen && !disabled && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="absolute top-full left-0 mt-2 w-72 bg-popover border border-border shadow-xl rounded-xl z-50 overflow-hidden"
        >
          <div className="p-2">
            {MODEL_OPTIONS.map((option) => (
              <motion.button
                key={option.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleSelectOption(option)}
                className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 ${
                  selectedModel === option.id
                    ? 'bg-primary/10 text-primary border border-primary'
                    : 'text-foreground hover:bg-secondary'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-1.5 rounded-lg ${
                    selectedModel === option.id
                      ? 'bg-primary'
                      : 'bg-secondary'
                  }`}>
                    <Brain size={14} className={selectedModel === option.id ? 'text-primary-foreground' : 'text-muted-foreground'} />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium">{option.name}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">
                      {option.description}
                    </div>
                  </div>
                  {selectedModel === option.id && (
                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                  )}
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default ModelSelector;