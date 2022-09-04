const todoContainer = document.querySelector('.todo-items')
const quoteContainer = document.querySelector('.quote')
//Setting Default value of Date to current Date
let date = new Date();
document.getElementById('date').defaultValue =
    date.getFullYear().toString() + '-' + (date.getMonth() + 1).toString().padStart(2, 0) +
    '-' + date.getDate().toString().padStart(2, 0);

// funtion to post a new task to database
async function sendData(e) {
    const form = e.target;
    //using Browsers's fetch API to POST data asynchronouslys
    let response = await fetch(form.action, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            link: form.children[2].value,
            date: form.children[0].value,
            difficulty: form.children[1].value,
            topics: form.children[3].value,
        })
    })
    response = await response.json()

    if (response.error) {
        console.log('Validation failed', response.error)
        alert('Data Validation Failed')
    }

    //appending New Data to List
    else {

    }
    form.reset()
}

//event listener on submit form
document.addEventListener("submit", (e) => {
    e.preventDefault();
    sendData(e)
})
//function to retrieve all tasks from the database
async function getAlldata() {
    rs = document.getElementById('roadmapers');
    let data = await fetch('/getalldata');
    data = await data.json();
    data.forEach(element => {
        let text = 
        `<div class="person flex">
        <div class="person-name">
            ${element.name.split(' ')[0]}
        </div>
        <div class="person-count">
            ${element}
        </div>
        </div>`

    });
}
getAlldata()

//function to decide the background color to category div
function decideColor(category) {
    switch (category) {
        case 'Personal':
            return '#3772FF';
        case 'Home':
            return '#F4B942';
        case 'College':
            return '#B14AED';
        case 'Other':
            return '#009fb7'
        default:
            return 'Black';
    }
}
