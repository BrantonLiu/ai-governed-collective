#!/usr/bin/env node
import { program } from 'commander';
import { taskCommand } from './commands/task.js';
import { scoreCommand } from './commands/score.js';

program
  .name('agc')
  .description('AI-Governed Collective Agentic CLI (BYOA)')
  .version('1.0.0');

program.addCommand(taskCommand);
program.addCommand(scoreCommand);

program.parse(process.argv);
