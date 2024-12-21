import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Activity, Users, Calendar, FileText, Settings, 
  CreditCard, Brain, ClipboardList, FileSignature,
  CircleDot, Moon, Sun, Film, TrendingUp,
  ChevronDown, ChevronRight, Receipt, DollarSign
} from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { useTheme } from '../../hooks/useTheme';

interface SubMenuItem {
  name: string;
  href: string;
  icon: any;
}

interface MenuItem {
  name: string;
  href?: string;
  icon: any;
  subItems?: SubMenuItem[];
}

export default function Sidebar() {
  const user = useAuthStore((state) => state.user);
  const { theme, toggleTheme } = useTheme();
  const [expandedMenus, setExpandedMenus] = useState<string[]>([]);

  const toggleMenu = (menuName: string) => {
    setExpandedMenus(prev => 
      prev.includes(menuName) 
        ? prev.filter(name => name !== menuName)
        : [...prev, menuName]
    );
  };

  const navigation: MenuItem[] = [
    { name: 'Dashboard', href: '/', icon: Activity },
    { name: 'Patients', href: '/patients', icon: Users },
    { name: 'Appointments', href: '/appointments', icon: Calendar },
    { name: 'Medical Records', href: '/records', icon: FileText },
    { name: 'Digital Forms', href: '/forms', icon: FileSignature },
    { name: '3D Teeth Model', href: '/teeth-model', icon: CircleDot },
    { name: 'DICOM Viewer', href: '/dicom', icon: Film },
    { name: 'AI Analysis', href: '/ai-analysis', icon: Brain },
    { name: 'Analytics AI', href: '/analytics', icon: TrendingUp },
    { name: 'Treatment Plans', href: '/treatments', icon: ClipboardList },
    { 
      name: 'Billing & Finance',
      icon: CreditCard,
      subItems: [
        { name: 'Invoices', href: '/billing', icon: Receipt },
        { name: 'Payments', href: '/billing/payments', icon: DollarSign },
        { name: 'Insurance Claims', href: '/billing/claims', icon: FileText }
      ]
    },
    { name: 'Settings', href: '/settings', icon: Settings },
  ];

  return (
    <div className={`w-64 h-screen shadow-lg ${
      theme === 'dark' ? 'bg-gray-900' : 'bg-white'
    }`}>
      <div className="px-4 py-6">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-2">
            <Activity className={`h-8 w-8 ${
              theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
            }`} />
            <span className={`text-xl font-bold ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>DentalPro</span>
          </div>
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-md ${
              theme === 'dark' 
                ? 'text-gray-400 hover:text-white' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
        </div>
        
        <nav className="space-y-1">
          {navigation.map((item) => (
            <div key={item.name}>
              {item.subItems ? (
                <>
                  <button
                    onClick={() => toggleMenu(item.name)}
                    className={`flex items-center w-full px-4 py-2 text-sm font-medium rounded-md ${
                      theme === 'dark'
                        ? 'text-gray-300 hover:bg-gray-800 hover:text-white'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <item.icon className="mr-3 h-5 w-5" />
                    <span className="flex-1">{item.name}</span>
                    {expandedMenus.includes(item.name) ? (
                      <ChevronDown className="h-5 w-5" />
                    ) : (
                      <ChevronRight className="h-5 w-5" />
                    )}
                  </button>
                  {expandedMenus.includes(item.name) && (
                    <div className="ml-4 mt-1 space-y-1">
                      {item.subItems.map((subItem) => (
                        <NavLink
                          key={subItem.href}
                          to={subItem.href}
                          className={({ isActive }) =>
                            `flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                              theme === 'dark'
                                ? isActive
                                  ? 'bg-gray-800 text-white'
                                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                                : isActive
                                  ? 'bg-blue-50 text-blue-600'
                                  : 'text-gray-600 hover:bg-gray-50'
                            }`
                          }
                        >
                          <subItem.icon className="mr-3 h-5 w-5" />
                          {subItem.name}
                        </NavLink>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <NavLink
                  to={item.href!}
                  className={({ isActive }) =>
                    `flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                      theme === 'dark'
                        ? isActive
                          ? 'bg-gray-800 text-white'
                          : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                        : isActive
                          ? 'bg-blue-50 text-blue-600'
                          : 'text-gray-600 hover:bg-gray-50'
                    }`
                  }
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.name}
                </NavLink>
              )}
            </div>
          ))}
        </nav>
      </div>
    </div>
  );
}