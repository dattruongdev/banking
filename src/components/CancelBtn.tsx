import { cn } from "@/lib/utils";
import { Table } from "@tanstack/react-table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "./ui/alert-dialog";

type Props<TData> = {
  cancelHandler: (data: TData[]) => void;
  selectedRowNum: number;
  table: Table<TData>;
};

export default function CancelBtn<TData>({
  selectedRowNum,
  cancelHandler,
  table
}: Props<TData>) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button
          className={cn(
            `border-2 border-red-400 bg-white py-1 px-3 rounded-lg text-zinc-500 font-medium transition duration-200`,
            selectedRowNum > 0 && `hover:bg-red-400 hover:text-white `
          )}
          disabled={selectedRowNum == 0}
        >
          Cancel {selectedRowNum > 1 ? `(${selectedRowNum})` : ``}
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will cancel the transaction(s).
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction
            onClick={() => {
              const data = table
                .getSelectedRowModel()
                .rows.map((item) => item.original);
              cancelHandler(data);
            }}
          >
            Continue
          </AlertDialogAction>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}