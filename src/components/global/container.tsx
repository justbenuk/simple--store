import { ReactNode } from "react";
import { cn } from "@/lib/utils";

type ContainerProps = {
  children: ReactNode;
  className?: string;
};

export default function Container({ children, className }: ContainerProps) {
  return (
    <>
      <div className={cn("mx-auto max-w-6xl xl:max-w-7xl px-8", className)}>
        {children}
      </div>
    </>
  );
}
