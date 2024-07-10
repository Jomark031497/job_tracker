import { InputField } from "../../../components/ui/InputField";
import { Modal } from "../../../components/ui/Modal";

type CreateApplicationProps = {
  isOpen: boolean;
  close: () => void;
};

export const CreateApplication = ({ close, isOpen }: CreateApplicationProps) => {
  return (
    <Modal close={close} isOpen={isOpen} title="Create Job Application">
      <form>
        <InputField label="Company Name *" />
        <InputField label="Company Website" />
        <InputField label="Role *" />
        <InputField label="Status" />
        <InputField label="Application Date" />
      </form>
    </Modal>
  );
};
