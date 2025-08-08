let totalAmount = document.getElementById("total-amount");
let userAmount = document.getElementById("user-amount");
const checkAmountButton =document.getElementById("check-amount");
const totalAmountButton = document.getElementById("total-amount-button");
const productTitle = document.getElementById("product-title");
const errorMessage = document.getElementById("budget-error");
const productTitleError = document.getElementById("product-title-error");
const amount = document.getElementById("amount");
const expenditureValue =document.getElementById("expenditure-value");
const balanceValue = document.getElementById("balance-amount");
let list = document.getElementById("list");
let tempAmount =0;

// Set Budget part
totalAmountButton.addEventListener("click", () => {
tempAmount = totalAmount.value;
// empty or negavite value cannot
if(tempAmount ==="" || tempAmount < 0)
{
    errorMessage.classList.remove("hide");
}
else
{
    errorMessage.classList.add("hide");
    //set budget
    amount.innerHTML = tempAmount;
    //set balance
    balanceValue.innerText = tempAmount-expenditureValue.innerText;
    // clear input box
    totalAmount.value = "";
}
});
//Function to Disable Edit & Delete button
const disableButton = (bool) => {
    let editButton = document.getElementsByClassName("edit");

    Array.from(editButton).forEach((element) => {
        element.disabled = bool;
    });
};
//Function to modify list element
const modifyElement = (element,edit = false) =>{
    let parentDiv = element.parentElement;
    let currentBalance = balanceValue.innerText;
    let currentExpense = expenditureValue.innerText;
    let parentAmount = parentDiv.querySelector(".amount").innerText;
    if(edit) {
        let parentText = parentDiv.querySelector(".product").innerText
        productTitle.value = parentText;
        userAmount.value = parentAmount;
        disableButton(true);
    }
    balanceValue.innerText = parseInt
    (currentBalance) + parseInt(parentAmount);
    expenditureValue.innerText = parseInt(currentExpense) - parseInt(parentAmount);
    parentDiv.remove();
   
}
//Function to Create List
const listCreator = (expenseName, expenseValue) =>{
    let sublistContent = document.createElement("div");
    sublistContent.classList.add("sublist-content","flex-space");
    list.appendChild(sublistContent);
    sublistContent.innerHTML =`<p class="product">${expenseName}</p><p class="amount">${expenseValue}</p>`;
//editButton
    let editButton = document.createElement("button");
    editButton.classList.add("fa-solid" ,"fa-pen-to-square", "edit");
    editButton.style.fontSize ="24px";
    editButton.addEventListener("click", () => {
      modifyElement(editButton, true);
    });
//deleteButton
let deleteButton = document.createElement("button");
deleteButton.classList.add("fa-solid","fa-trash-can","delete");
deleteButton.style.fontSize = "24px";
deleteButton.addEventListener("click", () => {
    modifyElement(deleteButton);
});
// to display content
sublistContent.appendChild(editButton);
sublistContent.appendChild(deleteButton);
document.getElementById("list").appendChild(sublistContent);
};
//function to add expenses
checkAmountButton.addEventListener("click", () =>{
    //emplty check
    if(!userAmount.value || !productTitle.value)
    {
        productTitleError.classList.remove("hide");
        return false;
    }
    // enable button   
    disableButton(false);
   //expenses
   let expenditure = parseInt(userAmount.value);
   //Total expenses (existing + new)
   let sum = parseInt(expenditureValue.innerText) + expenditure;
   expenditureValue.innerText= sum
   //Total balance(budget - total expenses)
   const totalBalance = tempAmount-sum;
   balanceValue.innerText = totalBalance;

   // creat List
   listCreator(productTitle.value, userAmount.
    value);

   // empty input

   productTitle.value = "";
   userAmount.value = "";
});
