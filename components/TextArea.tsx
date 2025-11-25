import React from 'react';

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  id: string;
}

const TextArea: React.FC<TextAreaProps> = ({ label, id, className, ...props }) => {
  return (
    <div className="flex flex-col gap-1.5 w-full h-full">
      <label htmlFor={id} className="text-sm font-medium text-slate-700">
        {label}
      </label>
      <textarea
        id={id}
        className={`flex-1 min-h-[120px] px-3 py-2 bg-white border border-slate-300 rounded-md text-sm font-mono text-black shadow-sm placeholder-slate-400
        focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500
        disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 resize-y ${className || ''}`}
        {...props}
      />
    </div>
  );
};

export default TextArea;