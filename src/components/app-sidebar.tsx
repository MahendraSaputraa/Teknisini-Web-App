"use client";

import * as React from "react";

import { NavDocuments } from "@/components/nav-documents";
import { NavMain } from "@/components/nav-main";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  LayoutDashboardIcon,
  UsersIcon,
  CommandIcon,
  CreditCard,
  Wrench,
  Receipt,
  Workflow,
  TagIcon,
} from "lucide-react";

const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/admin/dashboard",
      icon: <LayoutDashboardIcon />,
    },
    {
      title: "Order",
      url: "/admin/order",
      icon: <Receipt />,
    },
    {
      title: "Tehnicians",
      url: "/admin/technician",
      icon: <Wrench />,
    },
    {
      title: "Services",
      url: "/admin/service",
      icon: <Workflow />,
    },
    {
      title: "Catagories",
      url: "/admin/category",
      icon: <TagIcon />,
    },
  ],
  // navClouds: [
  //   {
  //     title: "Capture",
  //     icon: (
  //       <CameraIcon
  //       />
  //     ),
  //     isActive: true,
  //     url: "#",
  //     items: [
  //       {
  //         title: "Active Proposals",
  //         url: "#",
  //       },
  //       {
  //         title: "Archived",
  //         url: "#",
  //       },
  //     ],
  //   },
  //   {
  //     title: "Proposal",
  //     icon: (
  //       <FileTextIcon
  //       />
  //     ),
  //     url: "#",
  //     items: [
  //       {
  //         title: "Active Proposals",
  //         url: "#",
  //       },
  //       {
  //         title: "Archived",
  //         url: "#",
  //       },
  //     ],
  //   },
  //   {
  //     title: "Prompts",
  //     icon: (
  //       <FileTextIcon
  //       />
  //     ),
  //     url: "#",
  //     items: [
  //       {
  //         title: "Active Proposals",
  //         url: "#",
  //       },
  //       {
  //         title: "Archived",
  //         url: "#",
  //       },
  //     ],
  //   },
  // ],
  // navSecondary: [
  //   {
  //     title: "Settings",
  //     url: "#",
  //     icon: (
  //       <Settings2Icon
  //       />
  //     ),
  //   },
  //   {
  //     title: "Get Help",
  //     url: "#",
  //     icon: (
  //       <CircleHelpIcon
  //       />
  //     ),
  //   },
  //   {
  //     title: "Search",
  //     url: "#",
  //     icon: (
  //       <SearchIcon
  //       />
  //     ),
  //   },
  // ],
  // documents: [
  //   {
  //     name: "Data Library",
  //     url: "#",
  //     icon: (
  //       <DatabaseIcon
  //       />
  //     ),
  //   },
  //   {
  //     name: "Reports",
  //     url: "#",
  //     icon: (
  //       <FileChartColumnIcon
  //       />
  //     ),
  //   },
  //   {
  //     name: "Word Assistant",
  //     url: "#",
  //     icon: (
  //       <FileIcon
  //       />
  //     ),
  //   },
  // ],
};

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  currentUser?: any;
}
export function AppSidebar({ currentUser, ...props }: AppSidebarProps) {
  const userData = {
    name: currentUser?.name || "Guest User",
    email: currentUser?.email || "Guest",
    avatar: "/avatars/shadcn.jpg",
    role: currentUser?.role || "guest",
  };

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:p-1.5!"
            >
              <a href="#">
                <CommandIcon className="size-5!" />
                <span className="text-base font-semibold">Teknisini</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        {/* <NavDocuments items={data.documents} />
        <NavSecondary items={data.navSecondary} className="mt-auto" /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={userData} />
      </SidebarFooter>
    </Sidebar>
  );
}
