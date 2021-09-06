import React, { cloneElement, isValidElement, ReactNode } from "react";
import clsx from "clsx";

type CardProps = {
  type?: "white" | "blue";
  children?: ReactNode;
};
export function Card({ type = "white", children }: CardProps) {
  if (!isValidElement(children)) return <></>;

  return cloneElement(children, {
    className: clsx(
      children.props.className,
      "rounded-2xl shadow",
      type === "white" && "bg-white-light text-blue-darkest",
      type === "blue" && "bg-blue-darkest text-white-light"
    ),
  });
}
