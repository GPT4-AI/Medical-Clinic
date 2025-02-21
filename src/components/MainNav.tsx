import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";
import {
  Users,
  UserCog,
  Calendar,
  MessageSquare,
  ClipboardList,
  Receipt,
  CreditCard,
  Clock,
  Bell,
} from "lucide-react";

const menuItems = [
  { name: "Patients", icon: Users, href: "/patients" },
  { name: "Doctors", icon: UserCog, href: "/doctors" },
  { name: "Appointments", icon: Calendar, href: "/appointments" },
  { name: "Consultations", icon: MessageSquare, href: "/consultations" },
  { name: "Treatments", icon: ClipboardList, href: "/treatments" },
  { name: "Invoices", icon: Receipt, href: "/invoices" },
  { name: "Payments", icon: CreditCard, href: "/payments" },
  { name: "Schedules", icon: Clock, href: "/schedules" },
  { name: "Notifications", icon: Bell, href: "/notifications" },
];

export function MainNav() {
  const location = useLocation();

  return (
    <nav className="flex flex-col space-y-1">
      {menuItems.map((item) => {
        const isActive = location.pathname === item.href;
        const Icon = item.icon;

        return (
          <Link
            key={item.href}
            to={item.href}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
              isActive ? "bg-accent" : "transparent",
            )}
          >
            <Icon className="h-4 w-4" />
            {item.name}
          </Link>
        );
      })}
    </nav>
  );
}
