import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuSeparator, DropdownMenuItem, DropdownMenuLabel } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState } from "react";
import Modal from "@/components/Modal/Modal";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";

const formSchema = z.object({
  name: z.string().min(1, "Contractor Name is required"),
  email: z.email(),
  projectCount: z.coerce
    .number({
      required_error: "Project count is required",
      invalid_type_error: "Project count must be a number",
    })
    .min(0, "Project count must not less than 0"),
});

function ContractorActions({ contractor }) {
  const [editOpen, setEditOpen] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: contractor.name || "",
      email: contractor.email || "",
      projectCount: contractor.projectCount || 0,
    },
  });

  async function onSubmit(data) {
    console.log("Edit form data:", data);

    const promise = () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          console.log("Promise resolved with data:", data);
          resolve(data);
        }, 2000);
      });
    };

    toast.promise(promise, {
      loading: "Updating",
      success: (resolvedData) => `${resolvedData.name} Updated!`,
      error: "Error updating contractor",
    });
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <MoreHorizontal />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onSelect={(e) => {
            e.preventDefault();
            setEditOpen(true);
          }}>
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem 
            onClick={() => alert(`Disable ${contractor.name}`)} 
            className="text-destructive"
          >
            Disable
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Modal
        triggerComponent={<div />}
        title="Edit Contractor"
        form={form}
        onSubmit={onSubmit}
        open={editOpen}
        onOpenChange={setEditOpen}
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
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="mb-4">
              <FormLabel>Contractor Email</FormLabel>
              <FormControl>
                <Input placeholder="contractor@example.com" type="email" {...field} />
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
    </>
  );
}

export const contractorColumns = [
    {
    accessorKey: "id",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() =>
          column.toggleSorting(column.getIsSorted() === "asc")
        }
      >
        ID <ArrowUpDown className="ml-2" />
      </Button>
    ),
    cell: ({ row }) => <div className="font-mono text-sm ml-3">{row.getValue("id")}</div>,
  },
  
  {
    accessorKey: "name",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() =>
          column.toggleSorting(column.getIsSorted() === "asc")
        }
      >
        Name <ArrowUpDown className="ml-2" />
      </Button>
    ),
    cell: ({ row }) => {
      const c = row.original;
      return (
        <div className="flex items-center gap-3">
          <Avatar>
            {c.avatar ? (
              <AvatarImage src={c.avatar} alt={c.name} />
            ) : (
              <AvatarFallback>{c.name.charAt(0)}</AvatarFallback>
            )}
          </Avatar>
          <div className="flex flex-col">
            <span className="font-medium">{c.name}</span>
            <span className="text-sm text-muted-foreground">Contractor</span>
          </div>
        </div>
      );
    },
  },

  {
    accessorKey: "email",
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
        Email <ArrowUpDown className="ml-2" />
      </Button>
    ),
    cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
  },

  {
    accessorKey: "projectCount",
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="mx-auto flex"
        onClick={() =>
          column.toggleSorting(column.getIsSorted() === "asc")
        }
      >
        Project Count <ArrowUpDown className="ml-2" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="text-center font-medium">{row.getValue("projectCount")}</div>
    ),
  },

  {
    accessorKey: "ratings",
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="mx-auto flex"
        onClick={() =>
          column.toggleSorting(column.getIsSorted() === "asc")
        }
      >
        Ratings <ArrowUpDown className="ml-2" />
      </Button>
    ),
    cell: ({ row }) => {
      const rating = Number(row.getValue("ratings"));
      return (
        <div className="flex items-center justify-center gap-2">
          <div className="text-sm font-medium">{rating.toFixed(1)} / 10</div>
        </div>
      );
    },
  },

  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const s = row.getValue("status");
      const bg =
        s === "active"
          ? "bg-green-100 text-green-800"
          : s === "suspended"
            ? "bg-yellow-100 text-yellow-800"
            : "bg-gray-100 text-gray-800";

      return (
        <div className={`inline-flex items-center px-2 py-1 rounded-full text-sm font-medium ${bg}`}>
          {s}
        </div>
      );
    },
  },

  {
    id: "actions",
    cell: ({ row }) => {
      const contractor = row.original;
      return <ContractorActions contractor={contractor} />;
    },
  },
];