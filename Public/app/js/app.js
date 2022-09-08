//Setting Default value of Date to current Date
let date = new Date();
document.getElementById("date").defaultValue =
  date.getFullYear().toString() +
  "-" +
  (date.getMonth() + 1).toString().padStart(2, 0) +
  "-" +
  date.getDate().toString().padStart(2, 0);

let all_data = [];

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

  try {
    response = await response.json();
  } catch (err) {
    // redirect to login page
    return (window.location.href = "/login");
  }

  //append data to table to top of the table

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
  form.reset();
  submit_button.disabled = false;
  submit_button.innerHTML = `Submit`;
}

order = {
  E: 0,
  M: 1,
  H: 2,
};
// order table by difficulty Easy, Medium, Hard
function orderTablebyDifficulty(span) {
  if (span.innerHTML == "˄") {
    //˅
    span.innerHTML = "˅";
    n = 1;
  } else {
    span.innerHTML = "˄";
    n = -1;
  }
  let table = document.getElementById("table");
  let rows = table.rows;
  let arr = [];
  for (let i = 1; i < rows.length; i++) {
    arr.push(rows[i]);
  }
  arr.sort((a, b) => {
    a = a.cells[1].innerHTML.trim()[0];
    b = b.cells[1].innerHTML.trim()[0];
    return (order[a] - order[b]) * n;
  });
  arr.forEach((element) => {
    table.appendChild(element);
  });
}

//function to filter table by difficulty
function filterTablebyDifficulty(difficulty) {
  if (difficulty == "All") {
    disableAllFilters();
    return;
  }

  let table = document.getElementById("table");
  let rows = table.rows;

  for (let i = 1; i < rows.length; i++) {
    if (rows[i].cells[1].innerHTML.trim() == difficulty) {
      rows[i].style.display = "";
    } else {
      rows[i].style.display = "none";
    }
  }
}

// filter table by topic
function filterByTopic() {
  topic = document.getElementById("topic-filter").value.toUpperCase();
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
  document.getElementById("topic-filter").value = "";
  document.getElementById("difficulty").value = "All";
}

//event listener on submit form
document.addEventListener("submit", (e) => {
  e.preventDefault();
  sendData(e);
});
