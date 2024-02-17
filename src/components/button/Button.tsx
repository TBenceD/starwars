import { MouseEvent } from "react";

interface ButtonProps {
  name: string;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  type: "submit" | "button" | "reset";
  disabled?: boolean;
  small?: boolean;
}

export default function Button(props: ButtonProps) {
  const { name, onClick, type, disabled } = props;

  const handleButtonClick = (event: MouseEvent<HTMLButtonElement>) => {
    const button = event.currentTarget;
    const ripple = document.createElement("span");
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    ripple.classList.add("ripple");

    const existingRipple = button.querySelector(".ripple");
    if (existingRipple) {
      existingRipple.remove();
    }

    button.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 600); // Adjust the duration of the ripple effect

    onClick && onClick(event);
  };

  return (
    <button
      className="relative overflow-hidden border-none transition-all hover:bg-slate-950 text-slate-400 rounded border px-2 py-3 text-xs font-semibold disabled:cursor-not-allowed tracking-wider shadow-lg shadow-sky-950"
      onClick={handleButtonClick}
      disabled={disabled}
      type={type}
    >
      <span>{name}</span>
    </button>
  );
}
