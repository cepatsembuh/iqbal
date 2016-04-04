window.onload = initializeData()
var ref = new Firebase("https://dr-iqbal.firebaseio.com");
var no_antri = new Firebase(ref + '/no_antrian');

function initializeData() {
  var right_now = document.getElementById("right_now");
  var date = new Date();
  right_now.textContent = date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate();
  var right_now_text_content = right_now.textContent;
}

ref.on("value", function(snapshot) {
  var no_antri = document.getElementById("no_antri");
  var no_antrian = snapshot.val();
  no_antri.textContent = no_antrian;
  var no_antrian_text_content = no_antri.textContent;
})
