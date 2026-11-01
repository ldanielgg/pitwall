import React, { useState } from 'react';
import { ChartColumn, CalendarDays, Timer, Engine, ChartSpline } from 'lucide-react'

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const [currentSection, setCurrentSection] = useState("Dashboard")

  const menuItems = [
    { name: 'Dashboard', icon: <ChartColumn size={20} /> },
    { name: 'Race Archive', icon: <CalendarDays size={20} /> },
    { name: 'Lap Times', icon: <Timer size={20} /> },
    { name: 'Pit Stops', icon: <Engine size={20} /> },
    { name: 'Analysis', icon: <ChartSpline size={20} /> },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar Container */}
      <aside
        className={`bg-slate-900 text-white flex flex-col transition-all duration-300 ${isOpen ? 'w-64' : 'w-16'
          }`}
      >
        {/* Header Section */}
        <div className="p-4 flex items-center justify-between border-b border-slate-700 h-16">
          {isOpen && <span className="font-bold text-lg tracking-wider">PITWALL</span>}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-1 rounded hover:bg-slate-800 text-xl focus:outline-none"
            aria-label="Toggle Sidebar"
          >
            {isOpen ? '◀' : '▶'}
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 py-4 space-y-1">
          {menuItems.map((item, index) => (
            <a
              key={index}
              href={`#${item.name.toLowerCase()}`}
              onClick={() => setCurrentSection(item.name)}
              className={`flex items-center px-4 py-3 transition-colors group ${item.name === currentSection
                  ? `border-l-4 border-l-[#E10600] bg-[#252027] text-white`
                  : `border-l-4 border-l-transparent text-slate-400 hover:bg-slate-800`
                }`}
            >
              <span className="text-xl min-w-[24px]">{item.icon}</span>
              <span
                className={`ml-4 transition-opacity duration-200 whitespace-nowrap ${isOpen
                    ? 'opacity-100 visible'
                    : 'opacity-0 invisible w-0'
                  }`}
              >
                {item.name}
              </span>
            </a>
          ))}
        </nav>

        {/* Footer Section */}
        <div className="p-4 border-t border-slate-700 text-xs text-slate-400 text-center h-12 flex items-center justify-center">
          {isOpen ? '© 2026 Admin Panel' : 'V'}
        </div>
      </aside>
    </div>
  );
}
