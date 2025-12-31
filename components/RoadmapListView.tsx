import React from 'react';
import { RoadmapItem, StatusConfig, Category } from '../types';
import { Tag } from 'lucide-react';

interface RoadmapListViewProps {
  items: RoadmapItem[];
}

const CategoryColors: Record<string, string> = {
  [Category.CORE]: 'bg-purple-100 text-purple-700',
  [Category.INTEGRATION]: 'bg-indigo-100 text-indigo-700',
  [Category.UIUX]: 'bg-pink-100 text-pink-700',
  [Category.SECURITY]: 'bg-slate-100 text-slate-700',
  [Category.ANALYTICS]: 'bg-cyan-100 text-cyan-700',
};

const RoadmapListView: React.FC<RoadmapListViewProps> = ({ items }) => {
  if (items.length === 0) {
    return (
       <div className="flex flex-col items-center justify-center py-20 bg-white rounded-xl border border-slate-200">
          <p className="text-slate-500 font-medium">No items found</p>
       </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wider">
              <th className="px-6 py-4 w-[30%]">Feature</th>
              <th className="px-6 py-4 w-[15%]">Status</th>
              <th className="px-6 py-4 w-[20%]">Progress</th>
              <th className="px-6 py-4">Category</th>
              <th className="px-6 py-4">Tags</th>
              <th className="px-6 py-4 text-right">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {items.map((item) => {
              const status = StatusConfig[item.status];
              const progress = item.progress || 0;
              
              const getProgressColor = () => {
                if (progress === 100) return 'bg-emerald-500';
                if (progress > 50) return 'bg-brand-500';
                return 'bg-brand-400';
              };

              return (
                <tr key={item.id} className="hover:bg-slate-50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="font-semibold text-slate-900 group-hover:text-brand-600 transition-colors">{item.title}</span>
                      <span className="text-xs text-slate-500 line-clamp-1 mt-0.5">{item.description}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                       <span className={`w-2 h-2 rounded-full ${status.dot}`}></span>
                       <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${status.bg} ${status.color}`}>
                         {status.label}
                       </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 w-full max-w-[120px]">
                        <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                            <div 
                                className={`h-full rounded-full ${getProgressColor()}`} 
                                style={{ width: `${progress}%` }}
                            ></div>
                        </div>
                        <span className="text-xs font-medium text-slate-500 w-8 text-right">{progress}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full ${CategoryColors[item.category] || 'bg-gray-100 text-gray-600'}`}>
                      {item.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-1 flex-wrap">
                      {item.tags.slice(0, 3).map(tag => (
                        <span key={tag} className="flex items-center text-[10px] text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200">
                           <Tag size={10} className="mr-1" /> {tag}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    {item.date ? (
                      <span className="text-xs text-slate-500 font-medium">{item.date}</span>
                    ) : (
                      <span className="text-xs text-slate-300 italic">TBD</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RoadmapListView;