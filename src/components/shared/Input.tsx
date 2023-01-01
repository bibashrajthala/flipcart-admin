import React from "react";

interface Props {
  type: string;
  name: string;
  value?: string;
  label?: string;
  placeholder?: string;
  onChange?: (e: React.FormEvent<HTMLInputElement>) => void;
  icon?: JSX.Element;
}

const Input = (props: Props) => {
  const {
    label,
    name,
    placeholder,
    onChange,
    value,
    type,
    icon,
    ...extraProps
  } = props;
  return (
    <div className="flex flex-col gap-y-2 mb-4 relative">
      <label htmlFor={name} className="block text-gray-700 text-sm font-bold">
        {label}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        // value={value}
        placeholder={placeholder}
        onChange={onChange}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        {...extraProps}
      />
      {icon ? icon : ""}
    </div>
  );
};

export default Input;
