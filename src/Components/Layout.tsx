import { Navbar, Sidebar, Footer } from "./Components";
import React, { useState } from "react";
import { Menu } from "./Icons/Icons";

interface LayoutProps {
  children: JSX.Element;
  closeSidebar?: boolean;
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}
export default function Layout({ children, closeSidebar }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <Navbar>
        <button
          type="button"
          className="-mx-2 inline-flex items-center  justify-center rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
          onClick={() => setSidebarOpen(true)}
        >
          <Menu className="h-6 w-6 stroke-gray-400" aria-hidden="true" />
        </button>
      </Navbar>

      <Sidebar
        isOpen={sidebarOpen}
        closeSidebar={closeSidebar}
        setSidebarOpen={setSidebarOpen}
      ></Sidebar>
      <div className="lg:hidden">
        <Footer />
      </div>

      <div className={classNames(closeSidebar ? "lg:pl-20" : "lg:pl-56")}>
        <main className="py-24">
          <div className=" mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-x-4">{children}</div>
          </div>
        </main>
      </div>
    </>
  );
}
