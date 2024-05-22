import React from "react";
import { Outlet } from "react-router-dom";
import SideMenu from "../components/SideMenu";
import Header from "../components/Header";

const Layout = () => {
  return (
    <div className="flex flex-col h-screen">
      <Header />

      <main className="flex flex-1 overflow-hidden mt-[73px] ">
        <aside className="flex-none">
          <SideMenu />
        </aside>

        <section className="flex-auto overflow-y-auto custom-scrollbar-style">
          <Outlet />
        </section>
      </main>

    </div>
  );
};

export default Layout;
