import { db } from "../database/db.ts";
import { openAIClient } from "../llm/openai.ts";
import { match, P } from "ts-pattern";

export const getAllSkills = async () => {
  const test = await db.query.skillsTable.findMany();

  const skills = test.map((t) => t.name);

  return skills;
};

export async function getAllSkillsForIssue(issue: string) {
  const resp = await openAIClient.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: `You are a helpful assistant that answers questions based on the provided context.
        You will be given a problem and you will need to find the most matching skills for the problem. 
        If you know the answer return only the matching strings with coma as delimiter and nothing else. 
        If you don't know the answer return "idk" and never make up an answer.

        Example of a problem: My car won't start
        Example of a matching skill: Car mechanic, Car repair

        Another example of a problem: Water is leaking in my kitchen
        Another example of a matching skill: Plumbing

        If there's no matching skill, return "no skill"
        `,
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

  console.log({ response });

  const value = match(response)
    .with("idk", () => null)
    .with("no skill", () => null)
    .with(P.string, (res) => res.split(",").map((s) => s.trim()))
    .with(null, () => null)
    .exhaustive();

  if (!value || (value && value.length < 1)) {
    return null;
  }

  const res = await openAIClient.embeddings.create({
    model: "text-embedding-3-small",
    input: value,
  });
  const embeddings = res.data.map((e) => e.embedding);

  return embeddings;
}

export function parseSkillsResponse(response: string) {
  const aiSkills = response.split(",").map((s) => s.trim());

  return aiSkills;
}
