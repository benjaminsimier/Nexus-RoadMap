import React, { useState } from 'react';
import { X, Sparkles, Loader2, Plus } from 'lucide-react';
import { generateRoadmapSuggestions } from '../services/geminiService';
import { RoadmapItem, Status, Category } from '../types';
import { v4 as uuidv4 } from 'uuid';

interface GeminiModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddItems: (items: RoadmapItem[]) => void;
}

// Simple UUID generator fallback if uuid lib fails or for simplicity
const generateId = () => Math.random().toString(36).substr(2, 9);

const GeminiModal: React.FC<GeminiModalProps> = ({ isOpen, onClose, onAddItems }) => {
  const [productDesc, setProductDesc] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleGenerate = async () => {
    if (!productDesc.trim()) return;
    
    setIsLoading(true);
    setError(null);
    setSuggestions([]);

    try {
      const results = await generateRoadmapSuggestions(productDesc);
      setSuggestions(results);
    } catch (err) {
      setError("Failed to generate suggestions. Please check your API key and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleApply = (suggestion: any) => {
    // Convert suggestion to valid RoadmapItem
    const newItem: RoadmapItem = {
      id: generateId(),
      title: suggestion.title,
      description: suggestion.description,
      status: (Object.values(Status).includes(suggestion.status) ? suggestion.status : Status.PLANNED) as Status,
      category: (Object.values(Category).includes(suggestion.category) ? suggestion.category : Category.CORE) as Category,
      tags: ['AI Generated'],
      date: 'TBD',
      progress: typeof suggestion.progress === 'number' ? suggestion.progress : 0
    };
    onAddItems([newItem]);
    // Remove from local list to avoid double adding
    setSuggestions(prev => prev.filter(s => s !== suggestion));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-gradient-to-r from-brand-50 to-white">
          <div className="flex items-center gap-2">
            <div className="bg-brand-100 p-2 rounded-lg">
                <Sparkles className="text-brand-600" size={20} />
            </div>
            <h2 className="text-xl font-bold text-slate-800">AI Roadmap Assistant</h2>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 p-1 hover:bg-slate-100 rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="p-6 overflow-y-auto">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Describe your product or current focus
              </label>
              <textarea
                value={productDesc}
                onChange={(e) => setProductDesc(e.target.value)}
                placeholder="e.g., An e-commerce platform for handmade crafts focusing on seller tools..."
                className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-brand-500 min-h-[100px] text-sm"
              />
            </div>

            <div className="flex justify-end">
              <button
                onClick={handleGenerate}
                disabled={isLoading || !productDesc.trim()}
                className="flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white px-4 py-2 rounded-lg font-medium text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? <Loader2 className="animate-spin" size={16} /> : <Sparkles size={16} />}
                {isLoading ? 'Thinking...' : 'Generate Ideas'}
              </button>
            </div>
          </div>

          {error && (
            <div className="mt-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg">
              {error}
            </div>
          )}

          {suggestions.length > 0 && (
            <div className="mt-8">
              <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">Suggested Items</h3>
              <div className="space-y-3">
                {suggestions.map((s, idx) => (
                  <div key={idx} className="border border-slate-200 rounded-xl p-4 hover:border-brand-300 transition-colors bg-slate-50 flex justify-between items-center gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold text-slate-800">{s.title}</h4>
                          <span className="text-[10px] bg-slate-200 px-2 py-0.5 rounded-full text-slate-600">{s.category}</span>
                      </div>
                      <p className="text-sm text-slate-600">{s.description}</p>
                    </div>
                    <button 
                        onClick={() => handleApply(s)}
                        className="bg-white border border-slate-200 text-brand-600 hover:bg-brand-50 hover:border-brand-200 p-2 rounded-lg transition-colors flex-shrink-0"
                        title="Add to Roadmap"
                    >
                        <Plus size={20} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GeminiModal;