"use client";
import { ExpenseForm } from "@/components/expenseForm";

import { format } from "date-fns";

import React, { useState } from "react";
//import { ExpenseForm } from "@/components/expenseForm";

export default function Home() {
  const [expenses, setExpenses] = useState<
    Array<{
      expenseName: string;
      expenseAmount: number;
      expenseDateDue: Date;
    }>
  >([]);
  const addExpense = (newExpense: {
    expenseName: string;
    expenseAmount: number;
    expenseDateDue: Date;
  }) => {
    setExpenses((prevExpenses) => [...prevExpenses, newExpense]);
  };
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <ExpenseForm onAddExpense={addExpense} />

      {/* Displaying the expenses */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Expenses</h2>
        <ul className="space-y-2">
          {expenses.map((expense, index) => (
            <li key={index} className="bg-gray-100 p-4 rounded-md shadow-md">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-lg font-semibold">{expense.expenseName}</p>
                  <p className="text-gray-500">
                    {format(expense.expenseDateDue, "PPP")}
                  </p>
                </div>
                <p className="text-green-500 font-semibold">
                  ${expense.expenseAmount.toFixed(2)}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}

function GetExpense() {}
