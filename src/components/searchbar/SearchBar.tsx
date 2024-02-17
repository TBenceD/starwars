import React, { ChangeEvent, useState } from "react";

type SearchBarProps = {
  id: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  maxLength: number;
  placeholder: string;
};

export default function SearchBar(props: SearchBarProps) {
  const { id, value, onChange, maxLength, placeholder } = props;
  const [isPlaceholderUp, setIsPlaceholderUp] = useState(
    typeof value === "string" && value.trim() !== ""
  );

  const handleFocus = () => {
    setIsPlaceholderUp(true);
  };

  const handleBlur = () => {
    setIsPlaceholderUp(!!value);
  };

  return (
    <div>
      <div className="relative">
        <label
          className={`
          absolute left-4 cursor-text text-base transition-all ${
            isPlaceholderUp
              ? "-top-0.5 sm:top-0 flex h-[1px] items-center bg-slate-800 text-xs sm:text-sm"
              : "top-1/2 -translate-y-1/2 transform"
          }
          bg-transparent px-2 text-slate-400
        `}
          onClick={() => {
            document.getElementById(id)?.focus();
          }}
        >
          <span>{placeholder}</span>
        </label>
        <input
          id={id}
          type={"search"}
          className="z-[2] w-full
          rounded-2xl p-2 pl-6 pr-4
          before:transition-all focus:outline-none focus:ring-2 focus:ring-sky-400/10
          bg-slate-800 text-slate-400"
          value={value}
          onChange={onChange}
          maxLength={maxLength}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      </div>
    </div>
  );
}
