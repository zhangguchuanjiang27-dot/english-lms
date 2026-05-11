const fs = require('fs');

const path = 'lib/data/grammar.ts';
let content = fs.readFileSync(path, 'utf8');

// The file defines RAW_GRAMMAR_DATA = { jhs1: [ { id: 'be-verb', ... }, ... ] }
// We can parse the file and reorder the jhs1 array.

// It's safer to extract the blocks by regex since they are very distinct.
const categories = [
    'be-verb',
    'general-verb',
    'interrogative',
    'imperative',
    'pronoun',
    'third-person-singular',
    'present-progressive',
    'auxiliary-can',
    'past-regular',
    'past-irregular',
    'be-past',
    'past-progressive'
];

const newOrder = [
    'be-verb',
    'general-verb',
    'third-person-singular',
    'pronoun',
    'interrogative',
    'imperative',
    'present-progressive',
    'auxiliary-can',
    'past-regular',
    'past-irregular',
    'be-past',
    'past-progressive'
];

let blocks = {};

for (const cat of categories) {
    const regex = new RegExp(`\\{\\s*id:\\s*'${cat}',[\\s\\S]*?\\n\\s*\\}(?=,|\\n\\s*\\])`, 'g');
    const match = content.match(regex);
    if (match) {
        blocks[cat] = match[0];
    }
}

// Now replace the entire jhs1 array contents
const jhs1Regex = /(jhs1:\s*\[)([\s\S]*?)(\n\s*\],\n\s*jhs2:)/;
const match = content.match(jhs1Regex);

if (match) {
    const newJhs1Content = newOrder.map(cat => blocks[cat]).join(',\n        ');
    const newContent = content.replace(jhs1Regex, `$1\n        ${newJhs1Content}$3`);
    fs.writeFileSync(path, newContent, 'utf8');
    console.log("Successfully reordered jhs1 categories in grammar.ts");
} else {
    console.error("Could not find jhs1 array");
}
