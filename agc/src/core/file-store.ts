import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

// Define the absolute path to the root of the collective
// Assuming we run 'agc' from within the 'agc' dir, the root is one level up.
const COLLECTIVE_ROOT = path.resolve(process.cwd(), '..');
const TASKS_DIR = path.join(COLLECTIVE_ROOT, 'tasks');
const CONTRIBUTIONS_DIR = path.join(COLLECTIVE_ROOT, 'contributions');
const PROMPTS_DIR = path.join(COLLECTIVE_ROOT, '.agc/prompts');

export interface TaskModel {
  id: string;
  author: string;
  status: 'pending' | 'reviewed' | 'challenged' | 'resolved';
  timeSpent: number;
  category: string;
  aiScore?: number;
  sociallyNecessaryTime?: number;
  description: string;
  deliverables: string[];
}

function ensureDir(dir: string) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

export function saveTask(task: TaskModel): string {
  ensureDir(TASKS_DIR);
  const now = new Date();
  const dateStr = now.toISOString().split('T')[0].replace(/-/g, '');
  const idStr = Math.random().toString(36).substring(2, 6).toUpperCase();
  task.id = `TAS-${dateStr}-${idStr}`;

  const frontmatter = {
    id: task.id,
    author: task.author,
    status: task.status,
    timeSpent: task.timeSpent,
    category: task.category,
    createdAt: now.toISOString()
  };

  const yamlStr = yaml.dump(frontmatter);
  
  let mdContent = `---\n${yamlStr}---\n\n`;
  mdContent += `# 任务描述\n${task.description}\n\n`;
  mdContent += `# 交付物/证据链\n`;
  task.deliverables.forEach(d => {
    mdContent += `- ${d}\n`;
  });

  const filePath = path.join(TASKS_DIR, `${task.id}.md`);
  fs.writeFileSync(filePath, mdContent, 'utf-8');
  return filePath;
}

export function listTasks(): TaskModel[] {
  if (!fs.existsSync(TASKS_DIR)) return [];
  
  const files = fs.readdirSync(TASKS_DIR).filter(f => f.endsWith('.md'));
  const tasks: TaskModel[] = [];

  for (const file of files) {
    const content = fs.readFileSync(path.join(TASKS_DIR, file), 'utf-8');
    const match = content.match(/^---\r?\n([\s\S]+?)\r?\n---/);
    if (match) {
      try {
        const metadata = yaml.load(match[1]) as any;
        tasks.push(metadata);
      } catch (e) {
        // skip invalid
      }
    }
  }

  return tasks;
}

export function generatePromptForReview(taskId: string): string {
  ensureDir(PROMPTS_DIR);
  const filePath = path.join(TASKS_DIR, `${taskId}.md`);
  if (!fs.existsSync(filePath)) {
    throw new Error(`Task file not found: ${filePath}`);
  }

  const promptContent = `# Agentic Review Task: ${taskId}

You are an AI Arbiter for the AI-Governed Collective Protocol.
Your job is to read the user's task submission below and assign an \`aiScore\` (0-100) and a \`sociallyNecessaryTime\` estimate based on the Collective guidelines.

## Guidelines
1. Evaluate the objective output and impact.
2. Consider the complexity and actual social labor necessary to reproduce this work.
3. Be brutally honest, transparent, and objective. 

## Instructions
1. Read the following Task File Content.
2. Modify the Task File (${filePath}) directly!
3. Add or update \`aiScore\` and \`sociallyNecessaryTime\` in the YAML Frontmatter.
4. Change the \`status\` to \`reviewed\`.
5. Append a new section \`# AI Review Reasoning\` at the bottom of the Task File with detailed reasoning.

## Task File Content
\`\`\`markdown
${fs.readFileSync(filePath, 'utf-8')}
\`\`\`
`;

  const promptPath = path.join(PROMPTS_DIR, `review-${taskId}.md`);
  fs.writeFileSync(promptPath, promptContent, 'utf-8');
  return promptPath;
}
