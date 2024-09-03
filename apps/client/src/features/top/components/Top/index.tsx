import Link from "next/link";

export const Top = () => {
  return (
    <div>
      <div>hello</div>
      <Link className="text-blue-500" href="/posts">
        投稿一覧
      </Link>
    </div>
  );
};
