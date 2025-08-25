
import React, { ChangeEvent } from 'react';
import { useChmod } from '../hooks/useChmod';
import { PermissionCategory, PermissionSet, Permissions } from '../types';
import PermissionCheckbox from './PermissionCheckbox';

const PermissionGroup: React.FC<{
  title: string;
  category: PermissionCategory;
  permissions: PermissionSet;
  onToggle: (category: PermissionCategory, type: 'r' | 'w' | 'x') => void;
}> = ({ title, category, permissions, onToggle }) => (
  <div className="p-4 bg-gray-800 rounded-lg">
    <h4 className="text-xl font-semibold mb-3 text-cyan-300">{title}</h4>
    <div className="flex space-x-6">
      <PermissionCheckbox category={category} type="r" label="Read (r)" isChecked={permissions.r} onToggle={onToggle} />
      <PermissionCheckbox category={category} type="w" label="Write (w)" isChecked={permissions.w} onToggle={onToggle} />
      <PermissionCheckbox category={category} type="x" label="Execute (x)" isChecked={permissions.x} onToggle={onToggle} />
    </div>
  </div>
);

const Converter: React.FC = () => {
  const { permissions, octal, symbolic, togglePermission, setFromOctal } = useChmod();

  const handleOctalChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-7]/g, '').slice(0, 3);
    setFromOctal(value);
  };

  const getPermissionDescription = (category: keyof Permissions, p: PermissionSet) => {
    const catName = { user: 'เจ้าของ', group: 'กลุ่ม', other: 'คนอื่น' }[category];
    const rights = [];
    if (p.r) rights.push('อ่าน');
    if (p.w) rights.push('เขียน');
    if (p.x) rights.push('รัน/เข้าถึง');
    if (rights.length === 0) return `${catName}ไม่มีสิทธิ์ใดๆ`;
    return `${catName}มีสิทธิ์ ${rights.join(', ')}`;
  }

  return (
    <div className="space-y-8 animate-fade-in">
      <h2 className="text-3xl font-bold text-cyan-400 mb-6">เครื่องมือแปลงค่าสิทธิ์</h2>
      
      {/* Symbolic to Octal */}
      <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-gray-700">
        <h3 className="text-2xl font-semibold mb-4 text-white">Symbolic to Octal</h3>
        <div className="space-y-4">
          <PermissionGroup title="User (เจ้าของ)" category="user" permissions={permissions.user} onToggle={togglePermission} />
          <PermissionGroup title="Group (กลุ่ม)" category="group" permissions={permissions.group} onToggle={togglePermission} />
          <PermissionGroup title="Others (คนอื่น)" category="other" permissions={permissions.other} onToggle={togglePermission} />
        </div>
      </div>
      
      {/* Octal to Symbolic */}
      <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-gray-700">
        <h3 className="text-2xl font-semibold mb-4 text-white">Octal to Symbolic</h3>
        <label htmlFor="octal-input" className="block mb-2 text-lg font-medium text-gray-300">
          กรอกค่า Octal (เช่น 755)
        </label>
        <input
          id="octal-input"
          type="text"
          value={octal}
          onChange={handleOctalChange}
          maxLength={3}
          className="w-full md:w-1/2 lg:w-1/3 bg-gray-700 border border-gray-600 text-white text-2xl rounded-lg focus:ring-cyan-500 focus:border-cyan-500 block p-3 font-mono"
          placeholder="000"
        />
      </div>

      {/* Result Display */}
      <div className="bg-cyan-900/50 border border-cyan-700 p-6 rounded-xl shadow-2xl text-center sticky bottom-4">
        <h3 className="text-2xl font-bold mb-4 text-cyan-300">ผลลัพธ์</h3>
        <div className="flex flex-col md:flex-row justify-around items-center gap-6">
          <div className="w-full">
            <p className="text-lg text-gray-300 mb-1">Octal</p>
            <p className="text-5xl font-mono font-bold text-white bg-gray-800 p-4 rounded-lg">{octal}</p>
          </div>
          <div className="w-full">
            <p className="text-lg text-gray-300 mb-1">Symbolic</p>
            <p className="text-5xl font-mono font-bold text-white bg-gray-800 p-4 rounded-lg">{symbolic}</p>
          </div>
        </div>
        <div className="mt-6 text-left space-y-2 text-gray-200 bg-gray-800 p-4 rounded-lg">
            <h4 className="font-semibold text-lg text-cyan-400 mb-2">คำอธิบาย:</h4>
            <p>{getPermissionDescription('user', permissions.user)}</p>
            <p>{getPermissionDescription('group', permissions.group)}</p>
            <p>{getPermissionDescription('other', permissions.other)}</p>
        </div>
      </div>
    </div>
  );
};

export default Converter;
