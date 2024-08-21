import type { ActionFunctionArgs } from "@remix-run/node";
import { Form, useActionData, useNavigation } from "@remix-run/react";
import { getAllSkillsForIssue as getSkillEmbeddingsForIssue } from "./skills.server.ts";
import { getTechniciansWithSkills } from "./technicians.server.ts";
import { parseFormDataRequest } from "@k1eu/typed-formdata";

export async function action({ request }: ActionFunctionArgs) {
  const formData = await parseFormDataRequest<{
    issue: string;
    startTime: string;
  }>(request);
  const issue = formData.get("issue");
  const startTime = formData.get("startTime");

  if (!startTime) {
    throw new Error("No start time submitted");
  }

  if (!issue) {
    throw new Error("No issues submitted");
  }

  const response = await getSkillEmbeddingsForIssue(issue);

  if (!response) {
    return {
      techniciansTable: [],
    };
  }

  const startTimeDate = new Date(startTime);

  const matchingTechnicicans = await getTechniciansWithSkills(
    response,
    startTimeDate
  );

  return { techniciansTable: matchingTechnicicans };
}

export default function Fixit() {
  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();

  return (
    <div>
      <Form method="post">
        <label className="block">
          {" "}
          What is the issue?
          <input
            type="text"
            name="issue"
            placeholder="Tell us about the issue"
          />
        </label>
        <div>
          <label className="block">
            When do youu need the technician?
            <input
              type="date"
              name="startTime"
              placeholder="When do you need the technician"
            />
          </label>
        </div>
        <button type="submit">Submit</button>{" "}
        {navigation.state === "submitting" ? <p>Fetching data...</p> : null}
      </Form>
      <div>
        {actionData && (
          <>
            <header>Technicians</header>
            <ul>
              {actionData?.techniciansTable?.map((t) => (
                <li key={t.id}>
                  {t.firstName} {t.lastName} - {t.email}
                </li>
              ))}
              {actionData !== undefined &&
              actionData.techniciansTable.length === 0
                ? "No technicians found"
                : null}
            </ul>
          </>
        )}
      </div>
    </div>
  );
}
