// Assignment Code
var generateBtn = document.querySelector("#generate");

var passwordLength;

//Created a object for the functions
const randomFunc = {
  confirmLower: getRandomLower,
  confirmUpper: getRandomUpper,
  confirmNumber: getRandomNumber,
  confirmSymbol: getRandomSymbol,
};

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);

//generate password function
function generatePassword() {
  //Ask for User input
  passwordLength = prompt(
    "How many charactors would you like your password? Choose between 8 and 128"
  );
  console.log("Password length " + passwordLength);

  if (!passwordLength) {
    alert("Required Value! Please retry");
  } else if (passwordLength < 8 || passwordLength > 128) {
    passwordLength = prompt("You must choose between 8 to 128");
    console.log("Password length " + passwordLength);
    if (passwordLength < 8 || passwordLength > 128) {
      alert("Error! Please try retry again!");
      return;
    } else {
      //this is to ask the user if she/he wants these criterias for the password
      confirmLower = confirm("Will this conrtain Lower case letters?");
      confirmUpper = confirm("Will this contain Upper case Letters?");
      confirmNumber = confirm("Will this contain Numbers?");
      confirmSymbol = confirm("Will this contain Special characters?");
    }
  } else {
    confirmLower = confirm("Will this conrtain Lower case letters?");
    confirmUpper = confirm("Will this contain Upper case Letters?");
    confirmNumber = confirm("Will this contain Numbers?");
    confirmSymbol = confirm("Will this contain Special characters?");
  }

  let generatedPassword = " ";

  const typesCount =
    confirmLower + confirmUpper + confirmNumber + confirmSymbol;

  console.log("typesCount:", typesCount);
  //created an array of objects that have these values as the key, ex: confirmLower: true and etc. by adding the {} symbols
  //I used .filter to take out the false in the confirmed values.
  const typesArr = [
    { confirmLower },
    { confirmUpper },
    { confirmNumber },
    { confirmSymbol },
  ].filter((item) => Object.values(item)[0]);
  //We loop through each item and based on true or false value it will filter out equals false.

  console.log("typesArray: ", typesArr);

  //This is to check if there is no confirmed values then don't proceed or do nothing
  if (typesCount === 0) {
    return "";
  }

  //generating different kinds of the confirmed values
  //Loope over length call generator function for each type

  //i += typesCount because I want to increment it by the number of confirmed values(typesCount)
  for (let i = 0; i < passwordLength; i += typesCount) {
    typesArr.forEach((type) => {
      const funcName = Object.keys(type)[0];

      generatedPassword += randomFunc[funcName]();
    });
  }
  console.log(generatedPassword);
  return generatedPassword;
}

//Generator functions

//Generates a random lower case letter
function getRandomLower() {
  //String.fromCharCode() is a codes for all the characters including lower cases and numbers
  //sample: String.fromCharCode(97) generates the lower case a.
  //in order to get all lower cases I need 97 to 122
  //26 because there are 26 letters in the alphabet
  //Math.floor is to generate a whole number beacause Math.random() is all decimals
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

//Generates a random Upper case letter
function getRandomUpper() {
  //Here again I am using String.fromCharcode to get the Upper cases
  //In this case number 65 to 90 (still 26 letters)
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

//Generates a random number
function getRandomNumber() {
  //Here again I am using String.fromCharcode to get the numbers
  //In this case number 48 to 57 (from 0 to 9) so it will be a span 10
  return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

//Generates a random symbol
function getRandomSymbol() {
  //This are a string of symbols that are accepted as password
  var symbols = ' !@#$%^&*(){}[]=<>/,."+-:;?`|~';
  return symbols[Math.floor(Math.random() * symbols.length)];
}
