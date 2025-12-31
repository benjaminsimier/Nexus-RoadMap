import React, { useState } from 'react';
import { INITIAL_DATA } from './services/data';
import { RoadmapItem, Status, Category, StatusConfig } from './types';
import RoadmapCard from './components/RoadmapCard';
import RoadmapListView from './components/RoadmapListView';
import { Search, Filter, Columns, List, Calendar, Activity } from 'lucide-react';

const App: React.FC = () => {
  const [items, setItems] = useState<RoadmapItem[]>(INITIAL_DATA);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category | 'ALL'>('ALL');
  const [selectedStatus, setSelectedStatus] = useState<Status | 'ALL'>('ALL');
  const [selectedDate, setSelectedDate] = useState<string>('ALL');
  const [viewMode, setViewMode] = useState<'KANBAN' | 'LIST'>('LIST');
  
  // Extract unique dates for the filter
  const uniqueDates = Array.from(new Set(items.map(item => item.date).filter(Boolean))).sort();

  // Filtering logic
  const filteredItems = items.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'ALL' || item.category === selectedCategory;
    const matchesStatus = selectedStatus === 'ALL' || item.status === selectedStatus;
    const matchesDate = selectedDate === 'ALL' || item.date === selectedDate;
    
    return matchesSearch && matchesCategory && matchesStatus && matchesDate;
  });

  // Group items by status
  const itemsByStatus = {
    [Status.BACKLOG]: filteredItems.filter(i => i.status === Status.BACKLOG),
    [Status.PLANNED]: filteredItems.filter(i => i.status === Status.PLANNED),
    [Status.IN_PROGRESS]: filteredItems.filter(i => i.status === Status.IN_PROGRESS),
    [Status.RELEASED]: filteredItems.filter(i => i.status === Status.RELEASED),
  };

  // Columns to display
  const columns = [Status.PLANNED, Status.IN_PROGRESS, Status.RELEASED, Status.BACKLOG];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col">
      {/* Navbar */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-brand-600 text-white p-1.5 rounded-lg">
               <Columns size={20} />
            </div>
            <h1 className="text-xl font-bold tracking-tight text-slate-900">Nexus <span className="text-slate-400 font-normal">Roadmap</span></h1>
          </div>
          
          <div className="flex items-center gap-3">
             {/* Removed AI Suggest, Documentation, and User Profile */}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col max-w-[1600px] mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Controls */}
        <div className="mb-8 flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto items-center flex-wrap">
                {/* Search */}
                <div className="relative group w-full sm:w-auto">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="h-4 w-4 text-slate-400 group-focus-within:text-brand-500 transition-colors" />
                    </div>
                    <input
                        type="text"
                        placeholder="Search roadmap..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 pr-4 py-2 w-full sm:w-64 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent shadow-sm"
                    />
                </div>

                {/* Category Filter */}
                <div className="relative w-full sm:w-auto">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Filter className="h-4 w-4 text-slate-400" />
                    </div>
                    <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value as Category | 'ALL')}
                        className="pl-10 pr-8 py-2 w-full sm:w-48 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 appearance-none shadow-sm cursor-pointer"
                    >
                        <option value="ALL">All Categories</option>
                        {Object.values(Category).map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                </div>

                {/* Status Filter */}
                <div className="relative w-full sm:w-auto">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Activity className="h-4 w-4 text-slate-400" />
                    </div>
                    <select
                        value={selectedStatus}
                        onChange={(e) => setSelectedStatus(e.target.value as Status | 'ALL')}
                        className="pl-10 pr-8 py-2 w-full sm:w-48 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 appearance-none shadow-sm cursor-pointer"
                    >
                        <option value="ALL">All Statuses</option>
                        {Object.values(Status).map(status => (
                            <option key={status} value={status}>{StatusConfig[status].label}</option>
                        ))}
                    </select>
                </div>

                {/* Date Filter */}
                <div className="relative w-full sm:w-auto">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Calendar className="h-4 w-4 text-slate-400" />
                    </div>
                    <select
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="pl-10 pr-8 py-2 w-full sm:w-48 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 appearance-none shadow-sm cursor-pointer"
                    >
                        <option value="ALL">All Dates</option>
                        {uniqueDates.map(date => (
                            <option key={date} value={date}>{date}</option>
                        ))}
                    </select>
                </div>

                {/* View Switcher */}
                <div className="flex bg-slate-100 p-1 rounded-lg border border-slate-200">
                  <button
                    onClick={() => setViewMode('KANBAN')}
                    className={`p-1.5 rounded-md transition-all ${viewMode === 'KANBAN' ? 'bg-white shadow text-brand-600' : 'text-slate-500 hover:text-slate-700'}`}
                    title="Board View"
                  >
                    <Columns size={16} />
                  </button>
                  <button
                    onClick={() => setViewMode('LIST')}
                    className={`p-1.5 rounded-md transition-all ${viewMode === 'LIST' ? 'bg-white shadow text-brand-600' : 'text-slate-500 hover:text-slate-700'}`}
                    title="List View"
                  >
                    <List size={16} />
                  </button>
                </div>
            </div>
        </div>

        {/* Content Area */}
        {viewMode === 'KANBAN' ? (
          /* Kanban Board */
          <div className="flex-1 overflow-x-auto pb-4 horizontal-scroll">
              <div className="flex gap-6 min-w-max pb-4">
                  {columns.map(status => {
                      const statusData = StatusConfig[status];
                      const columnItems = itemsByStatus[status];

                      return (
                          <div key={status} className="w-[340px] flex-shrink-0 flex flex-col">
                              {/* Column Header */}
                              <div className="flex items-center justify-between mb-4 px-1">
                                  <div className="flex items-center gap-2">
                                      <span className={`w-2.5 h-2.5 rounded-full ${statusData.dot}`}></span>
                                      <h2 className="font-semibold text-slate-700">{statusData.label}</h2>
                                      <span className="bg-slate-200 text-slate-600 text-[10px] font-bold px-2 py-0.5 rounded-full">
                                          {columnItems.length}
                                      </span>
                                  </div>
                              </div>

                              {/* Column Content */}
                              <div className="flex-1 bg-slate-100/50 rounded-2xl p-2 border border-slate-200/60 min-h-[500px]">
                                  {columnItems.length > 0 ? (
                                      <div className="flex flex-col gap-3">
                                          {columnItems.map(item => (
                                              <RoadmapCard key={item.id} item={item} />
                                          ))}
                                      </div>
                                  ) : (
                                      <div className="h-full flex flex-col items-center justify-center text-slate-400 p-8 border-2 border-dashed border-slate-200 rounded-xl">
                                          <div className="bg-slate-50 p-3 rounded-full mb-3">
                                              <List size={20} className="opacity-50" />
                                          </div>
                                          <p className="text-sm text-center font-medium">No items yet</p>
                                          <p className="text-xs text-center mt-1 opacity-70">Move items here to populate this column</p>
                                      </div>
                                  )}
                              </div>
                          </div>
                      );
                  })}
              </div>
          </div>
        ) : (
          /* List View */
          <div className="flex-1">
             <RoadmapListView items={filteredItems} />
          </div>
        )}
      </main>
    </div>
  );
};

export default App;