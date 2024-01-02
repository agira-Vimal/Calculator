window.onload=()=>
{ 
    document.getElementById("display").focus()
    
}
// let counter=0  For Session Storage
document.querySelectorAll(".digit").forEach(button => {
    button.addEventListener('click',() =>
        appendToDisplay(button.value)
    )
})
document.querySelectorAll(".operator").forEach(button => {
    button.addEventListener('click',() =>
        appendToDisplay(button.value)
    )
})
document.getElementById("clear").addEventListener("click",() =>{
    document.getElementById("display").value=""
})
function appendToDisplay(inputValue){
    document.getElementById("display").value+= inputValue
}

/* *********************With Eval ()*****************************

document.getElementById("evaluate").addEventListener("click",()=>{
    try{
        let result=eval(document.getElementById("display").value)
        document.getElementById("display").value=result
    }
    catch(error){
        document.getElementById("display").value=" Syntax Error"
    }
})

************************Without Eval ()*****************************/

document.getElementById("evaluate").addEventListener("click",()=>{
  console.log(document.getElementById("display").value)
    let postFixOfExpression=convertInfixToPostFix(document.getElementById("display").value)
    const result = evaluatePostfix(postFixOfExpression)
    document.getElementById('display').value = result
})

function convertInfixToPostFix(infixExpression){        //6-5*2/10
    const postFixExpression=[]                          //652*10/-    =>5*2=10,10/10=1,6-1=5
    const stackForOperators=[]                          //-  *  => -  /
    const precedenceForOperators={
        '+':1,'-':1,'*':2,'/':2,'**':3,
    }
    let i = 0
    while (i < infixExpression.length) {                 //0<7
      let token = infixExpression[i]   
      if (i==0 || i < infixExpression.length && infixExpression[i]==='.' 
      || (!isNaN(infixExpression[i]) || ((i>0 && '+-'.includes(infixExpression[i]) && '+-*/'.includes(infixExpression[i-1])))))  {                                //true
        let currentNumber = ''
        //adding only numbers/minus before an operator found to postfix
        while(i==0 || i < infixExpression.length && infixExpression[i]==='.' || (!isNaN(infixExpression[i]) || ((i>0 && '+-'.includes(infixExpression[i]) && '+-*/'.includes(infixExpression[i-1]))))) {                                      
          currentNumber += infixExpression[i]                 //65+9-2
          console.log(infixExpression[i])                         //6
          i++
        }
        i--
        
        postFixExpression.push(currentNumber);
      }
      else if (token === '*' && infixExpression[i + 1] === '*') {               // Exponentiation operator '**' detected
                                                                              // Ensure there is a value before the '**'
        if (postFixExpression.length === 0 || isNaN(postFixExpression[postFixExpression.length - 1])) {
          console.error('Invalid expression: Missing value before **')
          return 'Invalid Expression'
        }
  
        while (
          stackForOperators.length &&
          precedenceForOperators[stackForOperators[stackForOperators.length - 1]] > precedenceForOperators['**']
        ) {
          postFixExpression.push(stackForOperators.pop())
        }
        stackForOperators.push('**')
        i++; 
      } 
      
      else if ('+-*/'.includes(token)) {
        while (
          stackForOperators.length &&
          precedenceForOperators[stackForOperators[stackForOperators.length - 1]] >= precedenceForOperators[token]
        ) {
          postFixExpression.push(stackForOperators.pop())
        }
        stackForOperators.push(token)
        
      }
  
      i++;
      console.log(`stackForOperators : ${stackForOperators}`)
      console.log(`postFixExpression : ${postFixExpression}`)
    }
  
    while (stackForOperators.length) {
        postFixExpression.push(stackForOperators.pop())
    }
    return postFixExpression.join(' ')
  }

  function evaluatePostfix(postfixExpression) {
    const stackForAccumulatingOperationsResults = []
    const operators = {
      '+': (a, b) => a + b,
      '-': (a, b) => a - b,
      '*': (a, b) => a * b,
      '/': (a, b) => b === '0' ? "Error" : a / b,
      '**': (a, b) => Math.pow(a, b),
    };
  
    const finalPostfixExpression = postfixExpression.split(' ')
  
    for (let currentValue of finalPostfixExpression) {
      if (!isNaN(currentValue)) {
        stackForAccumulatingOperationsResults.push(parseFloat(currentValue))
      } else if (operators[currentValue]) {
        const operands = [stackForAccumulatingOperationsResults.pop(), stackForAccumulatingOperationsResults.pop()]
        stackForAccumulatingOperationsResults.push(operators[currentValue](operands[1], operands[0]))
      }
    }

    // sessionStorage.setItem(counter,document.getElementById('display').value +" : " + stackForAccumulatingOperationsResults[0])
    // counter++
    localStorage.setItem(`${document.getElementById('display').value }`, + stackForAccumulatingOperationsResults[0])
    return stackForAccumulatingOperationsResults.pop().toString()
  }