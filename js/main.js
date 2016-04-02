function submitForm() {
  var ref = new Firebase("https://dr-iqbal.firebaseio.com/"),
      date = new Date(),
  right_now = date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate(),
      today = ref.child(right_now);

  var nama = $('#nama').val(),
      no_bpjs = $('#no_bpjs').val();

  today.push().set({
    nama: nama,
    no_bpjs: no_bpjs,
    date: date
  });

  swal({
    title: "Masih Tersedia",
    text: "Anda masih bisa mendapatkan nomor antrian karena " + "<br>" + "masih ada tempat" + "<br>" + "<br>" + "Nomor antrian: 1",
    type: "success",
    html: true
  })
}
