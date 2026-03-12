import { intro, outro, text, select, spinner, isCancel, cancel } from '@clack/prompts';
import pc from 'picocolors';

const asciiArt = `
    ___    ____________
   /   |  / ____/ ____/
  / /| | / / __/ /     
 / ___ |/ /_/ / /___   
/_/  |_|\\____/\\____/   
`;

async function main() {
    console.clear();
    console.log(pc.cyan(asciiArt));
    intro(pc.bgCyan(pc.black(' AGC (AI-Governed Collective) - Clack Demo ')));

    const directive = await select({
        message: 'Select a Protocol Omega directive:',
        options: [
            { value: 'init', label: 'Initialize Genesis Council', hint: 'Creates a new local collective' },
            { value: 'chat', label: 'Start Communications', hint: 'Chat with the collective (Echo mode)' },
            { value: 'status', label: 'System Status', hint: 'View council consensus' },
        ],
    });

    if (isCancel(directive)) {
        cancel('Operation cancelled.');
        process.exit(0);
    }

    if (directive === 'chat') {
        const s = spinner();
        s.start('Connecting to Protocol Omega...');
        await new Promise(resolve => setTimeout(resolve, 1000));
        s.stop('Connected! Echo mode active. Type "exit" to quit.');

        while (true) {
            const input = await text({
                message: pc.green('You:'),
                placeholder: 'Type a message...',
            });

            if (isCancel(input) || input.toString().toLowerCase() === 'exit') {
                break;
            }

            console.log(pc.cyan(`  [AGC Echo Prototype]: ${input}`));
        }
    } else {
        const s = spinner();
        s.start('Connecting to Protocol Omega...');
        await new Promise(resolve => setTimeout(resolve, 2000));
        s.stop('Connected successfully!');
    }

    outro(pc.green('Session terminated. Welcome to the Collective.'));
}

main().catch(console.error);
