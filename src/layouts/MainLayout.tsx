import { MainNav } from "@/components/MainNav";

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0">
        <div className="flex flex-col flex-1 min-h-0 bg-card">
          {/* Logo area */}
          <div className="flex items-center h-16 px-4 border-b">
            <span className="text-lg font-semibold">Medical Clinic</span>
          </div>
          {/* Nav */}
          <div className="flex-1 px-3 py-4 overflow-y-auto">
            <MainNav />
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64 flex flex-col flex-1">
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
