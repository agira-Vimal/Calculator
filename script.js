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
document.getElementById("clear").addEventListener("click",()=>{
document.getElementById("display").value=""
})
function appendToDisplay(inputValue){
    document.getElementById("display").value+= inputValue
}
document.getElementById("evaluate").addEventListener("click",()=>{
    try{
        let result=eval(document.getElementById("display").value)
        document.getElementById("display").value=result
    }
    catch(error){
        document.getElementById("display").value=" Syntax Error"
    }
})