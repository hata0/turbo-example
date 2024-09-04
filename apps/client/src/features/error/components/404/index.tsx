"use client";

import Link from "next/link";

import { Button } from "@/components/shadcn/ui/button";

export const Custom404 = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center space-y-8">
      <div className="flex flex-col items-center justify-center">
        <h1 className="font-bold text-6xl">404</h1>
        <h2 className="font-medium text-4xl">ページが見つかりませんでした。</h2>
      </div>
      <Button asChild>
        <Link href="/">トップページへ</Link>
      </Button>
    </div>
  );
};
