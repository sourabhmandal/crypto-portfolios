"use client";
import { Button } from "@/components/ui/button";
import type { NextPage } from "next";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface CommingSoonProps extends React.HTMLAttributes<HTMLDivElement> {
  params: { username: string };
}

const CommingSoon: NextPage<CommingSoonProps> = ({
  params,
}: CommingSoonProps) => {
  const path = usePathname();
  return (
    <>
      <div className="flex justify-between border-b items-center">
        <h1 className="text-4xl py-4">Dashboard</h1>
        <div className="space-x-4">
          <Button
            variant={path.includes("portfolio") ? "default" : "secondary"}
            className="rounded-sm"
          >
            <Link href={`/${params.username}/portfolio`}>Portfolio</Link>
          </Button>
          <Button
            variant={path.includes("history") ? "default" : "secondary"}
            className="rounded-sm"
          >
            <Link href={`/${params.username}/history`}>History</Link>
          </Button>
          <Button
            variant={path.includes("analytics") ? "default" : "secondary"}
            className="rounded-sm"
          >
            <Link href={`/${params.username}/analytics`}>Analytics</Link>
          </Button>
        </div>
      </div>
      <div className="flex items-end justify-center h-80">
        <p className="text-4xl my-auto">Page Comming Soon</p>
      </div>
    </>
  );
};
export default CommingSoon;
