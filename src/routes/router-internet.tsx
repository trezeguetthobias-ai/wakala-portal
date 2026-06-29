import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/router-internet")({
  head: () => ({ meta: [{ title: "Router Unlimited Internet — GJ General Traders" }] }),
  component: RouterInternetPage,
});

function RouterInternetPage() {
  return (
    <main className="page-shell">
      <h1 className="page-title">Router Unlimited Internet</h1>
      <p className="page-subtitle">Huduma hii inakuja hivi karibuni. Wasiliana nasi kwa maelezo zaidi.</p>
      <Link to="/" className="btn-secondary" style={{ marginTop: "1.5rem", display: "inline-block" }}>
        Rudi Nyumbani
      </Link>
    </main>
  );
}
