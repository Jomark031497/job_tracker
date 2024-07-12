import { DialogPanel, DialogTitle, Dialog, DialogBackdrop } from "@headlessui/react";
import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import { IoMdClose } from "react-icons/io";

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
          transition
          className={twMerge(
            "max-w-lg space-y-4 bg-white w-full relative rounded duration-300 ease-out data-[closed]:scale-95 data-[closed]:opacity-0"
          )}
        >
          <button
            onClick={close}
            className="text-2xl rounded-full hover:bg-gray-100 p-1 top-3 right-3 absolute"
          >
            <IoMdClose />
          </button>

          {title && <DialogTitle className="font-bold text-lg px-4">{title}</DialogTitle>}

          <div className="p-4">{children}</div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};
