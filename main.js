const alpha = {}
const alphabet = "abcdefghijklmnopqrstuvwxyz"
const defaultCommonObject = {

}
// Load Alpha Dict
for (let i = 0; i < alphabet.length; i++) {

    const element = alphabet[i];
    alpha[element] = i;
    defaultCommonObject[element] = 0;
    
}

function shift(startChar,offset) {
    let idx = alpha[startChar];

    return alphabet[(idx + offset) % alphabet.length]
}
function getRequiredShift(start, end) {
    let sIdx = alpha[start];
    let eIdx = alpha[end];
    // Return the shift amount (can be negative)
    return (eIdx - sIdx + alphabet.length) % alphabet.length;
}

function decrypt() {
    // Split the text into sections of length 'expected'
    let expected = Number(document.querySelector("input").value);
    let text = String(document.querySelector("#cypher").value);
    let result = text;
    text = text.replace(/\s+/g, '');
    let split = [];
    for (let i = 0; i < text.length; i += expected) {
        split.push(text.slice(i, i + expected));
    }
    let mostCommon = [];
    for (let i = 0; i < expected; i++) {
        mostCommon.push({ ...defaultCommonObject });
        
    }

    split.forEach(section => {
        

        // Create a fresh copy for each section
        for (let index = 0; index < section.length; index++) {
            const element = section[index];
            //check if element is in alphabet
            if (!alphabet.includes(element)) continue;
            // Count the shift needed to turn element into 'e'
            let shiftAmount = getRequiredShift(element, "e");
            mostCommon[index][alphabet[shiftAmount]]++;
        }
        
    });
    
    console.log(mostCommon);
}
















AAA



