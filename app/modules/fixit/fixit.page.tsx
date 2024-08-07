import type { ActionFunctionArgs } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import { getAllSkillsForIssue } from "./skills.server.ts";
import { getTechniciansWithSkills } from "./technicians.server.ts";

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const issue = formData.get("issue") as string | null;

  if (!issue) {
    throw new Error("No issues submitted");
  }

  const response = await getAllSkillsForIssue(issue);

  if (!response) {
    throw {
      error: "No technicians found",
    };
  }

  const matchingTechnicicans = await getTechniciansWithSkills(response);

  return { techniciansTable: matchingTechnicicans };
}

export default function Fixit() {
  const actionData = useActionData<typeof action>();

  console.log({ actionData });
  return (
    <div>
      <Form method="post">
        <input type="text" name="issue" placeholder="Tell us about the issue" />
        <button type="submit">Submit</button>
      </Form>
      <div>
        <header>Found Technicians</header>
        <ul>
          {actionData?.techniciansTable?.map((t) => (
            <li key={t.id}>
              {t.firstName} {t.lastName} - {t.email}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
