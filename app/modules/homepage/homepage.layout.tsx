import type { MetaFunction } from "@remix-run/node";
import { Link, Outlet } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "Ai Remix app" },
    { name: "description", content: "welcome to AI remix app" },
  ];
};

export default function HomepageLayout() {
  return (
    <main className="font-sans p-4">
      <h1 className="text-3xl">Welcome to Remix App</h1>
      <ul className="list-disc mt-4 pl-6 space-y-2">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
      </ul>
      <div>
        <Outlet />
      </div>
    </main>
  );
}
