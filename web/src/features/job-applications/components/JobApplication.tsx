import { useParams } from "react-router-dom";
import { useJobApplication } from "../hooks/useJobApplication";

export const JobApplication = () => {
  const { id } = useParams();

  if (!id) {
    return null;
  }

  const { data } = useJobApplication(id);

  console.log(data);

  return <>{id}</>;
};
