import { readFileSync } from 'fs';
let content = readFileSync('src/components/PTExtraHours.jsx', 'utf-8');
console.log(content.includes('Minus'));
