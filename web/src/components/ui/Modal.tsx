import { DialogPanel, DialogTitle, Dialog, DialogBackdrop } from "@headlessui/react";
import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type DialogProps = {
  isOpen: boolean;
  close: () => void;
  children: ReactNode;
  title?: string;
};

export const Modal = ({ title, close, isOpen, children }: DialogProps) => {
  return (
    <Dialog
      open={isOpen}
      onClose={close}
      transition
      className={
        "fixed inset-0 flex w-screen items-center justify-center bg-black/30 p-4 transition duration-300 ease-out data-[closed]:opacity-0"
      }
    >
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-black/30 duration-300 ease-out data-[closed]:opacity-0"
      />
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <DialogPanel
          // className="max-w-lg space-y-4 border bg-white p-12"
          transition
          className={twMerge(
            "max-w-lg space-y-4 bg-white w-full p-4 rounded duration-300 ease-out data-[closed]:scale-95 data-[closed]:opacity-0"
          )}
        >
          {title && <DialogTitle className="font-bold text-lg">{title}</DialogTitle>}
          {/* <Description>This will permanently deactivate your account</Description> */}

          {children}

          {/* <div className="flex gap-4">
            <button onClick={() => setIsOpen(false)}>Cancel</button>
            <button onClick={() => setIsOpen(false)}>Deactivate</button>
          </div> */}
        </DialogPanel>
      </div>
    </Dialog>
  );
};
