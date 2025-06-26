import React from "react"

type InputProps = {
  label: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
  type?: string
}

export const Input: React.FC<InputProps> = ({ label, value, onChange, placeholder, type = "text" }) => (
  <div className="space-y-1">
    <label className="block font-medium">{label}</label>
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full bg-slate-800 text-white p-2 rounded-xl border border-slate-700"
    />
  </div>
)
