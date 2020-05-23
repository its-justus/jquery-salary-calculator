// field definition. iName represents the fields name as used in code.
// exName is the value presented on the DOM
// this array also defines the order in which data is displayed in the table
const employeeFields = [
    {iName: 'firstName', exName: 'First Name'},
    {iName: 'lastName', exName: 'Last Name'},
    {iName: 'idNumber', exName: 'ID Number'},
    {iName: 'jobTitle', exName: 'Job Title'},
    {iName: 'annualSalary', exName: 'Annual Salary'} 
];
const body = $('body'); // shorthand definition of body
const monthlyBudget = 20000;
const employees = [];

function onReady(){
    //build form
    buildForm();
    //build display table
    buildTable();
    //build monthly total
    buildSummary();
}

function addEmployee(event){
    console.log('adding employee');
    //get form
    let form = $('#formEmployeeInput')
    let formInputEls = form.children('input');
    console.log(formInputEls);

    // make a new employee from the form data
    let newEmployee = {}; // create new empty employee object
    for(let field of formInputEls){
        field = $(field); // make field into a jQuery object
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
}

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
        form.append(`<label for="${field.iName}">${field.exName}:</label>`)
        form.append(`<input type="text" id="${field.iName}" name="${field.iName}"/><br>`)
    }// end for
    form.append(`<button type="button" id="buttonAddEmployee">Submit</button>`);
    
    // add button click handler for submit button
    form.children('button').on('click', addEmployee);
}

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
    }
    tHead.append(tHeadRow);
    table.append(tHead);

    //generate table body and add it to the table el
    let tBody = $('<tbody id="tBodyEmployees"></tbody>');
    table.append(tBody);
}

function buildSummary(){
    console.log('building monthly total');
    // create summary div
    let sDiv = $('<div class="container" id="divSummary"></div>');
    body.append(sDiv);

    sDiv.append(`<h2>Summary</h2>`)
    sDiv.append(`<h3 class="summary">Total Monthly Budget:</h3><h3 class="summary" id="monthlyBudget">$${monthlyBudget}</h3><br>`);
    sDiv.append(`<h3 class="summary">Monthly Salary Cost:</h3><h3 class="summary" id="monthlySalaryCost">$0</h3>`)
}


$('document').ready(onReady);