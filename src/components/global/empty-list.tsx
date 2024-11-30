import { cn } from "@/lib/utils";

type EmptyListProps = {
  heading?: string;
  className?: string;
};

export default function EmptyList({
  heading = "No Items Found.",
  className,
}: EmptyListProps) {
  return <h2 className={cn("text-xl", className)}>{heading}</h2>;
}
