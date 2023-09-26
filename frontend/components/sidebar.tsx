"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  BriefcaseIcon,
  BugAntIcon,
  CreditCardIcon,
  CursorArrowRippleIcon,
  HashtagIcon,
  LifebuoyIcon,
  UserIcon,
  WrenchScrewdriverIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link";
import { usePathname } from "next/navigation";
interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  //playlists: any;
}

export function Sidebar({ className }: SidebarProps) {
  const sideBarItems = [
    {
      title: "Profile",
      icon: (
        <UserIcon className="h-8 w-8 text-green-400 m-3 border-2 rounded-lg" />
      ),
    },
    {
      title: "Dashboard",
      icon: (
        <HashtagIcon className="h-8 w-8 text-green-400 m-3 border-2 rounded-lg" />
      ),
    },
    {
      title: "NFT Gallary",
      icon: (
        <CreditCardIcon className="h-8 w-8 text-green-400 m-3 border-2 rounded-lg" />
      ),
    },
    {
      title: "Ape Tools",
      icon: (
        <BriefcaseIcon className="h-8 w-8 text-green-400 m-3 border-2 rounded-lg" />
      ),
    },
    {
      title: "Settings",
      icon: (
        <WrenchScrewdriverIcon className="h-8 w-8 text-green-400 m-3 border-2 rounded-lg" />
      ),
    },
    {
      title: "Help",
      icon: (
        <LifebuoyIcon className="h-8 w-8 text-green-400 m-3 border-2 rounded-lg" />
      ),
    },
    {
      title: "Bug Report",
      icon: (
        <BugAntIcon className="h-8 w-8 text-green-400 m-3 border-2 rounded-lg" />
      ),
    },
  ];

  const path = usePathname();
  return (
    <div className={cn("pb-12", className)}>
      <div className="space-y-4 py-4 border-r min-h-screen w-3/12 fixed top-0 left-0">
        <div className="py-2">
          <div className="flex justify-center align-middle item-center p-6">
            <CursorArrowRippleIcon className="h-12 w-12 text-green-500" />
            <div>
              <h2 className="px-4 text-3xl font-semibold tracking-tight">
                transferto
              </h2>
              <p className="text-xs px-4 font-thin uppercase">
                powered by life
              </p>
            </div>
          </div>
          <div className="space-y-1">
            {sideBarItems.map((data) => {
              return (
                <Link
                  key={data.title}
                  href={data.title.replace(" ", "").toLowerCase()}
                >
                  <Button
                    variant="secondary"
                    className={`w-full text-lg justify-start bg-transparent rounded-none hover:bg-green-500 hover:bg-opacity-20 hover:text-green-300 ${
                      path.includes(data.title.replace(" ", "").toLowerCase())
                        ? "bg-green-500 bg-opacity-20 text-green-300"
                        : ""
                    }`}
                  >
                    {data.icon}
                    {data.title}
                  </Button>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
