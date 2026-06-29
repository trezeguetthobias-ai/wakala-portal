import { createFileRoute } from "@tanstack/react-router";
import { ApplicationForm } from "@/components/ApplicationForm";

export const Route = createFileRoute("/voda")({
  head: () => ({ meta: [{ title: "Sajili Lipa ya Voda — GJ General Traders" }] }),
  component: () => (
    <ApplicationForm
      type="voda"
      title="Sajili Lipa ya Voda"
      subtitle="Kwa namba za Voda ambazo hazijawezeshwa menu ya M-Pesa"
    />
  ),
});
