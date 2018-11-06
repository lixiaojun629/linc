#!/usr/bin/env node
/**
 * 检查变更的代码是否符合规范
 */
const path = require('path');
const CLIEngine = require('eslint').CLIEngine;
const listChangedFiles = require('./listChangedFiles');

const ignoreMessage = 'File ignored';

function runESLint() {
    const options = { configFile: path.resolve(process.cwd(), './.eslintrc.js') };
    const cli = new CLIEngine(options);
    let changeFiles = [...listChangedFiles()];
    changeFiles = changeFiles.filter(item => !!item);
    const report = cli.executeOnFiles(changeFiles);
    const errorFiles = report.results.filter(item => {
        return item.messages.length > 0 && item.messages[0].message.indexOf(ignoreMessage) !== 0;
    });

    const result = {
        errorCount: report.errorCount
    };

    if (result.errorCount) {
        console.log(`总错误次数：${result.errorCount}`);
        errorFiles.forEach(item => {
            console.log(`文件路径：${item.filePath}`);
            item.messages.forEach(message => {
                console.log(
                    `错误行号：${message.line}, Message: ${message.message} RuleId:${
                        message.ruleId
                    }`
                );
            });
        });
        process.exit(1);
    }
}

runESLint();
