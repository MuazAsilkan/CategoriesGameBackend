const mongoose=require('mongoose');

mongoose.connect('mongodb://localhost/isim_sehir_v2')
    .then(()=>console.log("veri tabanına bağlanıldı"))
    .catch(err=>console.log("veri tabanına bağlanılamadı ",err));


