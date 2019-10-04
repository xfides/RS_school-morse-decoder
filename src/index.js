const MORSE_TABLE = {
  '.-': 'a',
  '-...': 'b',
  '-.-.': 'c',
  '-..': 'd',
  '.': 'e',
  '..-.': 'f',
  '--.': 'g',
  '....': 'h',
  '..': 'i',
  '.---': 'j',
  '-.-': 'k',
  '.-..': 'l',
  '--': 'm',
  '-.': 'n',
  '---': 'o',
  '.--.': 'p',
  '--.-': 'q',
  '.-.': 'r',
  '...': 's',
  '-': 't',
  '..-': 'u',
  '...-': 'v',
  '.--': 'w',
  '-..-': 'x',
  '-.--': 'y',
  '--..': 'z',
  '.----': '1',
  '..---': '2',
  '...--': '3',
  '....-': '4',
  '.....': '5',
  '-....': '6',
  '--...': '7',
  '---..': '8',
  '----.': '9',
  '-----': '0',
};

const CONFIG = {
  CUT: 10,
  START: 0,
  CODE_DOT: '10',
  CODE_DASH: '11',
  LETTER_LENGTH: 5,
  PADDING_SYMBOL: '00',
  SPACE_SYMBOL: '**********'
};

/*-----------------*/
/* helper function */
function getPadding(countPadding) {

  let resStrPad = '';

  for (let indexPad = 0; indexPad < countPadding; indexPad++) {
    resStrPad = resStrPad + CONFIG.PADDING_SYMBOL;
  }

  return resStrPad;
}

function getBinaryCode(strDashDot) {

  let newBinaryStr = '';
  let strDashDotLength = strDashDot.length;

  for (let indexSymbol = 0; indexSymbol < strDashDotLength; indexSymbol++) {

    if (strDashDot[indexSymbol] === '-') {
      newBinaryStr = newBinaryStr + CONFIG.CODE_DASH;
    } else if (strDashDot[indexSymbol] === '.') {
      newBinaryStr = newBinaryStr + CONFIG.CODE_DOT;
    } else {
      throw new Error('symbol is not dash or dot!');
    }

  }

  return newBinaryStr;

}

function makeMyMorseTable(origMorseTable) {
  let newMorseTable = {};

  for (let keyMorse in origMorseTable) {
    let paddingLength = CONFIG.LETTER_LENGTH - keyMorse.length;
    let paddingStr = getPadding(paddingLength);
    let binaryKeyDashDot = getBinaryCode(keyMorse);
    let newKeyMorse = paddingStr + binaryKeyDashDot;
    newMorseTable[newKeyMorse] = origMorseTable[keyMorse];
  }

  newMorseTable[CONFIG.SPACE_SYMBOL] = ' ';

  return newMorseTable;
}

/*---------------*/
/* main function */
function decode(expr) {

  let my_morse_table = makeMyMorseTable(MORSE_TABLE);

  let resStr = '';

  let exprLength = expr.length;
  let start = CONFIG.START;

  while (exprLength > 0) {

    let part10 = expr.slice(start, start + CONFIG.CUT);
    resStr = resStr + my_morse_table[part10];

    start = start + CONFIG.CUT;
    exprLength = exprLength - CONFIG.CUT;
  }

  return resStr;

}

module.exports = {
  decode
};