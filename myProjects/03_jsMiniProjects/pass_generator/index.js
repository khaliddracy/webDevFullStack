const inputSlider = document.querySelector("[data-lengthSlider]");
const lengthDisplay = document.querySelector("[data-lengthNumber]");

const passwordDisplay = document.querySelector("[data-passwordDisplay]");
const copyBtn = document.querySelector("[data-copy]");
const copyMsg = document.querySelector("[data-copyMsg]");
const upperCaseCheck = document.querySelector("#uppercase");
const lowerCaseCheck = document.querySelector("#lowercase");
const numbersCheck = document.querySelector("#numbers");
const symbolsCheck = document.querySelector("#symbols");
const indicator = document.querySelector("[data-indicator]");
const generateBtn = document.querySelector(".generateButton");
const allCheckBox = document.querySelectorAll("input[type=checkbox]");
console.log(allCheckBox);

let password = "";
let passwordLength = 10;
let checkCount = 0;
const allSymbol = "!@#$%&*~<="

handleSlider();
setIndicator('#ccc');


// set password lenght
function handleSlider(){
    inputSlider.value = passwordLength;
    lengthDisplay.innerText = passwordLength;
    const max = inputSlider.max;
    const min = inputSlider.min;
    inputSlider.style.backgroundSize = ((passwordLength - min)*100/(max-min)) + "% 100%"

 

}


function setIndicator(color){
    console.log('inside the indicator');
      indicator.style.backgroundColor =  color;
      indicator.style.boxShadow = `0px 0px 12px 1px ${color}`
}


function getRandomInteger(min,max){
   return Math.floor(Math.random() *(max-min)+min);

}

function generateRandomNumber(){
    return getRandomInteger(0,9);
}

function generateLowerCase(){
    return String.fromCharCode(getRandomInteger(97,123));
}

function generateUpperCase() {
    return String.fromCharCode(getRandomInteger(65,91));
}

function generateSymbol(){
    const random = getRandomInteger(0,allSymbol.length);

    return allSymbol.charAt(random);
}


function calcStrength() {
    let hasUpper = false;
    let hasLower = false;
    let hasNum = false;
    let hasSym = false;
    if(upperCaseCheck.checked) hasUpper = true;
    if(lowerCaseCheck.checked) hasLower = true;
    if(numbersCheck.checked) hasNum = true;
    if(symbolsCheck.checked) hasSym = true;

    if(hasUpper && hasLower && (hasNum || hasSym) && passwordLength >= 8){
        setIndicator('#0f0');

    }
    else if((hasLower || hasUpper) && (hasNum || hasSym) && passwordLength>= 6){
        setIndicator('#ff0');

    }
                                                         
    else{
        setIndicator('#f00');
    }
}

async function copyContent(){
    try{
        await navigator.clipboard.writeText(passwordDisplay.value)
        copyMsg.innerText = 'copied'
    }

    catch(e){
        copyMsg.innerText = 'failed'
    }

    copyMsg.classList.add("active");
    setTimeout(() => {
        copyMsg.classList.remove("active")
    }, 1000);


    
}


inputSlider.addEventListener('input',(e)=>{
    passwordLength = e.target.value;
    handleSlider();
})

copyBtn.addEventListener('click',()=>{
    if(passwordDisplay.value){
        copyContent();
    }
})

function sufflePassword(array){
    // Fisher Yates method
    console.log(array);
    for(let i =( array.length - 1);i>0;i--){
        const j = Math.floor(Math.random() * (i+1));
        const temp = array[i];
        array[i]=array[j];
        array[j] = temp;
    

    }

    let str = "";
    array.forEach((el) => (str += el));
    return str;
}


function handleCheckBoxChange(){
    checkCount = 1;
   
    allCheckBox.forEach((checkbox) =>{
   
        if(checkbox.checked){
       
            checkCount++;

            
          
        }
    })

    // special condition
    if(passwordLength < checkCount){
        passwordLength = checkCount;
        handleSlider()
    }

}

allCheckBox.forEach((checkbox) => {
  
    checkbox.addEventListener('change',handleCheckBoxChange())
});



generateBtn.addEventListener('click', ()=>{
    // none of the checkbox are selected
 
    if(checkCount<=0){
        console.log('returning ');
        return
    }

    if(passwordLength < checkCount){
        passwordLength = checkCount;
        handleSlider()

    }


    // let's start the journey to find new Password

    // remove old password
  
    password = "";

    // let's put the stuff mentioned by checkboxes

    // if(upperCaseCheck.checked){
    //     password += generateUpperCase();
    // }
    // if(lowerCaseCheck.checked){
    //     password += generateLowerCase();
    // }
    // if(numbersCheck.checked){
    //     password += generateRandomNumber();
    // }
    // if(symbolsCheck.checked){
    //     password += generateSymbol();
    // }
console.log('initail function');
    let funcArr = [];
    console.log('creating function');
    if(upperCaseCheck.checked)
    funcArr.push(generateUpperCase);

    if(lowerCaseCheck.checked)
    funcArr.push(generateLowerCase);

    if(numbersCheck.checked)
    funcArr.push(generateRandomNumber);

    if(symbolsCheck.checked)
    funcArr.push(generateSymbol);

    // compulsory addition
    for(let i = 0;i<funcArr.length;i++){
        console.log('compulsory addition');
        password += funcArr[i]();
    }

    // remaining addition
    for(let i = 0;i<passwordLength-funcArr.length; i++){
        console.log('remaining addition');
        let randomIndex = getRandomInteger(0,funcArr.length);
        console.log('randomIndex' + randomIndex);
        password += funcArr[randomIndex]();
        console.log(password);
    }




    // shuffle password 
    console.log('shuffling of password');
    password =  sufflePassword(Array.from(password));
    console.log('lalalal');

    // show in UI
console.log('display in UI');
console.log(checkCount);
console.log(password);
     passwordDisplay.value = password;
     console.log(passwordDisplay);
    console.log('strength1');
     calcStrength();
     console.log('strength2');

})


