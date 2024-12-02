import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";

type FormTextareaProps = {
  name: string;
  labelText?: string;
  defaultValue?: string;
};

export default function FormTextarea({
  name,
  labelText,
  defaultValue,
}: FormTextareaProps) {
  return (
    <div className="mb-2">
      <Label htmlFor={name} className="capitalize">
        {labelText || name}
      </Label>
      <Textarea
        id={name}
        name={name}
        defaultValue={defaultValue}
        rows={5}
        required
        className="leading-loose"
      />
    </div>
  );
}
