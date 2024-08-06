import { useParams } from "react-router-dom";
import { useJobApplication } from "../hooks/useJobApplication";
import { twMerge } from "tailwind-merge";
import { formatToDate } from "../../../utils/formatToDate";
import { formatToCurrency } from "../../../utils/formatToCurrency";
import { lazily } from "react-lazily";
import { useToggle } from "../../miscs/hooks/useToggle";
import { Button } from "../../../components/ui/Button";
import { DeleteJobApplication } from "./DeleteJobApplication";

const { UpdateJobApplication } = lazily(() => import("./UpdateJobApplication"));

export const JobApplication = () => {
  const { id } = useParams();

  if (!id) {
    return null;
  }

  const { close: closeUpdateModal, isOpen: isUpdateModalOpen, open: openUpdateModal } = useToggle();
  const { close: closeDeleteModal, isOpen: isDeleteModalOpen, open: openDeleteModal } = useToggle();

  const { data: jobApplication } = useJobApplication(id);

  return (
    <>
      <section className="flex flex-col gap-4 rounded border bg-white p-4 shadow">
        <h2 className="text-lg font-semibold">Company Details</h2>

        <div className="grid grid-cols-2 gap-4">
          {[
            { label: "Job Title", value: jobApplication.role },
            { label: "Company Name", value: jobApplication.companyName },
            { label: "Application Date", value: formatToDate(jobApplication.applicationDate) },
            { label: "Status", value: jobApplication.status, style: "capitalize" },
            { label: "Expected Salary", value: formatToCurrency(jobApplication.expectedSalary) },
            { label: "Platform", value: jobApplication.platform },
            { label: "Address", value: jobApplication.companyAddress, fullWidth: true },
            { label: "Website", value: jobApplication.companyWebsite, isWebsite: true },
            { label: "Contact Person", value: jobApplication.contactPerson },
            { label: "Application Description", value: jobApplication.description, fullWidth: true },
          ].map((item) => (
            <div key={item.label} className={twMerge("flex flex-col gap-0.5", item.fullWidth ? "col-span-2" : "")}>
              <p className="text-sm text-gray-500">{item.label}</p>
              {item.isWebsite ? (
                <a
                  href={item.value ? (item.value.startsWith("http") ? item.value : `https://${item.value}`) : ""}
                  rel="noopener noreferrer"
                  target="_blank"
                  className={twMerge(
                    "text-sm font-medium text-blue-900",
                    !item.value && "font-normal italic text-gray-500",
                    item.style,
                  )}
                >
                  {item.value}
                </a>
              ) : (
                <p
                  className={twMerge(
                    "text-sm font-medium",
                    !item.value && "font-normal italic text-gray-500",
                    item.style,
                  )}
                >
                  {item.value || "-"}
                </p>
              )}
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <Button
            onClick={openUpdateModal}
            className="border border-transparent bg-transparent px-4 text-black hover:border-gray-100 hover:bg-gray-100"
          >
            Edit
          </Button>

          <Button onClick={openDeleteModal} className="bg-red-600 px-4 hover:bg-red-800">
            Delete
          </Button>
        </div>
      </section>

      <UpdateJobApplication close={closeUpdateModal} isOpen={isUpdateModalOpen} jobApplication={jobApplication} />
      <DeleteJobApplication close={closeDeleteModal} isOpen={isDeleteModalOpen} jobApplicationId={jobApplication.id} />
    </>
  );
};
