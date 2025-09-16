import StyledComponentsRegistry from "@/lib/registry";
import { CustomThemeProvider } from "@/theme/themeProvider";
import { cookies } from "next/headers";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const theme = cookieStore.get("theme")?.value === "dark" ? "dark" : "light";

  return (
    <html>
      <body>
        <StyledComponentsRegistry>
          <CustomThemeProvider initialTheme={theme}>
            {children}
          </CustomThemeProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
