/* jshint jquery: true */

var globalDir = "/";

function stripDir(dir) {
  dir = dir.trim();

  dir = dir.replace(/\.\//, "");
  dir = dir.replace(/\/+/, "/");
  dir = dir.replace(/\/\.$/, "/");
  if (dir !== "/") {
    dir = dir.replace(/\/$/, "");
  }

  return dir;
}

function ls() {
  var dir;

  if (arguments.length >= 2) {
    this.error("This 'ls' command only supports a single argument");
    return;
  }
  else if (arguments.length == 1) {
    dir = arguments[0];
    if (dir[0] == "-") {
      this.error("This 'ls' command does not support any options.");
      return;
    }
  }
  else {
    dir = ".";
  }

  dir = stripDir(globalDir + "/" + dir);

  if (dir == "/") {
    this.echo("[[;#ff0099;]curiosity]");
  }
  else if (dir == "/curiosity") {
    this.echo("curiosity.png  [[;#ff0099;]level001]  [[;#ff0099;]level003]  [[;#ff0099;]level005]\n" +
              "index.html     [[;#ff0099;]level002]  [[;#ff0099;]level004]  main.css\n");
  }
  else if (dir == "/curiosity/level005") {
      this.echo("jquery-3.1.1.min.js     quiff.html    terminal.html\n" +
                "jquery.terminal.min.js  terminal.css  terminal.js");
  }
  else {
    this.error("Access to '" + dir + "' denied.");
  }
}

function cd() {
  var dir;

  if (arguments.length >= 2) {
    this.error("Wrong use of 'cd' command.");
  }
  else if (arguments.length == 1) {
    dir = stripDir(arguments[0]);
  }
  else {
    dir = "/";
  }

  if (dir == "/") {
    globalDir = "/";
  }
  else if (dir == "/curiosity") {
    globalDir = "/curiosity";
  }
  else if (dir == "/curiosity/level005") {
    globalDir = "/curiosity/level005";
  }
  else if (globalDir == "/" && dir == "curiosity") {
    globalDir = "/curiosity";
  }
  else if (globalDir == "/curiosity" && dir == "level005") {
    globalDir = "/curiosity/level005";
  }
  else if (globalDir == "/" && dir == "curiosity/level005") {
    globalDir = "/curiosity/level005";
  }
  else if (globalDir == "/" && dir == "..") {
    globalDir = "/";
  }
  else if (globalDir == "/curiosity" && dir == "..") {
    globalDir = "/";
  }
  else if (globalDir == "/curiosity/level005" && dir == "..") {
    globalDir = "/curiosity";
  }
  else {
    this.error("Access to '" + dir + "' denied.");
  }
}

function echo() {
  this.echo("So this is your only concern?\n" +
            "Seeing if the 'echo' command works? :-)");
}

function error(msg) {
  return function() {
    this.error(msg);
  };
}

jQuery(function($, undefined) {
  $('#shell').terminal({
    'ls': ls,
    'l': ls,
    'll': ls,
    'dir': error("This is not MS-DOS."),
    'cd': cd,
    '..': function() { cd(".."); },
    'echo': echo,
    'curiosity': error("'curiosity' is a directory."),
    './curiosity': error("'curiosity' is a directory.")
  }, {
    greetings: '',
    name: 'shell',
    height: 250,
    width: 660,
    prompt: function(cb) {
      cb(globalDir + " > ");
    },
    exit: false,
    checkArity: false
  });
});
