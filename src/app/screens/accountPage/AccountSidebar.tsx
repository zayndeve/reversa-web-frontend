import React from "react";
import "../../css/accountPage.css";
import {
  User,
  ShoppingBag,
  MapPin,
  Settings,
} from "lucide-react";

interface SidebarProps {
  onSelect: (tab: string) => void;
  activeTab: string;
}

const AccountSidebar: React.FC<SidebarProps> = ({ onSelect, activeTab }) => {
  const tabs = [
    { label: "User Info", key: "userinfo", icon: <User size={18} /> },
    { label: "Orders", key: "orders", icon: <ShoppingBag size={18} /> },
    { label: "Account Settings", key: "settings", icon: <Settings size={18} /> },
  ];
  
  

  return (
    <div className="account-sidebar">
      <h3>My Account</h3>
      <ul>
        {tabs.map((tab) => (
          <li
            key={tab.key}
            className={activeTab === tab.key ? "active" : ""}
            onClick={() => onSelect(tab.key)}
          >
            <div className="tab-content">
              {tab.icon}
              <span>{tab.label}</span>
            </div>
            {activeTab === tab.key && <div className="active-line" />}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AccountSidebar;
