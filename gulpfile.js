// The bot will have other problems if they're using Node v6<, so the only version
// we probably need to worry about is v6.
if (parseInt(process.versions.node.split('.')[0]) <= 6) {
    console.error('[ERROR] SharpBot requires Node v8 or greater. Please download it at https://nodejs.org/en/download/current.');

    process.exit(1);
}

const fs = require('fs');
const path = require('path');

fs.stat(path.resolve(__dirname, '.git'), (err, stats) => {
    if ((err && err.code === 'ENOENT') || (stats && !stats.isDirectory())) {
        console.error('If you downloaded SharpBot as a ZIP file instead of via `git clone`, please read the instructions at https://github.com/RayzrDev/SharpBot#installing and reinstall now.');
    }
});

const gulp = require('gulp');
const eslint = require('gulp-eslint');
const spawn = require('child_process').spawn;

const isDev = process.argv[2] === '--dev';

const moduleError = /Error: Cannot find module '([a-zA-Z0-9+_-]+)'/;

let bot;

const paths = {
    srcFiles: 'src/**/!(_)*.js',
    configFiles: 'data/configs/config.json',
    gulpFile: 'gulpfile.js'
};

function killBot() {
    if (bot) bot.kill();
}

gulp.task('kill', () => {
    killBot();
});

gulp.task('lint', () =>
    gulp.src([
        paths.srcFiles,
        paths.gulpFile
    ])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError())
);

const mainTasks = ['kill'];
if (isDev) {
    mainTasks.push('lint');
}

gulp.task('main', mainTasks, () => {
    bot = spawn('node', ['src/bot.js'], { 'stdio': ['inherit', 'inherit', 'pipe'] });

    bot.stderr.on('data', data => {
        process.stderr.write(data);
        if (moduleError.test(data.toString())) {
            console.error(`
#########################################################################################################################
 Node has failed to load a module! If you just updated, you may need to run \'yarn\' again to install/update dependencies.
 'yarn' will attempt to run now and install the dependencies for you.
#########################################################################################################################
`);
            spawn('yarn', ['--force'], { 'stdio': 'inherit' }).on('close', code => {
                if (code === 0) {
                    console.log(`
New modules have been installed. The bot will now restart.
                `);
                    gulp.start('main');
                }
            });
        }
    });

    bot.on('close', code => {
        if (code === null) {
            // Killed by killBot()
            return;
        }

        if (code === 42) {
            // Restart
            console.error('Restart code detected.');
            gulp.start('main');
        } else if (code === 666 || code === 154) {
            // TODO: 154 = 666 & 255, so why does it sometimes exit with 154 and sometimes with 666?
            // Full process stop
            console.log('Process exit code detected.');
            process.exit(1);
        } else {
            // Wait for changes
            console.log(`Bot has exited with code ${code}. Waiting for changes...`);
        }
    });
});

gulp.task('watch', () => {
    gulp.watch([
        paths.srcFiles,
        paths.configFiles
    ], ['main']);
});

gulp.task('default', ['main', 'watch']);

process.on('exit', () => {
    killBot();
});
