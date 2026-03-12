import { Command } from 'commander';
import pc from 'picocolors';
// Will use console.table or simpler formatting for the terminal
import { listTasks } from '../core/file-store.js';

export const scoreCommand = new Command('score')
  .description('Manage and view contribution scores');

scoreCommand
  .command('show')
  .description('Show current contribution scores for the collective')
  .action(() => {
    const tasks = listTasks();
    const scores: Record<string, { totalAiScore: number; totalSNLT: number }> = {};

    tasks.forEach(t => {
      // We only count reviewed tasks or resolved tasks towards the final score
      if (t.status === 'reviewed' || t.status === 'resolved') {
        if (!scores[t.author]) {
          scores[t.author] = { totalAiScore: 0, totalSNLT: 0 };
        }
        if (t.aiScore !== undefined) {
          scores[t.author].totalAiScore += Number(t.aiScore);
        }
        if (t.sociallyNecessaryTime !== undefined) {
          scores[t.author].totalSNLT += Number(t.sociallyNecessaryTime);
        }
      }
    });

    const authors = Object.keys(scores);
    if (authors.length === 0) {
      console.log(pc.yellow('\nNo reviewed contributions found yet.\n'));
      return;
    }

    console.log(pc.bgBlue(pc.white(' ✨ AI-Governed Collective: Global Scoreboard ✨ ')));
    console.log('\n');
    console.log(pc.bold(
      'Author'.padEnd(20) + ' | ' + 
      'Total SNLT (hrs)'.padEnd(18) + ' | ' + 
      'Raw AI Score (Σ)'
    ));
    console.log(''.padEnd(65, '-'));

    // Sort by SNLT descending
    authors.sort((a, b) => scores[b].totalSNLT - scores[a].totalSNLT);

    authors.forEach(author => {
      const data = scores[author];
      console.log(
        pc.cyan(author.padEnd(20)) + ' | ' + 
        pc.green(data.totalSNLT.toFixed(1).padEnd(18)) + ' | ' + 
        data.totalAiScore.toString()
      );
    });

    console.log('\n');
    console.log(pc.italic(pc.gray('* SNLT = Socially Necessary Labor Time')));
    console.log(pc.italic(pc.gray('* Raw AI Score is the summation of individual task grades')));
    console.log('\n');
  });
