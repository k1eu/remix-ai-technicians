import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { Link, Outlet, useLoaderData } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "Ai Remix app" },
    { name: "description", content: "welcome to AI remix app" },
  ];
};

export function loader({
  context,
}: LoaderFunctionArgs & { context: { data: boolean } }) {
  console.log(context.data);

  return { data: context.data };
}

export default function HomepageLayout() {
  const data = useLoaderData<typeof loader>();

  return (
    <main className="font-sans p-4">
      <h1 className="text-3xl">Welcome to Remix App {`${data.data}`}</h1>
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
