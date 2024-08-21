import { Form, useLoaderData } from "@remix-run/react";
import { db } from "../database/db.ts";
import { openAIClient } from "../llm/openai.ts";
import { skillsTable } from "../database/schema.ts";
import { eq } from "drizzle-orm";

export async function loader() {
  const skills = await db.query.skillsTable.findMany();

  return { skills };
}

export async function action() {
  const skills = await db.query.skillsTable.findMany();
  const skillsWithEmbeddings: {
    id: number;
    name: string;
    embedding: null | number[];
  }[] = skills.map((s) => ({ ...s, embedding: null }));
  const skillNames = skills.map((s) => s.name);

  const res = await openAIClient.embeddings.create({
    model: "text-embedding-3-small",
    input: skillNames,
  });

  if (res.data.length === skills.length) {
    for (let i = 0; i < res.data.length; i++) {
      skillsWithEmbeddings[i].embedding = res.data[i].embedding;
    }

    await db.transaction(async (tx) => {
      await Promise.all(
        skillsWithEmbeddings.map(async (s) => {
          console.log({ s });
          await tx
            .update(skillsTable)
            .set({
              embedding: s.embedding,
            })
            .where(eq(skillsTable.id, s.id));
        })
      );
    });
  }

  return {};
}

export default function SkillsPage() {
  const { skills } = useLoaderData<typeof loader>();
  return (
    <div>
      <h1>Skills</h1>
      <Form method="post">
        <button>Generate embeddings</button>
      </Form>
      <ol className="list-decimal ml-4">
        {skills.map((s) => (
          <li key={s.id}>{s.name}</li>
        ))}
      </ol>
    </div>
  );
}
