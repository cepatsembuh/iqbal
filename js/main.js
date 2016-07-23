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


      // Validate user's input
      if (input === '' || keluhan.length < 10 || nik.length != 16 || no_bpjs.length != 13 || no_rujuk.length != 20) {
        // Error message if user's didn't type the input very well
        swal({
          title: "Input tidak valid",
          text: "Salah satu input anda tidak valid",
          type: "error"
        })
      } else {
          // Firebase transaction method
          nomor.transaction(function(currentRank) {
              currentData = currentRank + 1;

              return currentData;
          }, function(error, committed, snapshot) {
              if (error) {
                // Error message if user's internet is shit
                  swal({
                    title: "Koneksi anda tidak stabil",
                    text: "Koneksi anda kurang kuat",
                    type: "error"
                  })
              } else if (snapshot.val() >= 40) {
                  // Registering user for tommorow
                  swal({
                    title: "Terdaftar Untuk Besok",
                    text: "Anda terdaftar pada tanggal: " + tommorow_date + "<br>" + "<br>" + "Nomor antrian: " + snapshot.val(),
                    type: "success",
                    html: true
                  }, function() {                    
                    // Reload the page so there will be no duplicate data
                    location.reload();
                  })

                  // Push user data to firebase
                  tommorow_child.push().set({
                    nama: nama,
                    no_bpjs: no_bpjs,
                    nik: nik,
                    no_rujuk: no_rujuk,
                    keluhan: keluhan,
                    date: date,
                    no_antri: snapshot.val()
                  })
              } else {
                  // Registering user's for today
                  swal({
                    title: "Masih Tersedia",
                    text: "Anda masih bisa mendapatkan nomor antrian karena " + "<br>" + "masih ada tempat" + "<br>" + "<br>" + "Nomor antrian: " + snapshot.val(),
                    type: "success",
                    html: true
                  }, function() {                    
                    // Reload the page so there will be no duplicate data
                    location.reload();
                  })

                  // Push user data to firebase
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
          });
      }
  }