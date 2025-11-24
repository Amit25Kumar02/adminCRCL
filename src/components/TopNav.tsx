import { Bell, User, LogOut } from "lucide-react";
import { Badge } from "./ui/badge";

interface TopNavProps {
  onLogout?: () => void;
}

export function TopNav({ onLogout }: TopNavProps) {
  return (
    <div className="h-16 bg-card border-b border-border flex items-center justify-between px-8">
      <div>
        <h2>Admin Dashboard</h2>
      </div>
      
      <div className="flex items-center gap-4">
        <button className="relative p-2 hover:bg-muted rounded-lg transition-colors">
          <Bell className="w-5 h-5" />
          <Badge className="absolute -top-1 -right-1 bg-primary text-primary-foreground w-5 h-5 flex items-center justify-center p-0 text-xs">
            3
          </Badge>
        </button>
        
        <div className="flex items-center gap-3 pl-4 border-l border-border">
          <div className="text-right">
            <p className="text-sm">Admin User</p>
            <p className="text-xs text-muted-foreground">admin@crcl.sa</p>
          </div>
          <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
            <User className="w-5 h-5 text-primary-foreground" />
          </div>
        </div>
        
        <button 
          onClick={onLogout}
          className="p-2 hover:bg-muted rounded-lg transition-colors text-muted-foreground hover:text-foreground"
          title="Sign out"
        >
          <LogOut className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
