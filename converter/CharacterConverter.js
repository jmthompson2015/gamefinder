const CharacterConverter = {};

CharacterConverter.convert = string => {
  let answer = string;

  answer = answer.replace(/[áäå]/g, "a");
  answer = answer.replace(/ç/g, "c");
  answer = answer.replace(/[éë]/g, "e");
  answer = answer.replace(/í/g, "i");
  answer = answer.replace(/ł/g, "l");
  answer = answer.replace(/Ł/g, "L");
  answer = answer.replace(/ń/g, "n");
  answer = answer.replace(/[öôō]/g, "o");
  answer = answer.replace(/Ø/g, "O");
  answer = answer.replace(/[śšß]/g, "s");
  answer = answer.replace(/[úùü]/g, "u");
  answer = answer.replace(/ý/g, "y");
  answer = answer.replace(/ż/g, "z");

  answer = answer.replace(" – ", " - ");

  answer = answer.replace(" (中山 宏太)", "");

  return answer;
};

module.exports = CharacterConverter;
