var selectedRow = null;

//Show Alerts
function showAlert(message, className) {
  const div = document.createElement("div");
  div.className = `alert alert-${className}`;

  div.appendChild(document.createTextNode(message));
  const container = document.querySelector(".container");
  const main = document.querySelector(".main");
  container.insertBefore(div, main);

  setTimeout(() => document.querySelector(".alert").remove(), 3000);
}

// Clear All Fields

function clearFields() {
  document.querySelector("#Name").value = " ";
  document.querySelector("#Emailid").value = " ";
}

// Add Data

document.querySelector("#crud-form").addEventListener("submit", (e) => {
  e.preventDefault();

  //Get Form Values
  const firstName = document.querySelector("#firstName").value;
  const emailid = document.querySelector("#emailid").value;

  // Validate
  if (firstName == "" || emailid == "") {
    showAlert("Please fill in all fields", "danger");
  } else {
    if (selectedRow == null) {
      const list = document.querySelector("#data-list");
      const row = document.createElement("tr");

      row.innerHTML = `
        <td>${firstName}</td>
        <td>${emailid}</td>
        <td>
        <a href="#" class="btn btn-warning btn-sm edit">Edit</a>
        <a href="#" class="btn btn-danger btn-sm delete">Delete</a>
      `;
      list.insertBefore(row, list.firstChild);
      // list.appendChild(row);
      selectedRow = null;
      showAlert("Data Added", "success");
    } else {
      selectedRow.children[0].textContent = firstName;
      selectedRow.children[1].textContent = emailid;
      selctedRow = null;
      showAlert("Data Info Edited", Info);
    }

    clearFields();
  }
});

// Edit Data

document.querySelector("#data-list").addEventListener("click", (e) => {
  target = e.target;
  if (target.classList.contains("edit")) {
    selectedRow = target.parentElement.parentElement;
    document.querySelector("#firstName").value =
      selectedRow.children[0].textContent;
    document.querySelector("#emailid").value =
      selectedRow.children[1].textContent;
  }
});

// Delete Data

document.querySelector("#data-list").addEventListener("click", (e) => {
  target = e.target;
  if (target.classList.contains("delete")) {
    target.parentElement.parentElement.remove();
    showAlert(" Data Deleted", "danger");
  }
});

// Fetch API
// https://jsonplaceholder.typicode.com/comments

fetch("https://jsonplaceholder.typicode.com/comments")
  .then((data) => {
    return data.json();
  })
  .then((objectData) => {
    console.log(objectData[0].name);

    let showData = "";
    objectData.slice(0, 10).map((values) => {
      showData += `
      <tr>
      <td>${values.name}</td>
      <td>${values.email}</td>
      <td>
        <a href="#" class="btn btn-warning btn-sm edit">Edit</a>
        <a href="#" class="btn btn-danger btn-sm delete">Delete</a>
      </td>
      </tr>`;
    });
    document.getElementById("data-list").innerHTML = showData;
  })
  .catch((err) => {
    console.log(err);
  });
