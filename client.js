// field definition. iName represents the fields name as used in code.
// exName is the value presented on the DOM
// this array also defines the order in which data is displayed in the table
// do not change iNames without checking though code, as some iNames are expected
const employeeFields = [
    {iName: 'firstName', exName: 'First Name'},
    {iName: 'lastName', exName: 'Last Name'},
    {iName: 'idNumber', exName: 'ID Number'},
    {iName: 'jobTitle', exName: 'Job Title'},
    {iName: 'annualSalary', exName: 'Annual Salary'} 
];
const body = $('body'); // shorthand definition of body
const monthlyBudget = 20000; //the monthly budget for salaries. 
let employees = []; // employee array. must remain variable

/*
onReady handles building out the DOM
*/
function onReady(){
    let buildStart = Date.now();
    buildForm();
    buildTable();
    buildSummary();
    console.log(`Page building complete. Build time: ${Date.now() - buildStart}ms`);
}

/*
addEmployee handles adding a new employee to the employees array and displaying
the employee to the DOM. 
*/
function addEmployee(){
    console.log('adding employee');
    //get form
    let form = $('#formEmployeeInput')
    let formInputEls = form.children('input');

    // make a new employee from the form data
    let newEmployee = {}; // create new empty employee object
    // loop through each input element
    for(let field of formInputEls){
        field = $(field); // make field into a jQuery object

        //validity check, exit addEmployee if input is missing
        if(field.val() === undefined || field.val() === ""){
            alert('Invalid input. All fields must have a value entered.');
            return null;
        } else if(field.attr('id') === 'idNumber') { //checking for duplicate IDs
            for(let employee of employees){
                if(employee['idNumber'] === field.val()){
                    alert('Invalid input. ID Number must be unique.');
                    return null;
                }
            }
        } else if(field.attr('id') === 'annualSalary'){ //checking if salary is NaN
            if(isNaN(Number(field.val()))){
                alert('Invalid input. Salary must be a number.')
                return null;
            }
        }

        //set the current field in the newEmployee object to the field value
        newEmployee[field.attr('id')] = field.val();
    }

    // push new employee to employees array
    employees.push(newEmployee);

    // render the new employee to the DOM
    let tBody = $('#tBodyEmployees');
    // id is important here for ease of removing rows later
    let tRow = $(`<tr id="${newEmployee.idNumber}"></tr>`);
    tBody.append(tRow);
    for(let field of employeeFields){
        tRow.append(`<td class="${field.iName}">${newEmployee[field.iName]}</td>`);
        console.log(newEmployee[field.iName]);
    }
    
    // add delete button to table for row
    // data-empID is used by the button click callback to delete the row
    let delButton = $(`<button type="button" title="Delete Employee" data-empID="${newEmployee.idNumber}">X</button>`)
    tRow.append(delButton);

    // set delButton callback function
    delButton.on('click', function(event){
        let button = $(event.target);
        //get the employee ID from the delete button data-empID attribute
        let employeeID = button.attr('data-empID');
        // remove the row with the matching id. if this isn't working make sure the tr
        // id attribute is being set to the employee id during rendering.
        $(`#${employeeID}`).remove();

        //remove employee from employees
        employees = employees.filter(function(employee){
            return employee.idNumber !== employeeID;
        })

        //update monthly costs
        updateMonthlyCost();
        return null;
    }) // ********* end delButton on click callback *******************

    // clear input fields
    $('form input').val('');

    // calculate & display monthly salary cost
    updateMonthlyCost();
}


/*
buildForm builds out the form HTML using the employeeFields array
*/
function buildForm(){
    console.log('building form');
    // create form div
    let fDiv = $('<div class="container" id="divForm"></div>');
    body.append(fDiv);

    // create the form element
    let form = $('<form id="formEmployeeInput"></form>');
    // add it to the body
    fDiv.append(form);

    // generate fields within the form
    form.append('<h2>Add an Employee</h2>');
    for(let field of employeeFields){
        //form.append(`<label for="${field.iName}">${field.exName}:</label>`)
        form.append(`<input type="text" id="${field.iName}" name="${field.iName}" placeholder="${field.exName}"/><br>`)
    }// end for
    form.append(`<button type="button" id="buttonAddEmployee">Submit</button>`);
    
    // add button click handler for submit button
    form.children('button').on('click', addEmployee);
}


/*
buildTable handles generating the table HTML using the employeeFields array
*/
function buildTable(){
    console.log('building table');
    // create table div
    let tDiv = $('<div class="container" id="divTable"></div>');
    body.append(tDiv);

    // create table element
    let table = $('<table id="tableEmployeeData"></table>');
    // add it to the body
    tDiv.append(`<h2>Employees</h2>`);
    tDiv.append(table);
    
    // generate table header and add it to table el
    let tHead = $('<thead></thead>');
    let tHeadRow = $('<tr></tr>');
    for(let field of employeeFields){
        tHeadRow.append(`<th id="${field.iName}">${field.exName}</th>`);
    }// end for
    tHead.append(tHeadRow);
    table.append(tHead);

    //generate table body and add it to the table el
    let tBody = $('<tbody id="tBodyEmployees"></tbody>');
    table.append(tBody);
}


/*
buildSummary handles building the summary HTML
*/
function buildSummary(){
    console.log('building monthly total');
    // create summary div
    let sDiv = $('<div class="container" id="divSummary"></div>');
    body.append(sDiv);

    sDiv.append(`<h2>Summary</h2>`)
    sDiv.append(`<h4 class="summary">Total Monthly Budget:</h4><h4 class="summary" id="monthlyBudget">$${monthlyBudget}</h4><br>`);
    sDiv.append(`<h4 class="summary">Monthly Salary Cost:</h4><h4 class="summary" id="monthlySalaryCost">$0</h4>`)
}


/*
updateMonthlyCost recalculates the total monthly cost value and updates the value 
element's class if it is over the monthlyBudget value
*/
function updateMonthlyCost(){
    // sum monthly salaries
    let salarySum = 0;
    console.log(employees);
    for(let employee of employees){
        salarySum += Number(employee.annualSalary);
    }
    let monthlyCost = (salarySum / 12).toFixed(2);

    //display on DOM
    let costEl = $('#monthlySalaryCost');
    costEl.empty();
    costEl.append(`$${monthlyCost}`);
    // change background color if overbudget
    if(monthlyCost >= monthlyBudget){
        costEl.attr('class', 'summary overBudget');
    } else {
        costEl.attr('class', 'summary');
    }
}

$('document').ready(onReady);