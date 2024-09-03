"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { Button } from "@/components/shadcn/ui/button";

export const Custom500 = () => {
  const router = useRouter();

  return (
    <div className="flex h-screen flex-col items-center justify-center space-y-8">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-6xl font-bold">500</h1>
        <h2 className="text-4xl font-medium">サーバー側で問題が発生しました。</h2>
      </div>
      <div className="flex items-center justify-center space-x-6">
        <Button asChild>
          <Link href="/">トップページへ</Link>
        </Button>
        <Button onClick={() => router.refresh()}>リロードする</Button>
      </div>
    </div>
  );
};
