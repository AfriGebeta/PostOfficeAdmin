import React, { useRef, useState } from "react";
import { useForm, FormProvider} from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@/components/ui/use-toast";
import { Button } from "@/components/custom/button";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/authProvider";
import axios from "axios";
import Papa from "papaparse";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";

interface BulkUploadFormProps extends React.HTMLAttributes<HTMLDivElement> {}

interface CSVRow {
  phone: string;
  type: string;
  killo: string;
  firstName: string;
  lastName: string;
  city: string;
  description: string;
  time: string;
  date: string;
}

const formSchema = z.object({
  csvFile: z.instanceof(File).optional(),
});

export function BulkUploadForm({ className, ...props }: BulkUploadFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();
  const methods = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      csvFile: undefined,
    },
  });
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  async function onSubmit(_data: z.infer<typeof formSchema>) {
    const file = fileInputRef.current?.files?.[0];
    if (!file) {
      toast({
        title: "No file selected",
        description: "Please select a CSV file to upload.",
      });
      return;
    }

    setIsLoading(true);
    Papa.parse<CSVRow>(file, {
      header: true,
      complete: async (results) => {
        for (const row of results.data) {
          try {
            const res = await axios.get(import.meta.env.VITE_API_URL + "/profile");

            if (res.data) {
              const filter = res.data.filter((user: any) => user.phoneNumber.toString() === row.phone);

              if (!filter.length) {
                toast({
                  title: "Failed to send package!",
                  description: `No user found with phone number ${row.phone}`,
                });
                continue;
              }

              const result = await axios.post(
                import.meta.env.VITE_API_URL + "/package",
                {
                  location_history: {},
                  specification: {
                    description: row.description,
                    killo: row.killo,
                    type: row.type,
                    city: row.city,
                    firstName: row.firstName,
                    lastName: row.lastName,
                    trackingNumber: "1Z9R5W90P22" + Math.floor(Math.random() * 100000),
                    time: row.time,
                    date: row.date,
                  },
                  type: row.type,
                  fragile: false,
                  sentFromId: user?.id,
                  sentToId: filter[0].id,
                }
              );

              if (result.data) {
                toast({
                  title: "Package sent successfully!",
                  description: `Package to ${row.firstName} ${row.lastName} sent successfully.`,
                });
              } else {
                toast({
                  title: "Failed to send package!",
                  description: `Failed with error ${result.data}`,
                });
              }
            } else {
              toast({
                title: "Failed to send package!",
                description: `Failed with error ${res.data}`,
              });
            }
          } catch (err: any) {
            toast({
              title: "Failed to send package!",
              description: `Failed with error ${err.message}`,
            });
          }
        }

        setIsLoading(false);
        methods.reset();
      },
    });
  }

  return (
    <div className={cn("grid gap-6 p-5", className)} {...props}>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <div className="grid gap-2">
            <FormField
              name="csvFile"
              render={() => (
                <FormItem className="space-y-1">
                  <FormLabel>CSV File</FormLabel>
                  <FormControl>
                    <input
                      type="file"
                      accept=".csv"
                      ref={fileInputRef}
                      className="block w-full text-sm text-gray-500
                                 file:mr-4 file:py-2 file:px-4
                                 file:rounded-full file:border-0
                                 file:text-sm file:font-semibold
                                 file:bg-violet-50 file:text-violet-700
                                 hover:file:bg-violet-100"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-row justify-center">
              <Button type="submit" className="mt-10 w-[60%]" loading={isLoading}>
                Upload and Send Packages
              </Button>
            </div>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}