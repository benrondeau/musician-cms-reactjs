// Gulpfile and setup via https://github.com/callemall/material-ui-browserify-gulp-example/tree/f893414ed2f48864f909a9d537b9f332c65488d8
const requireDir = require('require-dir');

// Require all tasks in gulp/tasks, including subfolders
requireDir('./gulp/tasks', { recurse: true });