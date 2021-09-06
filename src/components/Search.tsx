import React, { ChangeEvent } from "react";
import clsx from "clsx";
import { Icon } from ".";

type SearchProps = {
  className?: string;
  label?: string;
  onChange?: (value: string) => void;
};
export function Search({ className, label, onChange }: SearchProps) {
  return (
    <label className={clsx("flex items-center py-3 px-6 text-lg", className)}>
      <span className="sr-only">{label}</span>

      <span className="w-6 mr-2 text-blue-light">
        <Icon.Search />
      </span>

      <input
        type="text"
        className="w-full p-2 placeholder-blue-dark"
        placeholder={label}
        onChange={(e) => onChange?.(e.target.value)}
      />
    </label>
  );
}
