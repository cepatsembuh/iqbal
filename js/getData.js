window.onload = initializeData()

function initializeData() {
  var div = document.getElementById("right_now");
  var date = new Date();
  div.textContent = date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate();
  var text = div.textContent;  
}
