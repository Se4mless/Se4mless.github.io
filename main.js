// Rainbow Mode
let rainbowCheck = document.querySelector("#check")
if(rainbowCheck instanceof HTMLInputElement) {
    rainbowCheck.addEventListener("input", e => {
        if (rainbowCheck.checked) {
            document.getElementById("tool").classList.add("rainbow")
        }else {
            document.getElementById("tool").classList.remove("rainbow")
        }
    });
}









// Improved Vigenere key guesser
const alphabet = 'abcdefghijklmnopqrstuvwxyz';
const ALPHA_LEN = alphabet.length;
const alphaIndex = {};
for (let i = 0; i < ALPHA_LEN; i++) alphaIndex[alphabet[i]] = i;

// English letter frequencies (approx)
const ENG_FREQ = {
    a: 0.08167, b: 0.01492, c: 0.02782, d: 0.04253, e: 0.12702,
    f: 0.02228, g: 0.02015, h: 0.06094, i: 0.06966, j: 0.00153,
    k: 0.00772, l: 0.04025, m: 0.02406, n: 0.06749, o: 0.07507,
    p: 0.01929, q: 0.00095, r: 0.05987, s: 0.06327, t: 0.09056,
    u: 0.02758, v: 0.00978, w: 0.02360, x: 0.00150, y: 0.01974, z: 0.00074
};

function sanitizeText(s) {
    return String(s || '').toLowerCase().replace(/[^a-z]/g, '');
}

// shift char c backward by k positions (decrypt with key char)
function caesarShiftChar(c, k) {
    if (!alphaIndex.hasOwnProperty(c)) return c;
    return alphabet[(alphaIndex[c] - k + ALPHA_LEN) % ALPHA_LEN];
}

// For each key position, collect frequency counts
function columnFrequencies(text, keyLen) {
    const cols = Array.from({ length: keyLen }, () => {
        const obj = {};
        for (const ch of alphabet) obj[ch] = 0;
        return { counts: obj, total: 0 };
    });

    for (let i = 0; i < text.length; i++) {
        const ch = text[i];
        const col = i % keyLen;
        if (!alphaIndex.hasOwnProperty(ch)) continue;
        cols[col].counts[ch]++;
        cols[col].total++;
    }
    return cols;
}

// Score a particular shift for a column using chi-squared-like distance
function scoreShiftForColumn(colCounts, shift) {
    // compute frequencies for decrypted letters when applying this shift
    const total = colCounts.total || 1;
    let score = 0;
    for (const ch of alphabet) {
        // decrypted letter after applying shift
        const dec = alphabet[(alphaIndex[ch] - shift + ALPHA_LEN) % ALPHA_LEN];
        const observed = colCounts.counts[ch] / total; // observed freq of ciphertext letter ch
        const expected = ENG_FREQ[dec] || 0.0001;
        // chi-squared contribution
        const diff = observed - expected;
        score += (diff * diff) / expected;
    }

    // Small heuristic bias: if this shift maps many ciphertext letters to 'e' or 't'
    // increase the score (actually decrease chi-sq is better, so we subtract bias)
    // We'll compute how many decrypted letters are 'e' or 't' in expectation.
    const eIdx = alphaIndex['e'];
    const tIdx = alphaIndex['t'];
    // expected frequency of mapping to e/t given ciphertext distribution
    const mapE = Object.entries(colCounts.counts).reduce((acc, [c, cnt]) => {
        const dec = (alphaIndex[c] - shift + ALPHA_LEN) % ALPHA_LEN;
        return acc + (dec === eIdx ? cnt : 0);
    }, 0) / (total);
    const mapT = Object.entries(colCounts.counts).reduce((acc, [c, cnt]) => {
        const dec = (alphaIndex[c] - shift + ALPHA_LEN) % ALPHA_LEN;
        return acc + (dec === tIdx ? cnt : 0);
    }, 0) / (total);

    // Bias weights based on English frequency: e more important than t
    const bias = - (mapE * 5.0 * ENG_FREQ['e']) - (mapT * 3.0 * ENG_FREQ['t']);
    // Lower chi-sq is better -> add negative bias reduces score
    return score + bias;
}

// Guess key for given key length: for each column, pick top K candidates
function guessKeyForLength(text, keyLen) {
    const cols = columnFrequencies(text, keyLen);
    const results = [];
    for (let i = 0; i < keyLen; i++) {
        const col = cols[i];
        const shiftScores = [];
        for (let shift = 0; shift < ALPHA_LEN; shift++) {
            const s = scoreShiftForColumn(col, shift);
            shiftScores.push({ shift, score: s });
        }
        shiftScores.sort((a, b) => a.score - b.score); // lower is better
        // map top few shifts to letters (key char = shift -> which letter produced that shift?)
        const top = shiftScores.slice(0, 5).map(({ shift, score }) => {
            const keyChar = alphabet[shift % ALPHA_LEN];
            return { keyChar, shift, score };
        });
        results.push(top);
    }
    return results;
    
}
/**
 * 
 * @param {string} text 
 * @param {Array<string>} possibleKeyChars 
 */
function decrypt(text,possibleKeyChars) {
    let cipherKeys = {}
    let max = Math.pow(possibleKeyChars[0].length,possibleKeyChars.length)
    let counts = []
    counts.length = possibleKeyChars.length
    counts.fill(0)
    
            

         
// let result = ""
// for(let i  = 0; i < text.split('').length; i ++) {
//     let currentKeyChar = key[i % key.length]
//     let shiftedChar = caesarShiftChar(text[i],alphaIndex[currentKeyChar])
//     result += shiftedChar
// }
// let theAmt = 0
// while(result.includes("the")) {
//     result = result.substring(result.indexOf("the") + 3,result.length)
//     theAmt ++
// }
// cipherKeys[key] = theAmt





}

function solve() {
    const keyLenInput = document.querySelector('#keylen');
    const out = document.querySelector('#output');
    const textRaw = document.querySelector('#cypher').value || '';
    const keyLen = Number(keyLenInput.value) || 0;
    if (!keyLen || keyLen < 1) {
        out.value = 'Please enter a valid key length (integer >= 1).';
        return;
    }
    const text = sanitizeText(textRaw);
    if (!text) {
        out.value = 'Please paste ciphertext.';
        return;
    }

    const guesses = guessKeyForLength(text, keyLen);
    // format output: show top candidate letters per position with scores
    const lines = [];

    for (let i = 0; i < guesses.length; i++) {
        const g = guesses[i];
        const parts = g.map(x => x.keyChar);
        lines.push(`${parts.join('')}`);
        
        
    }

    // also build the best guess key (taking best-scoring letter at each position)
    const bestKey = guesses.map(g => g[0].keyChar).join('');
    decrypt(text,bestKey)
    lines.push('');
    lines.push(`Best guess key (top candidates): ${bestKey}`);
    out.value = lines.join('\n');
}




















