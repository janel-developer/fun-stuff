// array of alphabet

const ALPHA = "abcdefghijklmnopqrstuvwxyz0123456789"

function initRoot() {
    return {value: undefined, list: undefined}
}

function initList() {
    let list = Array.from(new Array(36), x => {
        return {value: x, list: x}
    })
    return list
}

function getAlphaIndex(character) {
    // normalise the lookup for the character - if letter, to lower case
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ".includes(character) && (character = character.toLowerCase())
    return ALPHA.indexOf(character)
}

function getPrefix(trie, word){
    let currentNode = trie
    for(let letterIndex=0; letterIndex < word.length; letterIndex++) {
        const letter = word[letterIndex]
        const index = getAlphaIndex(letter)
        
        if(currentNode.list === undefined) {
            currentNode.list = initList()
        }
        let value = currentNode.list[index].value
        if(value !== undefined) {
            return value
        }
        if(letterIndex === word.length-1) {
            currentNode.list[index].value = word
        }
        currentNode = currentNode.list[index]
    }
    return undefined
}

function checkSet(set) {
    let trie = initRoot()
    for(let word of set){
        if(getPrefix(trie, word)){
            console.log(`BAD SET\n${word}`)
            return false
        } 
    }
    console.log("GOOD SET")
}

// console.log(getAlphaIndex("A"));
// console.log(getAlphaIndex("a"));
// console.log(getAlphaIndex("1"));

console.log(checkSet(['ab', 'ca', 'abc', 'cab']))
console.log(checkSet(['ab', '1',  'cab']))