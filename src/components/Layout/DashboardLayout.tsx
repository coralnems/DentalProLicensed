import React from 'react';
import { Outlet } from 'react-router-dom';
import {
  Sidebar,
  SidebarProvider,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
  SidebarInset,
} from '@/components/ui/sidebar';
import { Activity } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useNavigation } from '@/hooks/use-navigation';

export default function DashboardLayout() {
  const navigate = useNavigate();
  const { navigationItems } = useNavigation();

  return (
    <SidebarProvider defaultOpen>
      <div className="flex min-h-screen w-full bg-gray-50">
        <Sidebar variant="inset" collapsible="icon">
          <SidebarHeader className="border-b">
            <div className="flex items-center gap-2 px-2">
              <Activity className="h-6 w-6" />
              <span className="font-semibold">DentalPro</span>
            </div>
            <SidebarTrigger />
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton
                    onClick={() => navigate(item.href)}
                    tooltip={item.name}
                  >
                    <item.icon />
                    <span>{item.name}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
        </Sidebar>
        <SidebarInset className="flex-1">
          <main className="w-full h-full p-6">
            <div className="max-w-[2000px] mx-auto">
              <Outlet />
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}