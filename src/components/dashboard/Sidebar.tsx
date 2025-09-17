import { useState } from "react";
import styled from "styled-components";
import {
  Home,
  SquareChevronRight,
  SquareChevronLeft,
  LogOut,
} from "lucide-react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

const SidebarContainer = styled.div<{ $collapsed: boolean }>`
  width: ${({ $collapsed }) => ($collapsed ? "60px" : "150px")};
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.primary};
  color: #ffffff;
  display: flex;
  flex-direction: column;
  padding: 20px 10px;
  transition: width 0.3s ease;
  position: sticky;
  top: 0;
`;

const ToggleButton = styled.button<{ $collapsed: boolean }>`
  background: none;
  border: none;
  color: #ffffff;
  font-size: 1.5rem;
  cursor: pointer;
  margin-bottom: 20px;
  align-self: ${({ $collapsed }) => ($collapsed ? "center" : "flex-end")};
`;

const SidebarItem = styled.div<{ $collapsed: boolean }>`
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 15px 0;
  cursor: pointer;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  opacity: 1;
  transition: all 0.2s ease;
  justify-content: ${({ $collapsed }) => ($collapsed ? "center" : "center")};
  span {
    display: ${({ $collapsed }) => ($collapsed ? "none" : "inline")};
  }

  &:hover {
    opacity: 0.8;
  }
`;

export const Sidebar = () => {
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <SidebarContainer $collapsed={collapsed}>
      <ToggleButton
        onClick={() => setCollapsed(!collapsed)}
        $collapsed={collapsed}
      >
        {collapsed ? <SquareChevronRight /> : <SquareChevronLeft />}
      </ToggleButton>
      <SidebarItem $collapsed={collapsed}>
        <Home size={20} /> <span>Home</span>
      </SidebarItem>

      <SidebarItem
        onClick={() => {
          Cookies.remove("token");
          router.push("/");
        }}
        $collapsed={collapsed}
        style={{ marginTop: "auto" }}
      >
        <LogOut size={20} /> <span>Logout</span>
      </SidebarItem>
    </SidebarContainer>
  );
};
