import React from "react";

type FilterProps = {
  name: string;
  id: string;
  options: {
    label: string;
    value: string;
  }[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  currentValue?: string;
  placeholder: string;
};
export default function Filter(props: FilterProps) {
  const { options, onChange, id, name, currentValue, placeholder } = props;

  return (
    <select
      className="z-[2] max-h-20 overflow-auto w-full rounded-2xl p-2 pl-6 pr-4 before:transition-all focus:outline-none focus:ring-2 focus:ring-sky-400/10 bg-slate-800 text-slate-400"
      name={name}
      id={id}
      onChange={(e) => onChange(e)}
      value={currentValue}
    >
      <option disabled defaultValue={placeholder} label={placeholder} />
      <option key={null} value={""} label={"Egyik sem"} />
      {options.map((o, index) => (
        <option key={index} value={o.value} label={o.label} />
      ))}
    </select>
  );
}
