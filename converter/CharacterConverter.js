const CharacterConverter = {};

// Mac Keyboard
// Acute é: option e + character
// Grave è: option ` + character
// Umlaut ë: option u + character
// Circumflex ê: option i + character
// Tilde ã: option n + character
// å: option + a

CharacterConverter.convert = (string) => {
  let answer = string;

  answer = answer.replace(/₂/g, "2");
  answer = answer.replace(/[áàäâå]/g, "a");
  answer = answer.replace(/[ÁÀÄÂ]/g, "A");
  answer = answer.replace(/ç/g, "c");
  answer = answer.replace(/[éèëê]/g, "e");
  answer = answer.replace(/[ÉÈËÊ]/g, "E");
  answer = answer.replace(/[íìïî]/g, "i");
  answer = answer.replace(/[ÍÌÏÎ]/g, "I");
  answer = answer.replace(/ł/g, "l");
  answer = answer.replace(/Ł/g, "L");
  answer = answer.replace(/ń/g, "n");
  answer = answer.replace(/[óòöôōŏ]/g, "o");
  answer = answer.replace(/[ÓÒÖÔ]/g, "O");
  answer = answer.replace(/Ø/g, "O");
  answer = answer.replace(/[śšß]/g, "s");
  answer = answer.replace(/[úùüûū]/g, "u");
  answer = answer.replace(/[ÚÙÜÛ]/g, "U");
  answer = answer.replace(/ý/g, "y");
  answer = answer.replace(/ż/g, "z");

  answer = answer.replace(" – ", " - ");

  answer = answer.replace(" (中山 宏太)", "");

  return answer;
};

module.exports = CharacterConverter;
