import { sql } from "drizzle-orm";
import { db } from "../database/db.ts";
import { techniciansTable } from "../database/schema.ts";
import { openAIClient } from "../llm/openai.ts";

export const getAllSkills = async () => {
  const test = await db
    .selectDistinct({
      skill: sql<string>`unnest(${techniciansTable.skills})`,
    })
    .from(techniciansTable);

  const skills = test.map((t) => t.skill);

  return skills;
};

export async function getAllSkillsForIssue(issue: string) {
  const skills = await getAllSkills();

  const resp = await openAIClient.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: `You are a helpful assistant that answers questions based on the provided context. Here is the list of skills that the technician might have: ${skills.join(
          ", "
        )}. You will be given a problem and you will need to find the most matching skills for the problem. If you know the answer return only the matching strings with coma as delimiter and nothing else. If you don't know the answer return "idk" and never make up an answer. If there's no matching skill, return "no skill"`,
      },
      {
        role: "user",
        content: `Issue: ${issue}`,
      },
    ],
    temperature: 0.5,
    max_tokens: 1024,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });

  const response = resp.choices[0].message.content;

  if (!response || response === "idk") {
    return null;
  }

  if (response === "no skill") {
    return null;
  }

  const aiSkills = response.split(",").map((s) => s.trim());

  return aiSkills;
}

export function parseSkillsResponse(response: string) {
  const aiSkills = response.split(",").map((s) => s.trim());

  return aiSkills;
}
