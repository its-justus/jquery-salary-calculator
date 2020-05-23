// field definition. iName represents the fields name as used in code.
// exName is the value presented on the DOM
const employeeFields = [
    {iName: 'firstName', exName: 'First Name'},
    {iName: 'lastName', exName: 'Last Name'},
    {iName: 'idNumber', exName: 'ID Number'},
    {iName: 'jobTitle', exName: 'Job Title'},
    {iName: 'annualSalary', exName: 'Annual Salary'} 
];

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
    //#formEmployeeInput
    let form = $('#formEmployeeInput');
    for(let field of employeeFields){
        form.append(`<label for="${field.iName}">${field.exName}:</label>`)
        form.append(`<input type="text" id="${field.iName}" name="${field.iName}"/>`)
    }
    form.append(`<button type="button" id="buttonAddEmployee">Submit</button>`);
    form.children('button').on('click', addEmployee);
}

function buildTable(){
    console.log('building table');
}

function buildMonthlyTotal(){
    console.log('building monthly total');
}


$('document').ready(onReady);