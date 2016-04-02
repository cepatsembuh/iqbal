function submitForm() {
  var ref = new Firebase("https://dr-iqbal.firebaseio.com/"),
      date = new Date(),
  right_now = date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate(),
      today = ref.child(right_now);
      no_antri = new Firebase("https://dr-iqbal.firebaseio.com/no_antrian");

  var input = $('.input').val(),
      nama = $('#nama').val(),
      no_bpjs = $('#no_bpjs').val();

  if (input == '') {
    swal({
      title: "Mohon masukan input",
      text: "Mohon isi input-input kami",
      type: "error"
    })
  } else {
    no_antri.on("value", function(snapshot) {
      snapshot.val();
      if (snapshot.val() > 40) {
        swal({
          title: "Tidak Tersedia",
          text: "Mohon maaf, nomor antrian kami sudah penuh",
          type: "error"
        })
      } else {
          today.push().set({
            nama: nama,
            no_bpjs: no_bpjs,
            date: date
          });
          no_antri.on("value", function(snapshot) {
            swal({
              title: "Masih Tersedia",
              text: "Anda masih bisa mendapatkan nomor antrian karena " + "<br>" + "masih ada tempat" + "<br>" + "<br>" + "Nomor antrian: " + snapshot.val(),
              type: "success",
              html: true
            })
          })
      }
    })
  }
}
