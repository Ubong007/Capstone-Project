import React, { useState } from 'react';
import { FileText, LayoutGrid, BarChart3, X } from 'lucide-react';
import { ProfileImage } from './ProfileImage';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export function Sidebar({ isOpen, onClose, activeSection, onSectionChange }: SidebarProps) {
  const [profileImage, setProfileImage] = useState("https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150");

  const navItems = [
    { id: 'templates', icon: FileText, label: 'Templates' },
    { id: 'categories', icon: LayoutGrid, label: 'Categories' },
    { id: 'analytics', icon: BarChart3, label: 'Analytics' }
  ];

  return (
    <div className={`sidebar transform transition-transform duration-300 ease-in-out ${
      isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
    }`}>
      <div className="flex justify-between items-center lg:hidden mb-4">
        <h2 className="text-xl font-bold">Menu</h2>
        <button onClick={onClose} className="p-2 hover:bg-[#181B4B] rounded-lg">
          <X className="w-6 h-6" />
        </button>
      </div>

      <div className="profile-section">
        <ProfileImage 
          currentImage={profileImage}
          onImageChange={setProfileImage}
        />
        <div>
          <h2 className="text-xl font-bold">Ubong Effiong</h2>
          <p className="text-gray-400">Product Manager</p>
        </div>
      </div>

      <nav className="space-y-2">
        {navItems.map(({ id, icon: Icon, label }) => (
          <button
            key={id}
            onClick={() => {
              onSectionChange(id);
              if (window.innerWidth < 1024) onClose();
            }}
            className={`w-full nav-item ${
              activeSection === id 
                ? 'bg-[#181B4B] text-white' 
                : 'hover:bg-[#181B4B]/50'
            }`}
          >
            <Icon className="w-5 h-5" />
            <span>{label}</span>
          </button>
        ))}
      </nav>

      <div className="mt-auto">
        <p className="text-gray-400 text-sm">Good</p>
        <h3 className="text-xl font-bold">Consistency</h3>
        <div className="stats-graph">
          <div className="graph-line"></div>
        </div>
      </div>
    </div>
  );
}