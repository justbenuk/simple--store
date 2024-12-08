"use client";
import { ReactNode, useState } from "react";
import Image from "next/image";
import { Button } from "../ui/button";
import FormContainer from "../form/form-container";
import FormImage from "../form/form-image";
import FormButton from "../form/form-button";
import { type actionFunction } from "@/lib/types";

type ImageInputContainerProps = {
  image: string;
  name: string;
  action: actionFunction;
  text: string;
  children?: ReactNode;
};

export default function ImageInputContainer(props: ImageInputContainerProps) {
  const { image, name, action, text } = props;
  const [isUpdateFormVisable, setUpdateFormVisable] = useState(false);

  return (
    <div className="mb-8">
      <Image
        src={image}
        width={200}
        height={200}
        className="rounded-md object-cover mb-4 w-[200px] h-[200px]"
        alt={name}
      />
      <Button
        variant="outline"
        size="sm"
        onClick={() => setUpdateFormVisable((prev) => !prev)}
      >
        {text}
      </Button>
      {isUpdateFormVisable && (
        <div className="max-w-md mt-4">
          <FormContainer action={action}>
            {props.children}
            <FormImage />
            <FormButton size="sm" />
          </FormContainer>
        </div>
      )}
    </div>
  );
}
