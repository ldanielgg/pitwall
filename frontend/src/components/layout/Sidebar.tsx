import React, { useState, useEffect } from 'react';
import { ChartColumn, CalendarDays, Timer, Wrench, ChartSpline } from 'lucide-react'

interface HealthResponse {
  status: string
  application: string
}

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const [currentSection, setCurrentSection] = useState("Dashboard")
  const [health, setHealth] = useState<HealthResponse | null>(null)

  const menuItems = [
    { name: 'Dashboard', icon: <ChartColumn size={32} /> },
    { name: 'Race Archive', icon: <CalendarDays size={32} /> },
    { name: 'Lap Times', icon: <Timer size={32} /> },
    { name: 'Pit Stops', icon: <Wrench size={32} /> },
    { name: 'Analysis', icon: <ChartSpline size={32} /> },
  ];

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/health')
    .then((response) => {
      if (!response.ok) {
        throw new Error('Backend request failed')
      }

      return response.json()
    })
    .then((data: HealthResponse) => {
      setHealth(data)
    })
  }, [])

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar Container */}
      <aside
        className={`bg-[#191b1f] text-white flex flex-col transition-all duration-300 border-r border-[#252932] ${isOpen ? 'w-80' : 'w-18'
          }`}
      >
        {/* Header Section */}
        <div className="p-5 flex items-center justify-between border-b border-[#252932] h-24">
          {isOpen && <span className="font-bold text-5xl tracking-wider">PITWALL</span>}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded hover:bg-slate-800 text-2xl focus:outline-none"
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
              className={`flex items-center mx-3 px-2 py-3 rounded-md transition-colors group ${item.name === currentSection
                  ? `bg-[#621718] text-white`
                  : `text-slate-400 hover:bg-[#382021]`
                }`}
            >
              <span className="text-xl min-w-[24px]">{item.icon}</span>
              <span
                className={`ml-4 transition-opacity duration-200 whitespace-nowrap text-xl ${isOpen
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
        <div className="p-6 border-t border-[#252932] text-xl text-slate-400 text-center h-32 flex flex-col items-start">
          {isOpen ? (
            <span className="flex flex-row items-center gap-2 text-slate-300">
              {health ? (
                <>
                  <span className="size-3.5 rounded-full bg-green-500 shrink-0"></span>
                  <span>Connected</span>
                </>
              ) : (
                <>
                  <span className="size-3.5 rounded-full bg-red-500 shrink-0"></span>
                  <span>Not connected</span>
                </>
              )}
              </span>
            ) : (<span></span>)}
          <span>{isOpen ? 'v0.1.0' : ''}</span>
        </div>
      </aside>
    </div>
  );
}
