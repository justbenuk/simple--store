"use client";
import { useActionState } from "react";
import { ReactNode, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { actionFunction } from "@/lib/types";

const initialState = {
  message: "",
};

export default function FormContainer({
  action,
  children,
}: {
  action: actionFunction;
  children: ReactNode;
}) {
  //@ts-expect-error not sure why this wont work
  const [state, formAction] = useActionState(action, initialState);
  const { toast } = useToast();

  useEffect(() => {
    if (state?.message) {
      toast({ description: state.message });
    }
  }, [state, toast]);

  return <form action={formAction}>{children}</form>;
}
