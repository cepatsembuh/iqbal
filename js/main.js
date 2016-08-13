function submitForm() {
  // Firebase ref
  var ref = new Firebase("https://dr-iqbal.firebaseio.com/"),
      nomor = new Firebase("https://dr-iqbal.firebaseio.com/no_antrian");
  
  // Today date's
  var date = new Date(),
      year = date.getFullYear(),
      month = date.getMonth() + 1,
      day = date.getDate(),
      right_now = year + '-' + month + '-' + day,
      today = ref.child(right_now);

  // Get input value
  var input = $('.input').val(),
      nama = $('#nama').val(),
      no_bpjs = $('#no_bpjs').val(),
      nik = $('#nik').val(),
      no_rujuk = $('#no_rujuk').val(),
      radio = $('#radio').val(),
      konsultasi_ke = $('#konsultasi_ke').val(),
      keluhan = $('#keluhan').val();
  
  // Validate user input
  if (input === '' || keluhan.length < 10 || nik.length != 16 || no_bpjs.length != 13 || no_rujuk.length != 20) {        
    swal({
      title: "Input tidak valid",
      text: "Salah satu input anda tidak valid",
      type: "error"
    })
  } else {
      nomor.once('value', function(snapshot){
        if (snapshot.val() >= 40) {
          swal({
            title: "Kuota pasien sudah penuh",
            text: "Kuota pasien untuk hari ini sudah penuh" + "<br>" + "Cobalah mendaftar besok",
            type: "warning",
            html: true
          })
        } else {
            nomor.transaction(function(currentRank){
              update = currentRank + 1;

              return update;
            }, function(error, commited, snapshot){
              if (error) {
                swal({
                  title: "Gagal mengambil data",
                  text: "Gagal mengambil data, coba cek kembali koneksi anda",
                  type: "error"
                })
              } else {
                  today.push().set({
                    nama: nama,
                    no_bpjs: no_bpjs,
                    nik: nik,
                    no_rujuk: no_rujuk,
                    konsultasi_ke: konsultasi_ke,
                    radio: radio,
                    keluhan: keluhan,
                    date: date,
                    no_antri: snapshot.val()
                  })

                  swal({
                    title: "Terdaftar",
                    text: "Anda terdaftar pada: " + right_now + '\n' + '*Screenshot dan tunjukan ini kepada loket BPJS',
                    type: "success",
                  }, function() {                                    
                    location.reload();
                  })
                  
                }
            })            
        }
      })           
    } // ./else
  }