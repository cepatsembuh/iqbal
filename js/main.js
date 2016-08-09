function submitForm() {
  // Firebase ref
  var ref = new Firebase("https://dr-iqbal.firebaseio.com/");
  
  // Today date's
  var date = new Date(),
      year = date.getFullYear(),
      month = date.getMonth() + 1,
      day = date.getDate(),
      right_now = year + '-' + month + '-' + day,
      today = ref.child(right_now);

  // Tommorow date's
  var tommorow = date.getDate() + 1,
      tommorow_date = year + '-' + month + '-' + tommorow,
      tommorow_child = ref.child(tommorow_date);

  // Number ref
  var nomor = new Firebase("https://dr-iqbal.firebaseio.com/no_antrian");

  // Get input value
  var input = $('.input').val(),
      nama = $('#nama').val(),
      no_bpjs = $('#no_bpjs').val(),
      nik = $('#nik').val(),
      no_rujuk = $('#no_rujuk').val(),
      keluhan = $('#keluhan').val();


      function pesan() {
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
              swal({
                title: "Terdaftar",
                text: "Anda terdaftar pada: " + right_now,
                type: "success",
              }, function() {                                    
                location.reload();
              })
              
              today.push().set({
                nama: nama,
                no_bpjs: no_bpjs,
                nik: nik,
                no_rujuk: no_rujuk,
                keluhan: keluhan,
                date: date,
                no_antri: snapshot.val()
              })
          }
        })
      }

      // Validate user's input
      if (input === '' || keluhan.length < 10 || nik.length != 16 || no_bpjs.length != 13 || no_rujuk.length != 20) {
        // Error message if user's didn't type the input very well
        swal({
          title: "Input tidak valid",
          text: "Salah satu input anda tidak valid",
          type: "error"
        })
      } else {
          nomor.on('value', function(snapshot){
            if (snapshot.val() >= 40) {
              swal({
                title: "Kuota pasien sudah penuh",
                text: "Kuota pasien untuk hari ini sudah penuh" + "<br>" + "Cobalah mendaftar besok",
                type: "warning",
                html: true
              }, function() {                    
                // Reload the page so there will be no duplicate data
                location.reload();
              })
            } else {
              pesan();
            }
          })          
      } // ./else
    }