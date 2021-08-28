let employeeInfo = [];
let monthlyTotal = 0;

$(readyNow)

function readyNow(){
    $('#submitButton').on('click', checkInputs)
    $('table').on('click','#clearRow', deleteEmp)
}
function checkInputs(){
    let valid = true;
    $('input').each(function(){ //checks if any of the input fields are empty 
        if ($(this).val() === ''){
            valid = false;
        }
    });
    if (!valid){
        alert('Please Fill Out All Fields');
    } else if (!$.isNumeric($('#annualSalary').val())){ //checks if the annual salary field has numbers entered
        alert('Please Enter a Number for Annual Salary')
    } else {
        addEmployee();
    }
}
function addEmployee(){
    let newEmployee = { //creates a new employee object with the given information
        firstName: $('#firstName').val(),
        lastName: $('#lastName').val(),
        id: $('#id').val(),
        title: $('#title').val(),
        annualSalary: $('#annualSalary').val()
    }
    employeeInfo.push(newEmployee); //adds the new employee to the object
    monthlyTotal += Math.round(parseInt(newEmployee.annualSalary)/12); //calculates and rounds the monthly salary and adds it to monthly total
    $('input').val('');
    $('#empTable').append(`<tr> 
        <td>${newEmployee.firstName}</td>
        <td>${newEmployee.lastName}</td>
        <td>${newEmployee.id}</td>
        <td>${newEmployee.title}</td>
        <td>$${newEmployee.annualSalary}</td>
        <td><button id="clearRow">Clear Row</button></td>
    </tr>`) //^appends all the info to the table
    $('#totalMonthly').empty().append(`$${monthlyTotal}`);
    overMaxCheck();
}
function deleteEmp(){
    let containsId = $(this).parent().parent().text(); //grabs the string containing a row from the DOM
    let deductMoney = 0;
    for (let i = 0; i < employeeInfo.length; i++){
        if (containsId.includes(employeeInfo[i].id)){ //checks if the string contains an employees ID
            deductMoney = Math.round(employeeInfo[i].annualSalary/12);
            employeeInfo.splice(i,1);
        }
    }
    $(this).parent().parent().remove(); //removes the slected row from the DOM
    monthlyTotal -= deductMoney;
    $('#totalMonthly').empty().append(`$${monthlyTotal}`);
    overMaxCheck();
}
function overMaxCheck(){
    if(monthlyTotal > 20000){
            $('#totalMonthly').addClass('red');
        } else {
            $('#totalMonthly').removeClass();
        }
}