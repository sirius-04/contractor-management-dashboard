import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { useRef } from "react";
import { Form } from "../ui/form";

export default function Modal({
  triggerComponent,
  title,
  children,
  form,
  onSubmit,
  open,
  onOpenChange
}) {
  const closeRef = useRef(null);
  const handleSubmit = form.handleSubmit(async (data) => {
    try {
      if (onSubmit) {
        await onSubmit(data);
      }
      closeRef.current?.click();
    } catch (err) {
      console.error("Submission error:", err);
    }
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{triggerComponent}</DialogTrigger>
      <DialogContent>
        <DialogHeader className="pb-6">
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={handleSubmit}>
            {children}
            <DialogClose asChild>
              <button type="button" ref={closeRef} className="hidden" />
            </DialogClose>
            <DialogFooter className="mt-4">
              <DialogClose asChild>
                <Button variant="outline" type="button">Cancel</Button>
              </DialogClose>
              <Button variant="secondary" type="submit">Submit</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}