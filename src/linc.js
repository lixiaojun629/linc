#!/usr/bin/env node
/**
 * 检查变更的代码是否符合规范
 */
const path = require('path');
const fs = require('fs');
const CLIEngine = require('eslint').CLIEngine;
const listChangedFiles = require('./listChangedFiles');

const ignoreMessage = 'File ignored';

function runESLint() {
    let wkdir = process.cwd();
    if (process.argv.length >= 3) {
        wkdir += '/' + process.argv[2];
    }
    const suffixArr = ['.js', '.json', ''];
    const exsitSuffix = suffixArr.find(suffix => {
        return fs.existsSync(path.resolve(wkdir, './.eslintrc' + suffix));
    });
    if (typeof exsitSuffix === 'undefined') {
        throw Error('eslint配置文件不存在');
    }
    const options = {
        configFile: path.resolve(wkdir, './.eslintrc' + exsitSuffix),
        cwd: wkdir
    };

    const eslintCLI = new CLIEngine(options);

    let changeFiles = [...listChangedFiles(wkdir)];
    changeFiles = changeFiles.filter(item => !!item);

    const jsFiles = changeFiles.filter(file => {
        return file.endsWith('.js') || file.endsWith('.jsx');
    });

    console.log('changed js(x) files:\n', jsFiles.join('\n'));
    const report = eslintCLI.executeOnFiles(jsFiles);
    const errorFiles = report.results.filter(item => {
        const msgList = item.messages.filter(msg => {
            return msg.severity === 2 && msg.message.indexOf(ignoreMessage) !== 0;
        });
        return msgList.length > 0;
    });

    const result = {
        errorCount: report.errorCount
    };

    if (result.errorCount) {
        console.log(`总错误数：${result.errorCount}`);
        errorFiles.forEach(item => {
            console.log(`文件路径：${item.filePath}`);
            item.messages
                .filter(message => {
                    return message.severity === 2;
                })
                .forEach(message => {
                    console.log(
                        `Line:${message.line},Column:${message.column}, Message: ${message.message} RuleId:${
                            message.ruleId
                        }`
                    );
                });
        });
        process.exit(1);
    }
}

runESLint();
