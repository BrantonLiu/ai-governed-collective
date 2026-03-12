import React, { useState, useEffect } from 'react';
import { render, Text, Box, Spacer, useApp } from 'ink';
import TextInput from 'ink-text-input';

const asciiArt = `
    ___    ____________
   /   |  / ____/ ____/
  / /| | / / __/ /     
 / ___ |/ /_/ / /___   
/_/  |_|\\____/\\____/   
`;

const Demo = () => {
    const { exit } = useApp();
    const [step, setStep] = useState(0);
    const [inputValue, setInputValue] = useState('');
    const [history, setHistory] = useState<{role: string, text: string}[]>([]);

    useEffect(() => {
        const timers = [
            setTimeout(() => setStep(1), 500),
            setTimeout(() => setStep(2), 1000),
            setTimeout(() => setStep(3), 1500)
        ];
        return () => timers.forEach(clearTimeout);
    }, []);

    const handleSubmit = (val: string) => {
        if (!val.trim()) return;
        if (val.toLowerCase() === 'exit') {
            exit();
            return;
        }
        setHistory(prev => [
            ...prev, 
            { role: 'user', text: val },
            { role: 'agc', text: `[Echo Prototype]: ${val}` }
        ]);
        setInputValue('');
    };

    return (
        <Box flexDirection="column" padding={1} minHeight={20}>
            {/* Header & History Area */}
            <Box flexDirection="column" flexGrow={1}>
                {step === 0 && (
                    <Box marginBottom={1}>
                        <Text color="cyan" bold>{asciiArt}</Text>
                    </Box>
                )}
                
                {step < 3 && (
                    <Box flexDirection="column" marginBottom={1}>
                        <Box>
                            {step >= 1 ? <Text color="green">✔ </Text> : <Text color="yellow">⠼ </Text>}
                            <Text>Initializing Genesis Council...</Text>
                        </Box>
                        {step >= 1 && (
                            <Box>
                                {step >= 2 ? <Text color="green">✔ </Text> : <Text color="yellow">⠼ </Text>}
                                <Text>Syncing with AI delegates...</Text>
                            </Box>
                        )}
                    </Box>
                )}

                {step >= 3 && (
                    <Box flexDirection="column" marginBottom={1}>
                        <Text color="cyan" bold>System Ready. Entering Communications Mode.</Text>
                        <Text color="gray">Type 'exit' to terminate the session.</Text>
                        
                        <Box flexDirection="column" marginTop={1}>
                            {history.map((msg, i) => (
                                <Box key={i} marginY={msg.role === 'agc' ? 1 : 0}>
                                    <Text color={msg.role === 'user' ? 'white' : 'cyan'}>
                                        <Text bold>{msg.role === 'user' ? 'You: ' : 'AGC: '}</Text>
                                        {msg.text}
                                    </Text>
                                </Box>
                            ))}
                        </Box>
                    </Box>
                )}
            </Box>

            {/* Input Box Area (Fixed at bottom) */}
            {step >= 3 && (
                <Box borderStyle="round" borderColor="blue" paddingX={1} flexDirection="column">
                    <Box>
                        <Text color="cyan" bold>❯ </Text>
                        <Box flexGrow={1}>
                            <TextInput
                                value={inputValue}
                                onChange={setInputValue}
                                onSubmit={handleSubmit}
                                placeholder="Message the Collective..."
                            />
                        </Box>
                    </Box>
                </Box>
            )}
        </Box>
    );
};

// Use enterAltScreen if you want a true full-terminal app experience, 
// but for inline CLI (like Claude Code), standard render is preferred.
render(<Demo />);
