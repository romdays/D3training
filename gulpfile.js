// gulpプラグインの読み込み
const gulp = require('gulp');

const browserSync = require('browser-sync');
const reload = browserSync.reload;

// style.scssの監視タスクを作成する
gulp.task('server', function () {
    browserSync({
        notify: false,
        server: {
            baseDir: "./public"
        }
    });

    // 各ファイルを監視
    return gulp.watch(['./public/*/*/*.html', './public/*/*/js/*.js']).on("change", reload);
  });
  