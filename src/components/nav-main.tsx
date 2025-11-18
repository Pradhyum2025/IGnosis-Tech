// ---------------------------------------------------------------------
// <copyright file="nav-main.tsx" company="iGnosis Tech">
// Copyright (c) iGnosis Tech. All rights reserved.
// </copyright>
// ---------------------------------------------------------------------

"use client"

import { ChevronRight, type LucideIcon } from "lucide-react"

import {
  Collapsible,
} from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"

import { useNavigate } from "react-router-dom"

export function NavMain({
  items,
}: {
  items: {
    title: string
    url: string
    icon?: LucideIcon
    isActive?: boolean

  }[]
}) {
  const {isMobile, toggleSidebar } = useSidebar()

  const navigate = useNavigate()
  const handleClick = (url: string) => {
    if(isMobile) toggleSidebar();

    if (url) {
      navigate(url)
    }
  }


  return (
    <SidebarGroup>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarMenu>

        {items.map((item) => (
          <SidebarMenuButton 
          // disabled={`${item.url !== "/"?true:false}`}
         key={item.title}

          title={`${item.url !== "/"&& "Upcoming.."}`}
          className={`h-8 ${item.url === "/" ?"bg-gray-200 ":"opacity-80 cursor-not-allowed"} `} 
          onClick={(e) => {
            e.preventDefault()
            handleClick(item.url)
          }}
          tooltip={item.title} >
            {item.icon && <item.icon className="text-indigo-600" />}
            <span className={`${item.url === "/" ?"text-indigo-500 hover:text-indigo-600 ":"text-gray-400"} font-[500]`}>{item.title}</span>
          </SidebarMenuButton>

        ))}

      </SidebarMenu>
    </SidebarGroup>
  )
}
