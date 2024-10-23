const { Command } = require('commander'); // Імпортуємо бібліотеку Commander для роботи з аргументами командного рядка
const fs = require('fs');                 // Імпортуємо модуль fs для роботи з файлами
const path = require('path');             // Імпортуємо модуль path для роботи зі шляхами до файлів

// Створюємо нову програму для обробки аргументів
const program = new Command();

// Налаштовуємо аргументи командного рядка
program
    .option('-i, --input <path>', 'Input file path')        // Обов'язковий параметр для шляху до вхідного файлу
    .option('-o, --output <path>', 'Output file path')      // Необов'язковий параметр для шляху до вихідного файлу
    .option('-d, --display', 'Display result in console')   // Необов'язковий параметр для виведення результату в консоль
    .parse(process.argv);

const options = program.opts(); // Зберігаємо аргументи у змінній options

// Перевіряємо, чи був вказаний обов'язковий параметр -i (--input)
if (!options.input) {
    console.error("Please, specify input file"); // Виводимо помилку, якщо параметр -i не вказано
    process.exit(1); // Завершуємо програму з кодом помилки
}

// Перевіряємо, чи існує вхідний файл
if (!fs.existsSync(options.input)) {
    console.error("Cannot find input file"); // Виводимо помилку, якщо файл не знайдено
    process.exit(1); // Завершуємо програму з кодом помилки
}

// Читаємо вміст вхідного файлу
const inputFilePath = path.resolve(options.input); // Отримуємо абсолютний шлях до вхідного файлу
const jsonData = JSON.parse(fs.readFileSync(inputFilePath, 'utf8')); // Читаємо файл та перетворюємо його на об'єкт

// Фільтруємо показники з ключем `parent` рівним "BS3_BanksLiab"
const filteredData = jsonData.filter(item => item.parent === "BS3_BanksLiab");

// Формуємо результат у форматі <назва>:<розмір>
const result = filteredData.map(item => `${item.txten}: ${item.value}`).join('\n');

// Якщо задано параметр --display (-d), виводимо результат у консоль
if (options.display) {
    console.log("Filtered Data:\n", result); // Виводимо відфільтровані дані
}

// Якщо задано параметр --output (-o), записуємо результат у вказаний файл
if (options.output) {
    const outputFilePath = path.resolve(options.output); // Отримуємо абсолютний шлях до вихідного файлу
    fs.writeFileSync(outputFilePath, result); // Записуємо результат у файл
    console.log(`Data has been saved to ${outputFilePath}`); // Виводимо повідомлення про успішне збереження файлу
}

// Якщо одночасно задано параметри --output (-o) та --display (-d), виводимо результат у консоль і записуємо його у файл
