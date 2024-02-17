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
};
export default function Filter(props: FilterProps) {
  const { options, onChange, id, name, currentValue } = props;

  return (
    <select
      className="z-[2] max-h-20 overflow-auto w-full rounded-2xl p-2 pl-6 pr-4 before:transition-all focus:outline-none focus:ring-2 focus:ring-sky-400/10 bg-slate-800 text-slate-400"
      name={name}
      id={id}
      onChange={(e) => onChange(e)}
      value={currentValue}
    >
      <option key={null} value={""} label="" />
      {options.map((o, index) => (
        <option key={index} value={o.value} label={o.label} />
      ))}
    </select>
  );
}
