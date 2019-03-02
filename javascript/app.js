// Participant form items

const ul = document.querySelector("ul");
const resetButton = document.querySelectorAll("button")[1];
const firstNameField = document.getElementById("firstNameField");
const lastNameField = document.getElementById("lastNameField");
const emailField = document.getElementById("emailField");
const enterButton = document.getElementById("enterButton");
const notesField = document.getElementById("notesField");
const formPaidField = document.getElementById("paidField");
const formArrivedField = document.getElementById("arrivedField");
const paymentOnline = document.getElementById("paymentTypeFieldOnline");
const paymentCash = document.getElementById("paymentTypeFieldCash");
const paymentCard = document.getElementById("paymentTypeFieldCard");

// information form items

const classPrice = document.getElementById("classPrice");
const numberOfParticipants = document.getElementById("numberOfParticipants");
const plusButton = document.getElementsByClassName("plusButton")[0];
const minusButton = document.getElementsByClassName("plusButton")[1];
const grossIncome = document.getElementById("grossIncome");
const currentIncome = document.getElementById("currentIncome");
const totalArrived = document.getElementById("totalArrived")

// ---------------------------------------------------
//     Current Income Field and Amount Arrived field constant
// ---------------------------------------------------
let paidAmount = 0;
let amountArrived = 0;


// ---------------------------------------------------
//     Functions
// ---------------------------------------------------

// Participants form

// This function creates the li boxes with content inside

function createLi() {
  var listItem = document.createElement("LI");
  listItem.innerHTML += "<li><button type='button' class='removeIcon' name='button'>X</button><span class='personName'>";
  listItem.innerHTML += "<span class='personName'>" + firstNameField.value + " " + lastNameField.value + "</span>";
  listItem.innerHTML += '<div class="classListCheckbox"><span>Paid</span><input id="paid" type="checkbox" name="paid" value=""></div>';
  listItem.innerHTML += '<div class="classListCheckbox"><span>Arrived</span><input type="checkbox" id="arrive" name="arrived" value=""></div>';
  listItem.innerHTML += '<span class="notesTitle">Notes:' + notesField.value + '</span><p class="participantNotesField"></p></li>';
  ul.appendChild(listItem);
  paidBox(listItem);
  arrivedBox(listItem);
  paymentType(listItem);
}

// These functions check the boxes if they are checked on the forms

function paidBox(listItem) {
  if ( formPaidField.checked == true ) {
    listItem.querySelectorAll("input")[0].checked = true;
    paidAmount ++;
    currentMoney();
  }
}

function arrivedBox(listItem) {
  if ( formArrivedField.checked == true ) {
    listItem.querySelectorAll("input")[1].checked = true;
    amountArrived ++;
    arrived();
  }
}

// This function checks the payment type and inputs the information to the notes section

function paymentType(listItem) {
  if (paymentOnline.checked == true) {
        listItem.querySelectorAll("input")[0].checked = true;
        listItem.getElementsByClassName("notesTitle")[0].innerHTML += " Customer paid online. ";
  } if (paymentCash.checked == true) {
        listItem.getElementsByClassName("notesTitle")[0].innerHTML += " Customer to pay by cash. ";
  } if (paymentCard.checked == true) {
        listItem.getElementsByClassName("notesTitle")[0].innerHTML += " Customer to pay by card. ";
      }
}

// Form clear function

function clearForm() {
  firstNameField.value = "";
  lastNameField.value = "";
  formArrivedField.checked = false;
  formPaidField.checked = false;
  notesField.value = "";
  emailField.value = "";
  paymentCard.checked = false;
  paymentOnline.checked = false;
  paymentCash.checked = false;
}

// Information form

function profit() {
  let grossProfit = parseFloat(numberOfParticipants.value) * parseFloat(classPrice.value);
  if (isNaN(grossProfit) == true) {
    grossIncome.innerHTML = "Total Gross Income: 0";
  } else {
    grossIncome.innerHTML = "Total Gross Income: " + grossProfit;
  }
}

// Current income field

function currentMoney() {
  let paidIncome = paidAmount * parseFloat(classPrice.value);
  if (isNaN(paidIncome) == true) {
    currentIncome.innerHTML = "Current Income: 0";
  } else {
    currentIncome.innerHTML = "Current Income: " + paidIncome;
  }
}

// Amount Arrived Field

function arrived() {
  totalArrived.innerHTML = "Total Arrived: " + amountArrived;
}

function colorCode(li, color) {
  if (color == "arrivedAndPaid") {
    li.style.backgroundColor = "green";
  } else if (color == "arrived") {
    li.style.backgroundColor = "red";
  } else if (color == "paid") {
    li.style.backgroundColor = "#f24841";
  }
}

// ---------------------------------------------------
//     Event Listeners
// ---------------------------------------------------

// This is the event listener for the enter button

enterButton.addEventListener("click", () => {
  if ( firstNameField.value == "" || lastNameField.value == "" ) {
      alert("Please make sure to add a first AND last name.");
  } else {
      createLi();
      clearForm();
      numberOfParticipants.value ++;
      profit();
  }
});

// This is the event listener for the reset button

resetButton.addEventListener("click", () => {
  clearForm();
});

// This is the event listener for the remove icon on the Li
// If the paidbox is checked then it removes 1 from paid amount and changes the amount, otherwise it just removes the LI
// If arrivedbox is checked then it removes 1 from arrive and changes the amount

ul.addEventListener("click", (event) => {
  if (event.target.tagName == "BUTTON") {
      let li = event.target.parentNode.parentNode;
      let ul = li.parentNode;
      let paidBox = li.querySelectorAll("#paid")[0];
      let arrivedB = li.querySelectorAll("#arrive")[0];
      if (paidBox.checked == true && arrivedB.checked == true) {
        paidAmount --;
        currentMoney();
        ul.removeChild(li);
        numberOfParticipants.value -= 1;
        amountArrived --;
        profit();
        arrived();
      } else if (paidBox.checked == true) {
        paidAmount --;
        currentMoney();
        ul.removeChild(li);
        numberOfParticipants.value -= 1;
        profit();
      } else if (arrivedB.checked == true) {
        amountArrived --;
        arrived();
        ul.removeChild(li);
        numberOfParticipants.value -= 1;
        profit();
      } else {
        ul.removeChild(li);
        numberOfParticipants.value -= 1;
        profit();
      }
    }
  })


// Information form Listeners

classPrice.addEventListener("keyup", () => {
  profit();
  currentMoney();
})

// Current Income Field LI changer

ul.addEventListener("click", (event) => {
  if (event.target.id == "paid") {
    if (event.target.checked == true) {
      paidAmount ++;
      currentMoney();
    } else {
      paidAmount --;
      currentMoney();
    }
  }
})

// Arrived field LI changer

ul.addEventListener("click", (event) => {
  if (event.target.id == "arrive") {
    if (event.target.checked == true) {
      amountArrived ++;
      arrived();
    } else {
      amountArrived --;
      arrived();
    }
  }
})
