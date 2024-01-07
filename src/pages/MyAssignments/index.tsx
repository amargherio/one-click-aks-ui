import { useEffect } from "react";
import CreateMyAssignmentContainer from "../../components/Lab/Assignment/CreateAssignment/CreateMyAssignmentContainer";
import ListMyAssignment from "../../components/Lab/Assignment/ListMyAssignment";
import Terminal from "../../components/Terminal";
import PageLayout from "../../layouts/PageLayout";

type Props = {};

export default function MyAssignments({}: Props) {
  useEffect(() => {
    document.title = "ACT Labs | My Assignments";
  }, []);

  return (
    <PageLayout heading="My Readiness Lab Assignments">
      <div className="flex flex-col gap-4">
        <CreateMyAssignmentContainer />
        <ListMyAssignment />
      </div>
      <Terminal />
    </PageLayout>
  );
}
