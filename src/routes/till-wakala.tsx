import { createFileRoute } from "@tanstack/react-router";
import { ApplicationForm } from "@/components/ApplicationForm";

export const Route = createFileRoute("/till-wakala")({
  head: () => ({ meta: [{ title: "Sajili Wakala HaloPesa — GJ General Traders" }] }),
  component: () => (
    <ApplicationForm
      type="wakala"
      title="Sajili Wakala HaloPesa"
      subtitle="Jaza taarifa zako sahihi na pakia nyaraka zinazohitajika"
    />
  ),
});
