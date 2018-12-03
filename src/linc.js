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
        wkdir += "/"+process.argv[2];
    }
    const suffixArr = [".js", ".json", ""];
    const exsitSuffix = suffixArr.find(suffix => {
        return fs.existsSync(path.resolve(wkdir, './.eslintrc' + suffix));
    });
    if (typeof exsitSuffix === "undefined") {
        throw Error("eslint配置文件不存在");
    }
    const options = { 
        configFile: path.resolve(wkdir, './.eslintrc' + exsitSuffix),
        cwd: wkdir
    };

    const cli = new CLIEngine(options);
    let changeFiles = [...listChangedFiles(wkdir)];
    changeFiles = changeFiles.filter(item => !!item);
    const report = cli.executeOnFiles(changeFiles);
    const errorFiles = report.results.filter(item => {
        return item.messages.length > 0 && item.messages[0].message.indexOf(ignoreMessage) !== 0;
    });

    const result = {
        errorCount: report.errorCount
    };

    if (result.errorCount) {
        console.log(`总错误数：${result.errorCount}`);
        errorFiles.forEach(item => {
            console.log(`文件路径：${item.filePath}`);
            item.messages.filter(message=>{
                return message.severity === 2
            }).forEach(message => {
                console.log(
                    `错误行号：${message.line}, Message: ${message.message} RuleId:${message.ruleId}`
                );
            });
        });
        process.exit(1);
    }
}

runESLint();
