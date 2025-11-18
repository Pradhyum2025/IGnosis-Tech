// ---------------------------------------------------------------------
// <copyright file="app-sidebar.tsx" company="iGnosis Tech">
// Copyright (c) iGnosis Tech. All rights reserved.
// </copyright>
// ---------------------------------------------------------------------

import * as React from "react"
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { BiSolidDashboard } from "react-icons/bi"
import { SiGoogleclassroom } from "react-icons/si";

import { FaMoneyCheckDollar } from "react-icons/fa6"

// This is sample data.
const data = {
   user: {
    name: "Pradhyum",
    email: "png@gamil.com",
    avatar: "https://api.dicebear.com/9.x/Pradhyum/svg",
  },
  teams: [
    {
      name: "iGnosis Tech",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "My Products",
      url: "/",
      icon: BiSolidDashboard,
      isActive: true,
    
    },
     {
      title: "Pricing",
      url: "#",
      icon: FaMoneyCheckDollar,
      isActive: true,
     
    },
    {
      title: "IGnosis Schedule",
      url: "#",
      icon: SiGoogleclassroom
    },
    {
      title: "Models",
      url: "#",
      icon: Bot,
     
    },
   
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props} className="w-">
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain as any} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
