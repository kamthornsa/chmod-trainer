
import React from 'react';
import { PermissionCategory, PermissionType } from '../types';

interface PermissionCheckboxProps {
  category: PermissionCategory;
  type: PermissionType;
  label: string;
  isChecked: boolean;
  onToggle: (category: PermissionCategory, type: PermissionType) => void;
}

const PermissionCheckbox: React.FC<PermissionCheckboxProps> = ({ category, type, label, isChecked, onToggle }) => {
  const colorClasses = {
    r: 'accent-blue-500',
    w: 'accent-red-500',
    x: 'accent-green-500',
  };

  return (
    <label className="flex items-center space-x-2 cursor-pointer text-lg">
      <input
        type="checkbox"
        checked={isChecked}
        onChange={() => onToggle(category, type)}
        className={`w-6 h-6 rounded ${colorClasses[type]} bg-gray-600 border-gray-500 focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-${
            type === 'r' ? 'blue' : type === 'w' ? 'red' : 'green'
          }-500`}
      />
      <span>{label}</span>
    </label>
  );
};

export default PermissionCheckbox;
