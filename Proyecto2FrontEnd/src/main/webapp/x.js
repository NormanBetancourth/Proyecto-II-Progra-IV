const date  = document.getElementById('date-picker');
const btn  = document.getElementById('btn-apply');

date.min = new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000).toISOString().split("T")[0];

btn.onclick = function(e) {
    console.log(date.value);
}