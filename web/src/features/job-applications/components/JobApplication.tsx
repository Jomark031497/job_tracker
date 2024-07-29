import { useParams } from "react-router-dom";
import { useJobApplication } from "../hooks/useJobApplication";
import { twMerge } from "tailwind-merge";
import { formatToDate } from "../../../utils/formatToDate";
import { formatToCurrency } from "../../../utils/formatToCurrency";
import { FaRegEdit } from "react-icons/fa";
import { lazily } from "react-lazily";
import { useToggle } from "../../miscs/hooks/useToggle";

const { UpdateJobApplication } = lazily(() => import("./UpdateJobApplication"));

export const JobApplication = () => {
  const { id } = useParams();

  if (!id) {
    return null;
  }

  const { close: closeUpdateModal, isOpen: isUpdateModalOpen, open: openUpdateModal } = useToggle();

  const { data: jobApplication } = useJobApplication(id);

  return (
    <>
      <div className="flex flex-col gap-4">
        <div>
          <button onClick={openUpdateModal} className="text-xl">
            <FaRegEdit />
          </button>
        </div>

        <section className="rounded border bg-white p-4 shadow">
          <h2 className="mb-4 text-lg font-semibold text-gray-500">Company Details</h2>

          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "Name", value: jobApplication.companyName, colSpan: 2 },
              { label: "Address", value: jobApplication.companyAddress },
              { label: "Website", value: jobApplication.companyWebsite },
              { label: "Contact Person", value: jobApplication.contactPerson },
            ].map((item) => (
              <div key={item.label} className={`col-span-${item.colSpan}`}>
                <p className="text-sm text-gray-500">{item.label}</p>
                <p className={twMerge("text-sm font-medium", !item.value && "font-normal italic text-gray-500")}>
                  {item.value || "N/A"}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded border bg-white p-4 shadow">
          <h2 className="mb-4 text-lg font-semibold text-gray-500">Application Details</h2>

          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "Role", value: jobApplication.role, colSpan: 2 },
              { label: "Expected Salary", value: formatToCurrency(jobApplication.expectedSalary) },
              { label: "Platform", value: jobApplication.platform },
              { label: "Application Date", value: formatToDate(jobApplication.applicationDate) },
              { label: "Access", value: jobApplication.isPublic ? "Public" : "Private" },
              { label: "Description", value: jobApplication.description, colSpan: 2 },
            ].map((item) => (
              <div key={item.label} className={`col-span-${item.colSpan || "1"}`}>
                <p className="text-sm text-gray-500">{item.label}</p>
                <p className={twMerge("text-sm font-semibold", !item.value && "font-normal italic text-gray-500")}>
                  {item.value || "N/A"}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>

      <UpdateJobApplication close={closeUpdateModal} isOpen={isUpdateModalOpen} jobApplication={jobApplication} />
    </>
  );
};
