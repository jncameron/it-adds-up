"use client";
import {
  Form,
  FormField,
  FormLabel,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";
import React from "react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { PopoverClose } from "@radix-ui/react-popover";

const formSchema = z.object({
  expenseName: z.string().min(2).max(50),
  expenseAmount: z.coerce.number().min(0),
  expenseDateDue: z.date(),
});

export function ExpenseForm({ onAddExpense }: any): JSX.Element {
  const { register, handleSubmit } = useForm();
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      expenseName: "",
      expenseDateDue: new Date(),
    },
  });
  const [date, setDate] = React.useState<Date>();
  const [open, setOpen] = React.useState(false);

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    onAddExpense(values);
    setOpen(false);
    form.reset();
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>Add Expense</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add An Expense</DialogTitle>
          <DialogDescription>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="expenseName"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Expense</FormLabel>
                      <FormControl>
                        <Input placeholder="Internet" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="expenseAmount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Amount</FormLabel>
                      <FormControl>
                        <Input placeholder="79.00" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="expenseDateDue"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Date Due</FormLabel>

                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-[240px] justify-start text-left font-normal",
                                !date && "text-muted-foreground"
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {date ? (
                                format(date, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <PopoverClose>
                            <X
                              size={24}
                              className="text-primary/60 hover:text-destructive"
                            />
                          </PopoverClose>
                          <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit">Add</Button>
              </form>
            </Form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
