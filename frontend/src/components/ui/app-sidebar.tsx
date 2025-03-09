import { ChevronUp, CodeXml, Plus, User2 } from "lucide-react";

import { Link } from "react-router";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { DropdownMenu } from "./dropdown-menu";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";

const items = [
  {
    title: "Flux - Apache Kafka clone",
    url: "/flux",
    icon: CodeXml,
  },
  {
    title: "Instagram clone",
    url: "#",
    icon: CodeXml,
  },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <div className="flex items-center justify-center px-6 py-4 text-2xl shadow-sm ">
        <Link to={"/"}>
          <span className="text-2xl font-bold leading-snug text-transparent bg-clip-text text-center bg-gradient-to-r from-blue-500 to-purple-500 font-serif">
            Atlas
          </span>
        </Link>
      </div>
      <button className="mt-3 mb-2 w-full py-2 px-4 bg-blue-600 text-white hover:bg-blue-700 cursor-pointer flex items-center justify-center space-x-3">
        <Plus size={20} />
        <span>New Roadmap</span>
      </button>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Your Past Roadmaps</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton className="cursor-pointer">
                  <User2 /> Tasnim F.
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="w-[--radix-popper-anchor-width]"
              >
                <DropdownMenuItem>
                  <span>Account</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}

export default AppSidebar;
