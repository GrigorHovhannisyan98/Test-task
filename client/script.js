const name = document.getElementById("name");
const owner = document.getElementById("owner");
const accountList = document.getElementById("accountList");
let singleInfo = document.getElementById('singleData');

function getAccountList() {
  fetch("http://localhost:3000/api/accounts", {
    method: "GET", headers: {
      'Content-Type': 'application/json;charset=utf-8'
    }
  }).then(data => data.json())
      .then(data => {
        let main = document.createElement('div')
        main.setAttribute('class', 'main')
        let header = `
            <div class="row">
            <div class="column bold">Id</div>
            <div class="column bold">Name</div>
            <div class="column bold">Created On</div>
            <div class="column bold">Owner</div>
            <a class="column bold">Action</a>
            </div>`;
        main.innerHTML = header;
        if (data.length) {
          data.forEach(item => {
            item.createdAt = item.createdAt.split('T')[0]
            let row = document.createElement('div')
            row.setAttribute('class', 'row')

            for (let key in item) {
              let column = `
        <div class="column">${item.id}</div>
        <div class="column">${item.name}</div>
        <div class="column">${item.createdAt}</div>
        <div class="column">${item.owner}</div>
        <a onclick="getSingleAccount(${item.id})" class="column">view</a>`
              row.innerHTML = column;
            }
            main.appendChild(row);
            accountList.appendChild(main);
          })
        }

      })
}

getAccountList()

function getSingleAccount(id) {
  fetch(`http://localhost:3000/api/accounts/${id}`, {
    method: "GET", headers: {
      'Content-Type': 'application/json;charset=utf-8'
    }
  }).then(data => data.json()).then(data => {
    data.createdAt = data.createdAt.split('T')[0]
    data.updatedAt = data.updatedAt.split('T')[0]
    let main = document.createElement('div')
    main.setAttribute('class', 'single-main')
    for (let key in data) {
      let row = document.createElement('div')
      row.setAttribute('class', 'row')
      let column = `
        <div class="column bold">${key}</div>
        <div class="column">${data[key]}</div>`
      row.innerHTML = column;
      main.appendChild(row);
    }
    singleInfo.replaceChildren()
    singleInfo.appendChild(main);
  })
}

function createAccount() {
  if (name.value && owner.value) {
    let body = {
      name: name.value, owner: owner.value
    }
    fetch("http://localhost:3000/api/createAccount", {
      method: 'POST', body: JSON.stringify(body), headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
    })
        .then(() => {
          name.value = ''
          owner.value = ''
          window.location.reload();
        })
  }
}