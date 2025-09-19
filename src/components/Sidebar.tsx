import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import {
  Home,
  SquareChevronRight,
  SquareChevronLeft,
  LogOut,
} from "lucide-react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useWindowSize } from "@/hooks/useWindowSize";

const SidebarContainer = styled.div<{ $collapsed: boolean }>`
  width: ${({ $collapsed }) => ($collapsed ? "50px" : "130px")};
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.primary};
  color: #ffffff;
  display: flex;
  flex-direction: column;
  padding: 20px 10px;
  transition: width 0.3s ease;
  position: sticky;
  top: 0;
  box-sizing: border-box;
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
  justify-content: center;

  span {
    display: ${({ $collapsed }) => ($collapsed ? "none" : "inline")};
  }
`;

export const Sidebar = () => {
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  const { width } = useWindowSize();
  const mobileDesign = width < 500;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const setVar = () => {
      const w = el.offsetWidth;
      document.documentElement.style.setProperty("--sidebar-width", `${w}px`);
    };

    setVar();

    let ro: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined") {
      ro = new ResizeObserver(() => requestAnimationFrame(setVar));
      ro.observe(el);
    }

    const onResize = () => requestAnimationFrame(setVar);
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      if (ro) ro.disconnect();
    };
  }, [collapsed]);

  useEffect(() => {
    if (mobileDesign) {
      setCollapsed(true);
    }
  }, [width]);

  return (
    <SidebarContainer ref={ref} $collapsed={collapsed}>
      {!mobileDesign && (
        <ToggleButton
          onClick={() => setCollapsed((s) => !s)}
          $collapsed={collapsed}
        >
          {collapsed ? <SquareChevronRight /> : <SquareChevronLeft />}
        </ToggleButton>
      )}

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
