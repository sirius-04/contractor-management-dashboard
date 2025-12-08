import Modal from "../Modal/Modal";

import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { createContractor } from "@/services/ContractorService";

const formSchema = z.object({
  name: z
    .string()
    .min(1, "Contractor Name is required"),

  email: z.email(),

  projectCount: z.coerce
    .number({
      required_error: "Project count is required",
      invalid_type_error: "Project count must be a number",
    })
    .min(0, "Project count must not less than 0"),
});

export default function AddContractorButton({ onAdded }) {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      projectCount: 0,
    },
  });

  async function onSubmit(data) {
    const payload = {
      ...data,
      rating: 0.0,
      status: "active"
    };

    console.log("Payload being sent:", payload);


    const promise = async () => {
      try {
        const response = await createContractor(payload);
        console.log("Response:", response);
        return response.data;
      } catch (err) {
        console.error("AXIOS ERROR:", err);
        throw err;
      }
    };


    toast.promise(promise(), {
      loading: "Adding...",
      success: (result) => {
        onAdded();
        return `${result.name} added!`;
      },
      error: "Failed to add contractor",
    });

    form.reset();
  }

  return (
    <Modal
      triggerComponent={<Button variant="outline" className="ml-auto">Add <Plus /></Button>}
      title="Add Contractor"
      form={form}
      onSubmit={onSubmit}
    >
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem className="mb-4">
            <FormLabel>Contractor Name</FormLabel>
            <FormControl>
              <Input placeholder="Contractor A" type="text" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
        className="mb-3"
      />

      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem className="mb-4">
            <FormLabel>Contractor Email</FormLabel>
            <FormControl>
              <Input placeholder="contractor@example.com" type="text" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="projectCount"
        render={({ field }) => (
          <FormItem className="mb-4">
            <FormLabel>Project Count</FormLabel>
            <FormControl>
              <Input placeholder="5" type="number" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </Modal>
  );
}