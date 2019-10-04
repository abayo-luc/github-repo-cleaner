const tdBody = document.querySelector("#table-body");
const delButton = document.querySelector("#del-btn");
const loader = document.querySelector("#loader");
const repos = [];
const markLoading = () => {
  tdBody.innerHTML = "";
  loader.innerHTML = `<div class="loader"></div>`;
};

const storeId = e => {
  const { value } = e;
  repos.push(value);
};

const loadData = () => {
  markLoading();
  fetch("/api/v1/repos", {
    method: "GET"
  })
    .then(res => res.json())
    .then(res => {
      const { data } = res;
      const rows = data.map(
        (item, index) => `
        <tr>
            <th>${index + 1}</th>
            <td>${item.name}</td>
            <td>${new Date(item.created_at).toDateString()}</td>
            <td>${item.forks_count}</td>
            <td>${item.fork}</td>
            <td>${Object.keys(item.permissions)
              .map(perm => {
                if (item.permissions[perm]) return perm.toUpperCase();
              })
              .join(", ")}
            </td>
            <td>${item.language}</td>
            <td class="rep-descr">${item.description}</td>
            <td class="align-center"><input type="checkbox" value=${
              item.name
            } id=${item.id} onClick="storeId(this)"></td>
        </tr>`
      );
      loader.innerHTML = "";
      tdBody.innerHTML = rows.join("");
    })
    .catch(err => console.log(err));
};
loadData();

const removeRepos = () => {
  const data = { repos: repos };
  markLoading();
  fetch("/api/v1/repos", {
    method: "PUT",
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json"
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify(data) // body
  })
    .then(() => loadData())
    .catch(err => {
      alert("Some of the repo failed, please try again!");
      loadData();
    });
};
