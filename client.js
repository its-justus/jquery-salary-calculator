// field definition. iName represents the fields name as used in code.
// exName is the value presented on the DOM
const employeeFields = [
    {iName: 'firstName', exName: 'First Name'},
    {iName: 'lastName', exName: 'Last Name'},
    {iName: 'idNumber', exName: 'ID Number'},
    {iName: 'jobTitle', exName: 'Job Title'},
    {iName: 'annualSalary', exName: 'Annual Salary'} 
];
const body = $('body'); // shorthand definition of body

function onReady(){
    //build form
    buildForm();
    //build display table
    buildTable();
    //build monthly total
    buildMonthlyTotal();
}

function addEmployee(event){
    console.log('adding employee');
}

function buildForm(){
    console.log('building form');
    // create the form element
    let form = $('<form id="formEmployeeInput"></form>');
    // add it to the body
    body.append(form);

    // generate fields within the form
    form.append('<h2>Add an Employee</h2>');
    for(let field of employeeFields){
        form.append(`<label for="${field.iName}">${field.exName}:</label>`)
        form.append(`<input type="text" id="${field.iName}" name="${field.iName}"/>`)
    }// end for
    form.append(`<button type="button" id="buttonAddEmployee">Submit</button>`);
    
    // add button click handler for submit button
    form.children('button').on('click', addEmployee);
}

function buildTable(){
    console.log('building table');
    // create table element
    let table = $('<table id="tableEmployeeData"></table>');
    // add it to the body
    body.append(`<h2>Employees</h2>`);
    body.append(table);
    
    // generate table header
    let tHead = $('<thead></thead>');
    let tHeadRow = $('<tr></tr>');
    for(let field of employeeFields){
        tHeadRow.append(`<th id="${field.iName}">${field.exName}</th>`);
    }
    tHead.append(tHeadRow);
    table.append(tHead);

    //generate table body
    
}

function buildMonthlyTotal(){
    console.log('building monthly total');
    
}


$('document').ready(onReady);