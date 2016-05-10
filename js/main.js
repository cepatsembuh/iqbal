function submitForm() {
  var ref = new Firebase("https://dr-iqbal.firebaseio.com/"),
      // Date
      date = new Date(),
      year = date.getFullYear(),
      month = date.getMonth() + 1,
      day = date.getDate(),
      right_now = year + '-' + month + '-' + day,
      today = ref.child(right_now),      
      nomor = new Firebase("https://dr-iqbal.firebaseio.com/no_antrian");

  var input = $('.input').val(),
      nama = $('#nama').val(),
      no_bpjs = $('#no_bpjs').val(),
      nik = $('#nik').val(),
      no_rujuk = $('#no_rujuk').val(),
      keluhan = $('#keluhan').val();

  if (input == '') {
    swal({
      title: "Mohon masukan input",
      text: "Mohon isi input-input kami",
      type: "error"
    })
  } else if (keluhan.length < 10) {
    swal({
      title: "Tidak cukup",
      text: "Keluhan kamu tidak cukup, mohon jelaskan lebih dalam",
      type: "error"
    })
  } else {
    nomor.on("value", function(snapshot) {      
      if (snapshot.val() >= 40) {
        swal({
          title: "Tidak Tersedia",
          text: "Mohon maaf, nomor antrian kami sudah penuh",
          type: "error"
        })
      } else {          
          nomor.transaction(function(currentRank) {
              currentData = currentRank + 1;

              return currentData;
          }, function(error, committed, snapshot) {
              if (error) {
                  swal({
                    title: "Koneksi anda tidak stabil",
                    text: "Koneksi anda kurang kuat",
                    type: "error"
                  })                  
              } else {                  
                    swal({
                      title: "Masih Tersedia",
                      text: "Anda masih bisa mendapatkan nomor antrian karena " + "<br>" + "masih ada tempat" + "<br>" + "<br>" + "Nomor antrian: " + snapshot.val(),
                      type: "success",
                      html: true
                    })                  
                  today.push().set({                    
                    nama: nama,
                    no_bpjs: no_bpjs,
                    nik: nik,
                    no_rujuk: no_rujuk,
                    keluhan: keluhan,
                    date: date   ,                 
                    no_antri: snapshot.val()
                  })
              }
          });
      }
    })
  }
}

function adminForm() {
  var username = $('#username').val();
  var password = $('#password').val();

  if (username == 'admin' || password == 'admin123') {
    window.location.href = 'data.html';
  }
  else {
    alert('Input is not filled')
  }
}
