import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "../../../components/ui/Button";
import { InputField } from "../../../components/ui/InputField";
import { Modal } from "../../../components/ui/Modal";
import { SelectField } from "../../../components/ui/SelectField";
import { TextArea } from "../../../components/ui/TextArea";
import { APPLICATION_STATUS } from "../applications.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { applicationSchema } from "../applications.schema";
import { z } from "zod";
import { __API_URL__ } from "../../../constants";
import toast from "react-hot-toast";
import { createApplication } from "../handlers/createApplication";

type CreateApplicationProps = {
  isOpen: boolean;
  close: () => void;
  userId: string;
};

type ApplicationSchemaInputs = z.infer<typeof applicationSchema>;

export const CreateApplication = ({ close, isOpen, userId }: CreateApplicationProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ApplicationSchemaInputs>({
    resolver: zodResolver(applicationSchema),
  });

  const onSubmit: SubmitHandler<ApplicationSchemaInputs> = async (values) => {
    try {
      const data = await createApplication({
        ...values,
        userId,
      });

      console.log(data);
    } catch (error) {
      if (error instanceof Error) {
        return toast.error(error.message);
      }
      toast.error("create application failed");
    }
  };

  return (
    <Modal close={close} isOpen={isOpen} title="Create Job Application">
      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-4 gap-2">
        <InputField
          label="Company Name *"
          {...register("companyName")}
          fieldError={errors.companyName}
          containerClassName="col-span-4"
        />
        <InputField
          label="Company Website"
          {...register("companyWebsite")}
          fieldError={errors.companyWebsite}
          containerClassName="col-span-2"
        />
        <InputField
          label="Contact Person"
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

        <Button type="submit" className="col-span-4 justify-self-end px-16">
          Create
        </Button>
      </form>
    </Modal>
  );
};
