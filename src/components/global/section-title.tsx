import { Separator } from "../ui/separator";

type SectionTitleProps = {
  text: string;
};
export default function Sectiontitle({ text }: SectionTitleProps) {
  return (
    <div>
      <h2 className="text-2xl font-medium tracking-wider capitalize mb-8">
        {text}
      </h2>
      <Separator />
    </div>
  );
}
