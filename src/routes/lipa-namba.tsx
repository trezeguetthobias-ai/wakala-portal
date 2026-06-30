import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ApplicationForm } from "@/components/ApplicationForm";

export const Route = createFileRoute("/lipa-namba")({
  head: () => ({ meta: [{ title: "Sajili Lipa HaloPesa — GJ General Traders" }] }),
  component: LipaPage,
});

function LipaPage() {
  const [category, setCategory] = useState<"MACHINGA"|"BINAFSI"|"COMPANY_LIMITED">("MACHINGA");
  return (
    <ApplicationForm
      type="lipa"
      title="Sajili Lipa HaloPesa"
      subtitle="Chagua aina ya biashara yako kisha jaza fomu"
      category={category}
      onCategoryChange={setCategory}
    />
  );
}
