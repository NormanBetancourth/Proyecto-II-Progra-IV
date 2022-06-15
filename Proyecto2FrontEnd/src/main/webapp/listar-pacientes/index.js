const table = document.getElementById('table-container');
const tableBody = document.getElementById('table-body');

table.onclick = (e) => {
    console.log(e.target.dataset.id);
    console.log(e.target.dataset.event);
};