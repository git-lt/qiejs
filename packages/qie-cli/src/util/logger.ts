const chalk = require("chalk");
/**
 * Prefix.
 */
const prefix = "   qie-cli";
const sep = chalk.gray("·");

export default { log, fatal, success, warn, error };

/**
 * Log a `message` to the console.
 */
function log(message: string) {
  console.log(chalk.white(prefix), sep, `${message}\n`);
}

/**
 * Log an error `message` to the console and exit.
 */
function fatal(message: string | Error) {
  if (message instanceof Error) message = message.message.trim();
  console.error(chalk.red(prefix), "😡   → ", `${message}\n`);
  process.exit(1);
}

function error(message: string | Error) {
  if (message instanceof Error) message = message.message.trim();
  console.error(chalk.red(prefix), "☹️   → ", `${message}\n`);
}

/**
 * Log a success `message` to the console.
 */
function success(message: string) {
  console.log(chalk.green(prefix), "😃  → ", `${message}\n`);
}

/**
 * Log a warning `message` to the console.
 */
function warn(messgae: string) {
  console.log(chalk.yellow(prefix), "😱  → ", `${messgae}\n`);
}
