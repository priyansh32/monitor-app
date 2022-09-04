//Setting Default value of Date to current Date
let date = new Date();
document.getElementById("date").defaultValue =
  date.getFullYear().toString() +
  "-" +
  (date.getMonth() + 1).toString().padStart(2, 0) +
  "-" +
  date.getDate().toString().padStart(2, 0);

//function to retrieve all tasks from the database
async function getAlldata() {
  rs = document.getElementById("roadmapers");
  let data = await fetch("data/all");
  data = await data.json();
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
let data = await getAlldata();

// funtion to post a new task to database
async function sendData(e) {
  const form = e.target;
  //using Browsers's fetch API to POST data asynchronouslys
  let response = await fetch(form.action, {
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
    cell1.innerHTML = response.date;
    cell2.innerHTML = response.difficulty;
    cell3.innerHTML = response.topics;
    cell4.innerHTML = `<a href="${response.link}" target="_blank">Link</a>`;
    row.style.backgroundColor = decideColor(response.difficulty);
    alert("Data Added Successfully");
  }
  form.reset();
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
    if (rows[i].cells[2].innerHTML.includes(topic)) {
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

//function to decide the background color to difficulty div
function decideColor(difficulty) {
  switch (difficulty) {
    case "Easy":
      return "#c8e6c9";
    case "Medium":
      return "#fff9c4";
    case "Hard":
      return "#ffcdd2";
    default:
      return "Black";
  }
}
