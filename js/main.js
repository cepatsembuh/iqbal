// Firebase Config
var config = {
   apiKey: "AIzaSyDxf2IdExP9qpYHZTSBYMXgyaS9Q0csfr4",
   authDomain: "dr-iqbal.firebaseapp.com",
   databaseURL: "https://dr-iqbal.firebaseio.com",
   storageBucket: "dr-iqbal.appspot.com",
   messagingSenderId: "999297853592"
};
firebase.initializeApp(config);
var ref = firebase.database();

function submitForm() {
  'use strict'
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
                    keluhan: keluhan,                    
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
  function kontrol() {
    'use strict';
  
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
      date = $('#tanggal').val(),
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
                  console.log('Data: ' + date)
                  today.push().set({
                    nama: nama,
                    no_bpjs: no_bpjs,
                    nik: nik,
                    no_rujuk: no_rujuk,
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