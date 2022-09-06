//Setting Default value of Date to current Date
let date = new Date();
document.getElementById("date").defaultValue =
  date.getFullYear().toString() +
  "-" +
  (date.getMonth() + 1).toString().padStart(2, 0) +
  "-" +
  date.getDate().toString().padStart(2, 0);

let all_data = [];

// helper funtions
// insert row to table

//function to retrieve all tasks from the database
async function getAlldata() {
  rs = document.getElementById("roadmapers");
  let data = await fetch("data/all");
  data = await data.json();
  all_data = data;
  data.forEach((element) => {
    let text = `<div class="person flex">
          <div class="person-name">
              ${element.name.split(" ")[0]}
          </div>
          <div class="person-count">
              ${element}
          </div>
          </div>`;
  });
}
// for each user calculate the number of questions solved yesterday

months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

formatDateString = (date) => {
  let d = new Date(date);
  return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
};

// funtion to post a new task to database
async function sendData(e) {
  const form = e.target;
  let submit_button = document.getElementById("submit");
  submit_button.disabled = true;

  submit_button.innerHTML = `<div class="spinner-border text-light" role="status"></div>`;

  let response = await fetch("/data/create", {
    // disable submit button
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      link: form.children[2].value,
      date: form.children[0].value,
      difficulty: form.children[1].value,
      topics: form.children[3].value,
    }),
  });

  response = await response.json();

  if (response.error) {
    console.log("Validation failed", response.error);
    alert("Data Validation Failed");
  }

  //append data to table to top of the table
  else {
    let table = document.getElementById("table");
    let row = table.insertRow(1);
    let cell1 = row.insertCell(0);
    let cell2 = row.insertCell(1);
    let cell3 = row.insertCell(2);
    let cell4 = row.insertCell(3);
    cell1.innerHTML = formatDateString(response.date);
    cell2.innerHTML = response.difficulty;
    cell3.innerHTML = `<a href="${response.link}" target="_blank">${response.link}</a>`;
    cell4.innerHTML = response.topics;
    row.classList.add(response.difficulty);
  }
  form.reset();
  submit_button.disabled = false;
  submit_button.innerHTML = `Submit`;
}

// order table by difficulty Easy, Medium, Hard
function orderTablebyDifficulty() {
  let table = document.getElementById("table");
  let rows = table.rows;
  let arr = [];
  for (let i = 1; i < rows.length; i++) {
    arr.push(rows[i]);
  }
  arr.sort((a, b) => {
    if (a.cells[1].innerHTML > b.cells[1].innerHTML) {
      return 1;
    } else if (a.cells[1].innerHTML < b.cells[1].innerHTML) {
      return -1;
    } else {
      return 0;
    }
  });
  arr.forEach((element) => {
    table.appendChild(element);
  });
}

//function to filter table by difficulty
function filterTablebyDifficulty(difficulty) {
  let table = document.getElementById("table");
  let rows = table.rows;
  for (let i = 1; i < rows.length; i++) {
    if (rows[i].cells[1].innerHTML == difficulty) {
      rows[i].style.display = "";
    } else {
      rows[i].style.display = "none";
    }
  }
}

// filter table by topic
function filterByTopic(topic) {
  let table = document.getElementById("table");
  let rows = table.rows;
  for (let i = 1; i < rows.length; i++) {
    if (rows[i].cells[3].innerHTML.includes(topic)) {
      rows[i].style.display = "";
    } else {
      rows[i].style.display = "none";
    }
  }
}

// disable all filters
function disableAllFilters() {
  let table = document.getElementById("table");
  let rows = table.rows;
  for (let i = 1; i < rows.length; i++) {
    rows[i].style.display = "";
  }
}

//event listener on submit form
document.addEventListener("submit", (e) => {
  e.preventDefault();
  sendData(e);
});
