"use client";

import Link from "next/link";

import { Button } from "@/components/shadcn/ui/button";

type Props = {
  reset: () => void;
};

export const UnexpectedError = ({ reset }: Props) => {
  return (
    <div className="flex h-screen flex-col items-center justify-center space-y-8">
      <div className="flex flex-col items-center justify-center">
        <h2 className="font-medium text-4xl">予期しないエラーが発生しました</h2>
      </div>
      <div className="flex items-center justify-center space-x-6">
        <Button asChild>
          <Link href="/">トップページへ</Link>
        </Button>
        <Button onClick={reset}>再試行</Button>
      </div>
    </div>
  );
};
