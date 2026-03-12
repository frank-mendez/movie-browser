import { ReactNode } from "react";
import Header from "./Header.tsx";
import Footer from "./Footer.tsx";

const AppLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="w-full jost-font">
      <Header data-testid="header" />
      {children}
      <Footer data-testid="footer" />
    </div>
  );
};

export default AppLayout;
