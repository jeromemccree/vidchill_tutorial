import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { ClockRewind, Folder, Home, UserCheck } from "./Icons/Icons";

interface NavigationItem {
  name: string;
  path?: string;
  icon: (className: string) => JSX.Element;
  current: boolean;
}
function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Footer() {
  const router = useRouter();
  const { data: sessionData } = useSession();
  const userId = sessionData?.user.id;
  const tabs: NavigationItem[] = [
    {
      name: "Home",
      path: `/`,
      icon: (className) => <Home className={className} />,
      current: router.pathname === `/`,
    },

    {
      name: "History",
      path: userId ? `/playlist/History` : "sign-in",
      icon: (className) => <ClockRewind className={className} />,
      current: router.pathname === `/playlist/History`,
    },
    {
      name: "Library",
      path: userId ? `/${String(userId)}/ProfilePlaylists` : "sign-in",
      icon: (className) => <Folder className={className} />,
      current: router.asPath === `/${String(userId)}/ProfilePlaylists`,
    },
    {
      name: "Following",
      path: userId ? `/${String(userId)}/ProfileFollowing` : "sign-in",
      icon: (className) => <UserCheck className={className} />,
      current: router.asPath === `/${String(userId)}/ProfileFollowing`,
    },
  ];
  return (
    <footer className="fixed bottom-0 z-50 w-full border border-gray-200 bg-white shadow-sm ">
      <nav className="isolate flex rounded-lg shadow" aria-label="Tabs">
        {tabs.map((tab) => (
          <Link
            key={tab.name}
            href="#"
            className={classNames(
              tab.current ? " text-primary-600" : "text-gray-600",
              "group relative min-w-0 flex-1 overflow-hidden px-4 py-4 text-center text-xs font-medium  hover:bg-gray-50 focus:z-10"
            )}
            onClick={(e) => {
              e.preventDefault();
              if (tab.path === "sign-in") {
                void signIn();
              } else {
                void router.push(tab.path || "/");
              }
            }}
          >
            <div className="flex flex-col items-center ">
              {tab.current
                ? tab.icon("h-4 w-4 shrink-0 stroke-primary-600 ")
                : tab.icon("h-4 w-4 shrink-0  stroke-gray-600")}
              <span>{tab.name}</span>
            </div>
          </Link>
        ))}
      </nav>
    </footer>
  );
}
