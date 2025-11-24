import { Users, Building2, Gift, Ticket, LayoutDashboard, Rss, Megaphone, BarChart3 } from "lucide-react";

interface SidebarProps {
  activeSection: string;
  onNavigate: (section: string) => void;
}

export function Sidebar({ activeSection, onNavigate }: SidebarProps) {
  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "users", label: "Users", icon: Users },
    { id: "businesses", label: "Businesses", icon: Building2 },
    { id: "perks", label: "Perks", icon: Gift },
    { id: "feeds", label: "Feeds", icon: Rss },
    { id: "announcements", label: "Announcements", icon: Megaphone },
    { id: "voting", label: "Voting & Polls", icon: BarChart3 },
    { id: "invite-codes", label: "Invite Codes", icon: Ticket },
  ];

  return (
    <div className="w-64 bg-sidebar border-r border-sidebar-border h-screen fixed left-0 top-0 flex flex-col">
      <div className="p-6 border-b border-sidebar-border">
        <h1 className="text-primary">CRCL Admin</h1>
        <p className="text-muted-foreground text-sm mt-1">Saudi Arabia</p>
      </div>
      
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            
            return (
              <li key={item.id}>
                <button
                  onClick={() => onNavigate(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-sidebar-foreground hover:bg-sidebar-accent"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
      
      <div className="p-4 border-t border-sidebar-border">
        <p className="text-xs text-muted-foreground">© 2025 Private CRCL</p>
      </div>
    </div>
  );
}
