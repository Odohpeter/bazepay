import { createFileRoute, Outlet } from "@tanstack/react-router";
import { PhoneFrame } from "@/components/phone-frame";

export const Route = createFileRoute("/_app")({
  component: AppLayout,
});

function AppLayout() {
  return (
    <PhoneFrame>
      <div className="app-shell min-h-screen md:h-[860px] flex flex-col bg-background">
        <main className="app-content flex-1 overflow-y-auto no-scrollbar">
          <Outlet />
        </main>
      </div>
    </PhoneFrame>
  );
}
