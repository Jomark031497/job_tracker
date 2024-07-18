import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "../../../components/ui/Button";
import { InputField } from "../../../components/ui/InputField";
import { Modal } from "../../../components/ui/Modal";
import { SelectField } from "../../../components/ui/SelectField";
import { TextArea } from "../../../components/ui/TextArea";
import { APPLICATION_STATUS } from "../applications.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { ApplicationInputs, applicationSchema } from "../applications.schema";
import { __API_URL__ } from "../../../constants";
import toast from "react-hot-toast";
import { createApplication } from "../handlers/createApplication";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../../lib/queryClient";

type CreateApplicationProps = {
  isOpen: boolean;
  close: () => void;
  userId: string;
};

export const CreateApplication = ({ close, isOpen, userId }: CreateApplicationProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isLoading },
  } = useForm<ApplicationInputs>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      expectedSalary: 0,
    },
  });

  const mutation = useMutation({
    mutationFn: (newApplication: ApplicationInputs & { userId: string }) => {
      return createApplication(newApplication);
    },
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      toast.success("Application created");
      reset();
      queryClient.invalidateQueries({
        queryKey: ["userApplications"],
      });
      close();
    },
  });

  const onSubmit: SubmitHandler<ApplicationInputs> = async (values) => {
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
          {APPLICATION_STATUS.map((item) => (
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

        <Button type="submit" disabled={isLoading} className="col-span-4 justify-self-end px-16">
          Create
        </Button>
      </form>
    </Modal>
  );
};
