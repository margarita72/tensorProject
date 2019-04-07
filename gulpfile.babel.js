import gulp from "gulp";
import babel from "gulp-babel";
import typescript from "gulp-typescript";
import merge from "merge2";
import less  from "gulp-less";
import path from "path";

const src = "./src/**/*.ts";
const out = "./build";
const babelConf = { presets: ["es2015"] };
const project = typescript.createProject("tsconfig.json", {
  outDir: out,
  typescript: require("typescript"),
});

gulp.task("ts", function () {
  var result = gulp.src("./src/ts/*.ts")
  .pipe(typescript(project));

  return merge([
    result.dts.pipe(gulp.dest(`${out}/definitions`)),
    result.js
      .pipe(babel(babelConf))
      .pipe(gulp.dest(`${out}/js`))
  ]);
});

gulp.task("watch", ["ts","less","html"], function () {
  gulp.watch("./src/ts/**/*.ts", ["ts"]);
  gulp.watch("./src/less/**/*.less", ["less"]);
  gulp.watch("./src/**/*.html", ["html"]);
});

//gulp.task("default", ["build"]);

gulp.task("less", function () {
  return gulp.src("./src/less/*.less")
    .pipe(less({
      paths: [ path.join(__dirname, "less", "includes") ]
    }))
    .pipe(gulp.dest("./build/css"));
});

gulp.task("html", function () {
  return gulp.src("./src/**/*.html")
    .pipe(gulp.dest("./build/"));
});