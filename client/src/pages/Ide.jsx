import React, { useState, useRef, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import '../styles/Ide.css';
import API_BASE_URL from '../config/api';

const Ide = () => {
    const [code, setCode] = useState('# Write your code here\nprint("Hello, World!")');
    const [language, setLanguage] = useState('python');
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [isRunning, setIsRunning] = useState(false);
    const [history, setHistory] = useState([]);
    const [showHistory, setShowHistory] = useState(false);
    const [showInputModal, setShowInputModal] = useState(false);
    const fileInputRef = useRef(null);

    // Language configurations for Monaco Editor and Piston API
    const languages = [
        { name: 'Python', value: 'python', version: '3.10.0', monacoLang: 'python', defaultCode: '# Write your Python code here\nprint("Hello, World!")' },
        { name: 'JavaScript', value: 'javascript', version: '18.15.0', monacoLang: 'javascript', defaultCode: '// Write your JavaScript code here\nconsole.log("Hello, World!");' },
        { name: 'Java', value: 'java', version: '15.0.2', monacoLang: 'java', defaultCode: '// Write your Java code here\npublic class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, World!");\n    }\n}' },
        { name: 'C++', value: 'cpp', version: '10.2.0', monacoLang: 'cpp', defaultCode: '// Write your C++ code here\n#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "Hello, World!" << endl;\n    return 0;\n}' },
        { name: 'C', value: 'c', version: '10.2.0', monacoLang: 'c', defaultCode: '// Write your C code here\n#include <stdio.h>\n\nint main() {\n    printf("Hello, World!\\n");\n    return 0;\n}' },
        { name: 'Go', value: 'go', version: '1.16.2', monacoLang: 'go', defaultCode: '// Write your Go code here\npackage main\nimport "fmt"\n\nfunc main() {\n    fmt.Println("Hello, World!")\n}' },

        { name: 'Rust', value: 'rust', version: '1.68.2', monacoLang: 'rust', defaultCode: '// Write your Rust code here\nfn main() {\n    println!("Hello, World!");\n}' },
        { name: 'PHP', value: 'php', version: '8.2.3', monacoLang: 'php', defaultCode: '<?php\n// Write your PHP code here\necho "Hello, World!\\n";\n?>' },
        { name: 'Ruby', value: 'ruby', version: '3.0.1', monacoLang: 'ruby', defaultCode: '# Write your Ruby code here\nputs "Hello, World!"' },
        { name: 'TypeScript', value: 'typescript', version: '5.0.3', monacoLang: 'typescript', defaultCode: '// Write your TypeScript code here\nconsole.log("Hello, World!");' },
    ];

    const currentLanguage = languages.find(lang => lang.value === language);

    const handleLanguageChange = (e) => {
        const newLang = e.target.value;
        setLanguage(newLang);
        const langConfig = languages.find(lang => lang.value === newLang);
        setCode(langConfig.defaultCode);
        setOutput('');
    };

    const handleRun = () => {
        setShowInputModal(true);
    };

    const executeCode = async () => {
        setShowInputModal(false);
        setIsRunning(true);
        setOutput('Running...');

        try {
            const response = await fetch('${API_BASE_URL}/api/execute-code', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    language: currentLanguage.value,
                    version: currentLanguage.version,
                    code: code,
                    stdin: input,
                }),
            });

            const data = await response.json();

            if (data.success) {
                const result = data.run;
                let outputText = '';

                // Use stdout for normal output
                if (result.stdout) {
                    outputText = result.stdout;
                }

                // Add stderr separately if there are errors
                if (result.stderr) {
                    outputText += (outputText ? '\n' : '') + '--- Errors ---\n' + result.stderr;
                }

                setOutput(outputText || 'Program executed successfully (no output)');

                // Add to history
                const historyItem = {
                    timestamp: new Date().toLocaleString(),
                    language: currentLanguage.name,
                    code: code,
                    input: input,
                    output: outputText,
                };
                setHistory(prev => [historyItem, ...prev].slice(0, 10)); // Keep last 10
            } else {
                setOutput('Error: ' + data.error);
            }
        } catch (error) {
            setOutput('Error: Failed to execute code. Make sure the server is running.\n' + error.message);
        } finally {
            setIsRunning(false);
        }
    };

    const handleReset = () => {
        setCode(currentLanguage.defaultCode);
        setInput('');
        setOutput('');
    };

    const handleOpenFile = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setCode(event.target.result);
            };
            reader.readAsText(file);
        }
    };

    const handleSaveFile = () => {
        const blob = new Blob([code], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `code.${getFileExtension(language)}`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const getFileExtension = (lang) => {
        const extensions = {
            python: 'py',
            javascript: 'js',
            java: 'java',
            cpp: 'cpp',
            c: 'c',
            go: 'go',
            rust: 'rs',
            php: 'php',
            ruby: 'rb',
            typescript: 'ts',
        };
        return extensions[lang] || 'txt';
    };

    return (
        <div className="ide-container">
            <div className="ide-header">
                <h1>Code Editor</h1>
                <div className="ide-controls">
                    <button className="btn btn-purple" onClick={handleOpenFile}>
                        📁 Open File
                    </button>
                    <button className="btn btn-blue" onClick={handleSaveFile}>
                        💾 Save File
                    </button>
                    <button className="btn btn-indigo" onClick={handleRun} disabled={isRunning}>
                        {isRunning ? '⏳ Running...' : '▶️ Run'}
                    </button>
                    <button className="btn btn-red" onClick={handleReset}>
                        🔄 Reset
                    </button>
                    <button className="btn btn-gray" onClick={() => setShowHistory(!showHistory)}>
                        📋 History
                    </button>
                    <select
                        className="language-selector"
                        value={language}
                        onChange={handleLanguageChange}
                    >
                        {languages.map(lang => (
                            <option key={lang.value} value={lang.value}>
                                {lang.name} ({lang.version})
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                style={{ display: 'none' }}
                accept=".py,.js,.java,.cpp,.c,.go,.rs,.php,.rb,.ts,.txt"
            />

            {showHistory && (
                <div className="history-modal">
                    <div className="history-content">
                        <div className="history-header">
                            <h2>Execution History</h2>
                            <button className="close-btn" onClick={() => setShowHistory(false)}>✕</button>
                        </div>
                        <div className="history-list">
                            {history.length === 0 ? (
                                <p className="no-history">No execution history yet</p>
                            ) : (
                                history.map((item, index) => (
                                    <div key={index} className="history-item" onClick={() => {
                                        setCode(item.code);
                                        setInput(item.input);
                                        setLanguage(languages.find(l => l.name === item.language)?.value || 'python');
                                        setShowHistory(false);
                                    }}>
                                        <div className="history-item-header">
                                            <strong>{item.language}</strong>
                                            <span>{item.timestamp}</span>
                                        </div>
                                        <pre className="history-code">{item.code.substring(0, 100)}...</pre>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Input Modal */}
            {showInputModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h2>Program Input</h2>
                            <button className="close-btn" onClick={() => setShowInputModal(false)}>✕</button>
                        </div>
                        <div className="modal-body">
                            <p className="modal-instruction">Enter input for your program (if any):</p>
                            <textarea
                                className="modal-input-area"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Enter input values here (one per line)..."
                            />
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-gray" onClick={() => setShowInputModal(false)}>Cancel</button>
                            <button className="btn btn-indigo" onClick={executeCode}>
                                ▶️ Run Code
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="ide-body">
                <div className="editor-section">
                    <div className="ide-section-header">Source</div>
                    <Editor
                        height="100%"
                        language={currentLanguage.monacoLang}
                        value={code}
                        onChange={(value) => setCode(value || '')}
                        theme="vs-dark"
                        options={{
                            fontSize: 14,
                            minimap: { enabled: true },
                            scrollBeyondLastLine: false,
                            automaticLayout: true,
                            tabSize: 4,
                        }}
                    />
                </div>

                <div className="io-section">
                    <div className="output-panel">
                        <div className="ide-section-header">Output</div>
                        <pre className="output-area">{output || 'Output will appear here...'}</pre>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Ide;