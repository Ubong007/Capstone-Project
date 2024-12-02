import React, { useState } from 'react';
import { Camera, X } from 'lucide-react';

interface ProfileImageProps {
  currentImage: string;
  onImageChange: (newImage: string) => void;
}

export function ProfileImage({ currentImage, onImageChange }: ProfileImageProps) {
  const [showImageMenu, setShowImageMenu] = useState(false);

  const defaultImage = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150";
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onImageChange(reader.result as string);
        setShowImageMenu(false); // Close menu after image is selected
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeleteImage = () => {
    onImageChange(defaultImage);
    setShowImageMenu(false);
  };

  // Close menu when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.profile-menu-container')) {
        setShowImageMenu(false);
      }
    };

    if (showImageMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showImageMenu]);

  return (
    <div className="relative group profile-menu-container">
      <div className="relative">
        <img 
          src={currentImage}
          alt="Profile"
          className="w-16 h-16 rounded-full border-2 border-[#FF00FF] p-0.5 object-cover"
        />
        <button 
          onClick={() => setShowImageMenu(!showImageMenu)}
          className="absolute inset-0 w-full h-full rounded-full bg-black/50 opacity-0 group-hover:opacity-100 
                     flex items-center justify-center transition-opacity duration-200"
        >
          <Camera className="w-5 h-5 text-white" />
        </button>
      </div>

      {showImageMenu && (
        <div className="absolute top-full left-0 mt-2 w-48 bg-[#181B4B] rounded-lg shadow-lg py-2 z-50
                      animate-fade-in">
          <label className="flex items-center px-4 py-2 hover:bg-[#232856] cursor-pointer">
            <Camera className="w-4 h-4 mr-2" />
            <span>Change Image</span>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </label>
          <button
            onClick={handleDeleteImage}
            className="flex items-center w-full px-4 py-2 hover:bg-[#232856] text-red-400"
          >
            <X className="w-4 h-4 mr-2" />
            <span>Remove Image</span>
          </button>
        </div>
      )}
    </div>
  );
}