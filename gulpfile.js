// Importando o gulp
const gulp = require("gulp");
// Importando o gulp-dart-sass
const sass = require("gulp-dart-sass");
// Importando o gulp-autoprefixer
const autoprefixer = require("gulp-autoprefixer");
// Importando o browser-sync
const browserSync = require("browser-sync").create();
// Importando o gulp-concat
const concat = require("gulp-concat");
// Importando o babel
const babel = require("gulp-babel");
// Importando o uglify
const uglify = require("gulp-uglify");

// Task que compila o SASS, adiciona os prefixos
// de CSS e atualiza a página
function sassComp() {
  return gulp
    .src("./scss/*.scss")
    .pipe(sass({ outputStyle: "compressed" }))
    .pipe(autoprefixer({ cascade: false }))
    .pipe(gulp.dest("./css/"))
    .pipe(browserSync.stream());
}

// Para passar argumentos a uma função de callback
// da task, é necessário passar um function anônima
// recebendo o done, executar a função de callback,
// e depois executar o done() para o gulp saber que
// a tarefa foi finalizada
gulp.task("sass", function (done) {
  sassComp();
  done();
});

// Task que compila os arquivos JS em um único
gulp.task("mainJS", function () {
  return gulp
    .src("./js/main/*.js")
    .pipe(concat("main.js"))
    .pipe(babel({ presets: ["@babel/env"] }))
    .pipe(uglify())
    .pipe(gulp.dest("./js/"))
    .pipe(browserSync.stream());
});

// Task para pegar bibliotecas externas
gulp.task("pluginsJS", function () {
  return gulp
    .src(["./node_modules/jquery/dist/jquery.min.js"])
    .pipe(concat("plugins.js"))
    .pipe(gulp.dest("./js/"))
    .pipe(browserSync.stream());
});

// Task que inicia o browser-sync criando um
// servidor localhost
gulp.task("browser-sync", function () {
  browserSync.init({
    server: {
      baseDir: "./",
    },
  });
});

// Task que observa todos os arquivos SASS, HTML e JS
gulp.task("watch", function () {
  gulp.watch("./scss/*.scss", gulp.parallel("sass"));
  gulp.watch("./js/main/*.js", gulp.parallel("mainJS"));
  gulp.watch(["./*.html"]).on("change", browserSync.reload);
});

// Task default que inicia a task de watch e browser-sync
gulp.task(
  "default",
  gulp.parallel("watch", "browser-sync", "sass", "mainJS", "pluginsJS")
);
