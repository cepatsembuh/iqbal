"use strict";
var ref = new Firebase('https://dr-iqbal.firebaseio.com/');
var today = ref.child("today");

function submitForm() {
  var nama = $('#nama').val(),
      no_bpjs = $('#no_bpjs').val(),
      date = $('#date').val();
}
