const { Command } = require('commander');
const program = new Command();

program
    .version('1.0.0')
    .argument('<name>', 'name to greet')
    .action((name) => {
        console.log(`Hello, ${name}!`);
    });

program.parse(process.argv);
