const execFileSync = require('child_process').execFileSync;

const exec = (wkdir,command, args) => {
    console.log('> ' + [command].concat(args).join(' '));
    const options = {
        cwd: wkdir,
        env: process.env,
        stdio: 'pipe',
        encoding: 'utf-8'
    };
    console.log("wkdir",wkdir);
    return execFileSync(command, args, options);
};

const execGitCmd = (wkdir,args) =>
    exec(wkdir,'git', args)
        .trim()
        .toString()
        .split('\n');

const listChangedFiles = wkdir => {
    const mergeBase = execGitCmd(wkdir,['merge-base', 'HEAD', 'master']);
    return new Set([
        ...execGitCmd(wkdir, ['diff', '--name-only', '--diff-filter=ACMRTUB', mergeBase]),
        ...execGitCmd(wkdir, ['ls-files', '--others', '--exclude-standard'])
    ]);
};

module.exports = listChangedFiles;
