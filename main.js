const alpha = {}
const alphabet = "abcdefghijklmnopqrstuvwxyz"
// Load Alpha Dict
for (let i = 0; i < alphabet.length; i++) {

    const element = alphabet[i];
    alpha[element] = i;
    
}

function shift(startChar,offset) {
    let idx = alpha[startChar];

    return alphabet[(idx + offset) % alphabet.length]
}
function getRequiredShift(start,end) {
    let sIdx = alpha[start];
    let eIdx = alpha[end];
}

function decrypt(){
    // Split the text into sections of len expected
    let expected = Number(document.querySelector("input").value);
    let text = String(document.querySelector("#cypher").value)
    text = text.replace(/\s+/g, '')
    let split = []
    let current = "";
    for(let i = 0; i < text.length; i++) {
        current += text[i]
        if(i % expected == 0) {
            split.push(current)
            current = ""
        }
    }
    split.forEach(section => {
        for (let index = 0; index < section.length; index++) {
            const element = section[index];
            
            
        }
    })
}