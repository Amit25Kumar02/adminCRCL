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

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setActiveSection("dashboard");
  };

  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return <Dashboard />;
      case "users":
        return <UsersManagement />;
      case "businesses":
        return <BusinessesManagement />;
      case "perks":
        return <PerksManagement />;
      case "feeds":
        return <FeedsManagement />;
      case "announcements":
        return <AnnouncementsManagement />;
      case "voting":
        return <VotingManagement />;
      case "invite-codes":
        return <InviteCodes />;
      default:
        return <Dashboard />;
    }
  };

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="dark min-h-screen bg-background text-foreground">
      <Sidebar activeSection={activeSection} onNavigate={setActiveSection} />
      
      <div className="ml-64">
        <TopNav onLogout={handleLogout} />
        
        <main className="p-8">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}
