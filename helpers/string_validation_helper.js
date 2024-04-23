class StringValidationHelper {
  validate(input) {
    var errors = [];
    var temp = this.containsReservedWords(input);
    if (temp.length > 0) {
      errors.push(temp);
    }
    temp = this.containsForbiddenWords(input);
    if (temp.length > 0) {
      errors.push(temp);
    }
    return errors;
  }

  containsReservedWords(input) {
    var characters = [
        "!",
        '"',
        "£",
        "€",
        "%",
        "^",
        "&",
        "*",
        "(",
        ")",
        "+",
        "=",    
    ];
    var message = "";
    characters.forEach((element) => {
        if (input.toLowerCase().includes(element)) {
            message = "contains reserved character/s";      
        }
    });
    return message;
  }
  containsForbiddenWords(input){
    var forbiddenWords = ["ball", "foo", "shit", "bar"];
    var message = '';
    forbiddenWords.forEach((word) => {
        if (input.toLowerCase().includes(word)) {
            message = "Contains a forbidden word";          
        }
    });
    return message;
  }
}

module.exports = StringValidationHelper;