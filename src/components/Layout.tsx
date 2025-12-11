import { ReactNode } from "react";
import { NavLink } from "@/components/NavLink";
import { 
  LayoutDashboard, 
  Upload, 
  Settings, 
  BarChart3, 
  FileText, 
  Users, 
  MessageSquare,
  Trophy,
  Network,
  Map
} from "lucide-react";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const navItems = [
    { to: "/", icon: LayoutDashboard, label: "Dashboard" },
    { to: "/upload", icon: Upload, label: "Upload Data" },
    { to: "/ocr-preview", icon: FileText, label: "OCR Preview" },
    { to: "/admin-ingestion", icon: Settings, label: "Admin Panel" },
    { to: "/sku-reconciliation", icon: Users, label: "SKU Mapping" },
    { to: "/analytics", icon: BarChart3, label: "Analytics" },
    { to: "/ai-assistant", icon: MessageSquare, label: "AI Assistant" },
    { to: "/gamification", icon: Trophy, label: "Achievements" },
    { to: "/architecture", icon: Network, label: "Architecture" },
    { to: "/roadmap", icon: Map, label: "Roadmap" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50 w-full">
      {/* Sidebar */}
      <aside className="w-64 bg-card border-r border-border flex flex-col">
        <div className="p-6 border-b border-border">
          <h1 className="text-2xl font-bold text-primary">VDMS</h1>
          <p className="text-sm text-muted-foreground mt-1">Cipla Health Limited</p>
        </div>
        
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-accent transition-all duration-200 group"
              activeClassName="bg-primary-light text-primary font-medium shadow-sm"
            >
              <item.icon className="h-5 w-5 group-hover:scale-110 transition-transform" />
              <span className="text-sm">{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-border">
          <div className="flex items-center gap-3 px-4 py-3">
            <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">
              DS
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-700 truncate">Distributor</p>
              <p className="text-xs text-muted-foreground truncate">distributor@example.com</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
};

export default Layout;
