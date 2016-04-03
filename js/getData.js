window.onload = initializeData()

function initializeData() {
  var right_now = document.getElementById("right_now");
  var date = new Date();
  right_now.textContent = date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate();
  var right_now_text_content = right_now.textContent;  
}
