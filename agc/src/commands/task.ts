import { Command } from 'commander';
import * as prompts from '@clack/prompts';
import pc from 'picocolors';
import { saveTask, listTasks, generatePromptForReview } from '../core/file-store.js';

export const taskCommand = new Command('task')
  .description('Manage collective tasks');

taskCommand
  .command('submit')
  .description('Interactively submit a new task record')
  .action(async () => {
    prompts.intro(pc.bgBlue(pc.white(' AI-Governed Collective: Task Submission ')));

    const author = await prompts.text({
      message: 'Who is submitting this task? (e.g., @branton)',
      validate: (value) => { if (!value) return 'Required'; }
    });

    const category = await prompts.select({
      message: 'What category does this task fall under?',
      options: [
        { value: 'code', label: 'Code & Engineering' },
        { value: 'design', label: 'Design & UX' },
        { value: 'research', label: 'Research & Protocol Design' },
        { value: 'operations', label: 'Operations & Community' },
      ],
    });

    const timeSpent = await prompts.text({
      message: 'How many hours did you actually spend on this?',
      validate: (value) => { 
        if (!value || isNaN(Number(value))) return 'Please enter a valid number';
      }
    });

    const description = await prompts.text({
      message: 'Describe what you accomplished:',
      validate: (value) => { if (!value) return 'Required'; }
    });

    const deliverablesStr = await prompts.text({
      message: 'Provide links or paths to your deliverables (comma separated):',
      validate: (value) => { if (!value) return 'Required'; }
    });

    if (prompts.isCancel(author) || prompts.isCancel(category) || prompts.isCancel(timeSpent) || prompts.isCancel(description) || prompts.isCancel(deliverablesStr)) {
      prompts.cancel('Submission cancelled.');
      process.exit(0);
    }

    const s = prompts.spinner();
    s.start('Writing task record...');
    
    const filePath = saveTask({
      id: '', // Will be generated
      author: author as string,
      status: 'pending',
      timeSpent: Number(timeSpent),
      category: category as string,
      description: description as string,
      deliverables: (deliverablesStr as string).split(',').map(d => d.trim()),
    });

    s.stop(`Saved successfully!`);
    prompts.outro(`Task recorded at: ${pc.green(filePath)}`);
  });

taskCommand
  .command('list')
  .description('List current tasks in the directory')
  .action(() => {
    const tasks = listTasks();
    if (tasks.length === 0) {
      console.log(pc.yellow('No tasks found.'));
      return;
    }
    
    console.log(pc.bold('Current Tasks:\n'));
    tasks.forEach(t => {
      const color = t.status === 'reviewed' ? pc.green : t.status === 'challenged' ? pc.red : pc.yellow;
      console.log(`${pc.gray(t.id)} | ${color(t.status.padEnd(10))} | ${pc.cyan(t.author)} | ${t.category}`);
    });
  });

taskCommand
  .command('review <taskId>')
  .description('Generate AI Agent protocol prompt for reviewing a task (BYOA)')
  .action((taskId: string) => {
    try {
      const promptPath = generatePromptForReview(taskId);
      console.log(pc.green('✔ Prompt successfully generated for AI Arbiter.'));
      console.log(`\n${pc.bold('NEXT STEP (BYOA):')}`);
      console.log(`Please ask your local Agent (Cursor, Antigravity, OpenClaw, etc.) to read the following file and execute the instructions inside it:`);
      console.log(`\n    ${pc.cyan(promptPath)}\n`);
    } catch (e: any) {
      console.log(pc.red(`Error: ${e.message}`));
    }
  });
