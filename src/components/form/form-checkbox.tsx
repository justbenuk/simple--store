"use client";

import { Checkbox } from "../ui/checkbox";

type FormCheckboxProps = {
  name: string;
  label: string;
  defaultChecked?: boolean;
};

export default function FormCheckbox({
  name,
  label,
  defaultChecked,
}: FormCheckboxProps) {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox id={name} name={name} defaultChecked={defaultChecked} />
      <label
        htmlFor={name}
        className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 capitalize"
      >
        {label}
      </label>
    </div>
  );
}
