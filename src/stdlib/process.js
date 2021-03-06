const { ClassCallable } = require("../classes");
const { NativeCallable } = require("../functions");
const Environment = require("../environment");

const { spawnSync, execSync } = require("child_process");

let nativeclss = new ClassCallable("Process", {
  "construct": new NativeCallable(0, [], new Environment(), () => {}, true),
  
  "spawn": new NativeCallable(1, ["cmd"], new Environment(), args => {
    spawnSync(args[0]).output;
  }, false),

  "exec": new NativeCallable(1, ["cmd"], new Environment(), args => {
    return execSync(args[0]).toString();
  }, false),
}, null, null);

let lib = nativeclss.call([]);

module.exports = { lib, name: "Process" };
