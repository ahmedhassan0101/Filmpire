import SidebarContent from "./sidebar-content";

export default function Sidebar() {
  return (
    <aside className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-30 lg:block lg:w-64 lg:bg-background lg:border-r lg:border-border">
      <SidebarContent />
    </aside>
  );
}
