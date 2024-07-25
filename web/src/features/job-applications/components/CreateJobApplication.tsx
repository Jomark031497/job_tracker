import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "../../../components/ui/Button";
import { InputField } from "../../../components/ui/InputField";
import { Modal } from "../../../components/ui/Modal";
import { SelectField } from "../../../components/ui/SelectField";
import { TextArea } from "../../../components/ui/TextArea";
import { zodResolver } from "@hookform/resolvers/zod";
import { JOB_APPLICATION_STATUS, JobApplicationInputs, jobApplicationSchema } from "../applications.schema";
import { __API_URL__ } from "../../../constants";
import toast from "react-hot-toast";
import { createJobApplication } from "../handlers/createJobApplication";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../../lib/queryClient";

type CreateApplicationProps = {
  isOpen: boolean;
  close: () => void;
  userId: string;
};

export const CreateJobApplication = ({ close, isOpen, userId }: CreateApplicationProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isLoading },
  } = useForm<JobApplicationInputs>({
    resolver: zodResolver(jobApplicationSchema),
    defaultValues: {
      expectedSalary: 0,
    },
  });

  const mutation = useMutation({
    mutationFn: (newApplication: JobApplicationInputs & { userId: string }) => {
      return createJobApplication(newApplication);
    },
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      toast.success("Application created");
      reset();
      queryClient.invalidateQueries({
        queryKey: ["userJobApplications"],
      });
      queryClient.invalidateQueries({
        queryKey: ["userJobApplicationsOverview"],
      });
      close();
    },
  });

  const onSubmit: SubmitHandler<JobApplicationInputs> = async (values) => {
    mutation.mutate({
      ...values,
      userId,
    });
  };

  return (
    <Modal close={close} isOpen={isOpen} title="Create Job Application">
      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-4 gap-2">
        <InputField
          label="Company Name *"
          placeholder="Acme Inc."
          {...register("companyName")}
          fieldError={errors.companyName}
          containerClassName="col-span-4"
        />
        <InputField
          label="Company Website"
          placeholder="www.acme.com"
          {...register("companyWebsite")}
          fieldError={errors.companyWebsite}
          containerClassName="col-span-2"
        />
        <InputField
          label="Contact Person"
          placeholder="Wile E Coyote"
          {...register("contactPerson")}
          fieldError={errors.contactPerson}
          containerClassName="col-span-2"
        />

        <TextArea
          label="Description"
          {...register("description")}
          fieldError={errors.description}
          rows={1}
          containerClassName="col-span-4"
        />

        <InputField
          label="Role *"
          placeholder="ex. Web Developer, Accountant, Engineer"
          {...register("role")}
          fieldError={errors.role}
          containerClassName="col-span-2"
        />
        <SelectField
          label="Status *"
          {...register("status")}
          fieldError={errors.status}
          containerClassName="col-span-2"
        >
          {JOB_APPLICATION_STATUS.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </SelectField>

        <InputField
          type="date"
          label="Application Date"
          {...register("applicationDate", {
            valueAsDate: true,
          })}
          fieldError={errors.applicationDate}
          containerClassName="col-span-2"
        />
        <InputField
          label="Platform *"
          placeholder="ex. Linkedin, Twitter, Jobstreet"
          {...register("platform")}
          fieldError={errors.platform}
          containerClassName="col-span-2"
        />
        <InputField
          label="Expected Salary *"
          {...register("expectedSalary", {
            valueAsNumber: true,
          })}
          fieldError={errors.expectedSalary}
          containerClassName="col-span-2"
        />
        <div className="col-span-3 py-2">
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" {...register("isPublic")} className="h-5 w-5" />
            Public
          </label>
        </div>

        <Button type="submit" disabled={isLoading} className="col-span-4 justify-self-end px-16">
          Create
        </Button>
      </form>
    </Modal>
  );
};
