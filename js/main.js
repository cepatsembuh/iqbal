function submitForm() {
  var ref = new Firebase("https://dr-iqbal.firebaseio.com/"),
      today = ref.child("today");

  var nama = $('#nama').val(),
      no_bpjs = $('#no_bpjs').val(),      

  today.push().set({
    nama: nama,
    no_bpjs: no_bpjs,
    date: date
  });
}
