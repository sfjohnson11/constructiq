import React from "react";

type InputProps = {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
};

export const Input = ({ label, value, onChange, placeholder, type = "text" }: InputProps) => {
  return (
    <div className="mb-4">
      <label className="block mb-1 font-semibold">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="border p-2 rounded w-full bg-white text-black"
      />
    </div>
  );
};
