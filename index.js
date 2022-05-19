const modal = document.querySelector(".modal"),
    modal_message = document.querySelector(".modal-message"),
    modal_m_update = document.querySelector(".modal-me-update"),
    actionCreate = document.querySelector(".btn-create"),
    btnCancel = document.querySelector(".cancel"),
    close = document.querySelector(".fa-xmark"),
    btnCreate = document.querySelector(".create"),
    btnUpdate = document.querySelector(".update"),
    btnSearch = document.querySelector(".fa-magnifying-glass"),
    btnCloseSearch = document.querySelector(".close-search");
table = document.querySelector(".table");
let id_ = document.querySelector(".input-search");
let _name = document.querySelector(".name");
let email = document.querySelector(".email");
let phone = document.querySelector(".phone");
let index = 0;
let rows = JSON.parse(localStorage.getItem("rows"));
var _id;

verify();
addRowsToTable();

actionCreate.addEventListener("click", (e) => {
    document.querySelector(".titleModal").textContent = "CREATE PERSON";
    document.querySelector(".create").style.visibility = "visible";
    document.querySelector(".update").style.visibility = "hidden";
    openModal(e);
});
close.addEventListener("click", closeModal);
btnCancel.addEventListener("click", closeModal);



//OPEN MODAL
function openModal(e) {
    e.preventDefault();
    modal.style.display = "flex";
}

//CLOSE MODAL
function closeModal() {
    cleanFields(_name, email, phone);
    modal.style.display = "none";
    modal_message.style.display = "none";
    modal_m_update.style.display = "none";
    location.reload();
}
//OPEN MODAL MESSAGE
function openModalMessage(e) {
    e.preventDefault();
    modal_message.style.display = "block";
    setTimeout(closeModal, 500);

}

//CLOSE MODAL MESSAGE
function openModalMessageUpdate(e) {
    e.preventDefault();
    modal_m_update.style.display = "block";
    setTimeout(closeModal, 500);
}

//CLOSE SEARCH
function closeSearch() {
    btnCloseSearch.classList.remove("inactive");
}

btnCloseSearch.addEventListener("click", () => {
    btnCloseSearch.classList.add("inactive");
    location.reload();
})

btnCreate.addEventListener("click", (e) => {
    if (_name.value == "" || email.value == "" || phone.value == "") {
        e.preventDefault()
    } else {
        _id += 1;
        addToLocalStorage(_id, _name.value, email.value, phone.value);
        openModalMessage(e);
    }
});

btnUpdate.addEventListener("click", (e) => {
    update(e);
})

btnSearch.addEventListener("click", (e) => {
    e.preventDefault();
    search();
})

function update(e) {
    if (_name.value == "" || email.value == "" || phone.value == "") {
        e.preventDefault()
        alert("Complete los campos vacios");
    } else {
        rows[index]['name'] = _name.value;
        rows[index]['email'] = email.value;
        rows[index]['phone'] = phone.value;
        localStorage.setItem("rows", JSON.stringify(rows));
        openModalMessageUpdate(e);
    }
}

function cleanFields(_name, email, phone) {
    _name.value = "";
    email.value = "";
    phone.value = "";
}

function addToLocalStorage(id, name, email, phone) {
    rows.push({
        id: id,
        name: name,
        email: email,
        phone: phone,
    });
    localStorage.setItem("rows", JSON.stringify(rows));
}

function addRowsToTable() {
    if (rows.length > 0) {
        for (var i = 0; i < rows.length; i++) {
            addRowToTable(i);
        }
    }
}

function addRowToTable(i) {
    let row = table.insertRow(-1);
    let cellID = row.insertCell(0);
    let cellName = row.insertCell(1);
    let cellEmail = row.insertCell(2);
    let cellPhone = row.insertCell(3);
    let cellActions = row.insertCell(4);
    cellID.textContent = rows[i]['id'];
    cellName.textContent = rows[i]['name'];
    cellEmail.textContent = rows[i]['email'];
    cellPhone.textContent = rows[i]['phone'];
    const btnEdit = document.createElement("span");
    btnEdit.innerHTML = `<i class="fa-solid fa-pen"></i>`;
    cellActions.appendChild(btnEdit);
    const btnDelete = document.createElement("span");
    btnDelete.innerHTML = `<i class="fa-solid fa-trash-can"></i>`;
    cellActions.appendChild(btnDelete);

    btnDelete.addEventListener("click", () => {
        rows.splice(i, 1)
        table.deleteRow(row.rowIndex);
        localStorage.setItem("rows", JSON.stringify(rows));
        location.reload();
    })

    btnEdit.addEventListener("click", (e) => {
        index = i;
        let _name = table.rows[row.rowIndex].cells[1].innerHTML;
        let _email = table.rows[row.rowIndex].cells[2].innerHTML;
        let _phone = table.rows[row.rowIndex].cells[3].innerHTML;
        document.querySelector(".name").value = _name;
        document.querySelector(".email").value = _email;
        document.querySelector(".phone").value = _phone;
        document.querySelector(".titleModal").textContent = "UPDATE PERSON";
        document.querySelector(".create").style.visibility = "hidden";
        document.querySelector(".update").style.visibility = "visible";
        openModal(e);
    })
}

function search() {
    if (id_.value !== "") {
        closeSearch();
        let idx = parseInt(id_.value);
        for (var i = table.rows.length - 1; i > 0; i--) {
            table.deleteRow(i);
        }
        rows.forEach((_row, _index) => {
            if (idx == _row['id']) {
                addRowToTable(_index);
            }
        });
    }
}

function verify() {
    if (rows !== null) {
        let position = rows.length - 1;
        if (rows.length > 0) {
            _id = rows[position]['id'];
        } else {
            _id = 1000;
        }
    } else {
        rows = [];
        _id = 1000;
    }
}