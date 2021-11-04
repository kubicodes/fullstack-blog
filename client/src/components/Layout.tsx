import { LayoutProps } from "framer-motion";
import React from "react";
import { NavBar } from "./NavBar";
import { Wrapper } from "./Wrapper";

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <NavBar />
      <Wrapper>{children}</Wrapper>
    </>
  );
};
