import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
}

const Input: React.FC<InputProps> = ({ label, id, className, ...props }) => {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      <label htmlFor={id} className="text-sm font-medium text-slate-700">
        {label}
      </label>
      <input
        id={id}
        className={`px-3 py-2 bg-white border border-slate-300 rounded-md text-sm text-black shadow-sm placeholder-slate-400
        focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500
        disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 ${className || ''}`}
        {...props}
      />
    </div>
  );
};

export default Input;