import React from 'react';
import { RoadmapItem, StatusConfig, Category } from '../types';
import { Calendar, Tag } from 'lucide-react';

interface RoadmapCardProps {
  item: RoadmapItem;
}

const CategoryColors: Record<string, string> = {
  [Category.CORE]: 'bg-purple-100 text-purple-700',
  [Category.INTEGRATION]: 'bg-indigo-100 text-indigo-700',
  [Category.UIUX]: 'bg-pink-100 text-pink-700',
  [Category.SECURITY]: 'bg-slate-100 text-slate-700',
  [Category.ANALYTICS]: 'bg-cyan-100 text-cyan-700',
};

const RoadmapCard: React.FC<RoadmapCardProps> = ({ item }) => {
  const statusInfo = StatusConfig[item.status];
  const progress = item.progress || 0;

  // Function to determine progress bar color based on status or value
  const getProgressColor = () => {
    if (progress === 100) return 'bg-emerald-500';
    if (progress > 50) return 'bg-brand-500';
    return 'bg-brand-400';
  };

  return (
    <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col gap-3 group relative overflow-hidden">
      {/* Decorative top border based on status */}
      <div className={`absolute top-0 left-0 w-full h-1 ${statusInfo.bg.replace('bg-', 'bg-opacity-50 ')} ${statusInfo.color.replace('text-', 'bg-')}`}></div>

      <div className="flex justify-between items-start">
        <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full ${CategoryColors[item.category] || 'bg-gray-100 text-gray-600'}`}>
          {item.category}
        </span>
        {item.date && (
          <div className="flex items-center text-xs text-slate-400 gap-1">
            <Calendar size={12} />
            <span>{item.date}</span>
          </div>
        )}
      </div>

      <div>
        <h3 className="text-gray-900 font-semibold text-lg leading-tight mb-1 group-hover:text-brand-600 transition-colors">
          {item.title}
        </h3>
        <p className="text-slate-500 text-sm leading-relaxed">
          {item.description}
        </p>
      </div>

      {/* Progress Bar */}
      <div className="mt-1">
        <div className="flex justify-between items-center mb-1">
          <span className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">Progress</span>
          <span className="text-[10px] font-bold text-slate-600">{progress}%</span>
        </div>
        <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
          <div 
            className={`h-full rounded-full transition-all duration-500 ${getProgressColor()}`} 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      <div className="flex items-center justify-between mt-2 pt-3 border-t border-slate-50">
        <div className="flex gap-2">
            {item.tags.slice(0, 2).map(tag => (
                <span key={tag} className="flex items-center text-xs text-slate-400 bg-slate-50 px-1.5 py-0.5 rounded border border-slate-100">
                   <Tag size={10} className="mr-1" /> {tag}
                </span>
            ))}
        </div>
      </div>
    </div>
  );
};

export default RoadmapCard;