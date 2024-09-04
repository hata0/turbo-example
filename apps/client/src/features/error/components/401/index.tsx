"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { Button } from "@/components/shadcn/ui/button";

export const Custom401 = () => {
  const router = useRouter();

  return (
    <div className="flex h-screen flex-col items-center justify-center space-y-8">
      <div className="flex flex-col items-center justify-center">
        <h1 className="font-bold text-6xl">401</h1>
        <h2 className="font-medium text-4xl">認証に失敗しました</h2>
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
