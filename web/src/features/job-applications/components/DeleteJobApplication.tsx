import { useMutation } from "@tanstack/react-query";
import { Modal } from "../../../components/ui/Modal";
import { __API_URL__ } from "../../../constants";
import { deleteJobApplication } from "../handlers/deleteJobApplication";
import toast from "react-hot-toast";
import { queryClient } from "../../../lib/queryClient";
import { useNavigate } from "react-router-dom";

type DeleteJobApplicationProps = {
  isOpen: boolean;
  close: () => void;
  jobApplicationId: string;
};

export const DeleteJobApplication = ({ close, isOpen, jobApplicationId }: DeleteJobApplicationProps) => {
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: async (id: string) => await deleteJobApplication(id),
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userJobApplications"] });
      toast.success("Job application deleted");
      navigate("/");
    },
  });

  return (
    <Modal close={close} isOpen={isOpen} title="Delete Job Application">
      <div className="flex flex-col gap-4">
        <p className="text-center text-sm">Are you sure you want to delete this Job Application?</p>

        <p className="text-center text-sm italic text-red-500">
          This action cannot be undone. Once deleted, all information associated with this application will be
          permanently removed from our system.
        </p>

        <div className="flex justify-between gap-4">
          <button onClick={close} className="rounded bg-gray-100 px-4 py-2 text-sm transition-all hover:bg-gray-300">
            Cancel
          </button>
          <button
            onClick={() => mutation.mutate(jobApplicationId)}
            className="rounded bg-red-600 px-4 py-2 text-sm text-white transition-all hover:bg-red-800"
            disabled={mutation.isPending}
          >
            {mutation.isPending ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </Modal>
  );
};
