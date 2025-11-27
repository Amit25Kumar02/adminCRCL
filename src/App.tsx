import { useState } from "react";
import { Login } from "./components/Login";
import { Sidebar } from "./components/Sidebar";
import { TopNav } from "./components/TopNav";
import { Dashboard } from "./components/Dashboard";
import { UsersManagement } from "./components/UsersManagement";
import { BusinessesManagement } from "./components/BusinessesManagement";
import { PerksManagement } from "./components/PerksManagement";
import { FeedsManagement } from "./components/FeedsManagement";
import { AnnouncementsManagement } from "./components/AnnouncementsManagement";
import { VotingManagement } from "./components/VotingManagement";
import { InviteCodes } from "./components/InviteCodes";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeSection, setActiveSection] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleLogin = () => setIsAuthenticated(true);

  const handleLogout = () => {
    setIsAuthenticated(false);
    setActiveSection("dashboard");
  };

  const handleToggleSidebar = () => setSidebarOpen((prev) => !prev);

  const renderContent = () => {
    switch (activeSection) {
      case "dashboard": return <Dashboard />;
      case "users": return <UsersManagement />;
      case "businesses": return <BusinessesManagement />;
      case "perks": return <PerksManagement />;
      case "feeds": return <FeedsManagement />;
      case "announcements": return <AnnouncementsManagement />;
      case "voting": return <VotingManagement />;
      case "invite-codes": return <InviteCodes />;
      default: return <Dashboard />;
    }
  };

  if (!isAuthenticated) return <Login onLogin={handleLogin} />;

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      
      {/* Sidebar */}
      <Sidebar 
        activeSection={activeSection} 
        onNavigate={setActiveSection}
        isOpen={sidebarOpen}
      />

      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          sidebarOpen ? "ml-64 " : "ml-0"
        }`}
      >
        <TopNav 
          onLogout={handleLogout}
          onToggleSidebar={handleToggleSidebar}
        />

        <main className="p-6 md:p-8 ">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}
