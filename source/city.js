const cities = [
    "ADANA",
    "ADIYAMAN",
    "AFYON",
    "AFYONKARAHİSAR",
    "AĞRI",
    "AMASYA",
    "ANKARA",
    "ANTALYA",
    "ARTVİN",
    "AYDIN",
    "BALIKESİR",
    "BİLECİK",
    "BİNGÖL",
    "BİTLİS",
    "BOLU",
    "BURDUR",
    "BURSA",
    "ÇANAKKALE",
    "ÇANKIRI",
    "ÇORUM",
    "DENİZLİ",
    "DİYARBAKIR",
    "EDİRNE",
    "ELAZIĞ",
    "ERZİNCAN",
    "ERZURUM",
    "ESKİŞEHİR",
    "GAZİANTEP",
    "GİRESUN",
    "GÜMÜŞHANE",
    "HAKKARİ",
    "HATAY",
    "ANTAKYA",
    "ISPARTA",
    "İÇEL",
    "MERSİN",
    "İSTANBUL",
    "İZMİR",
    "KARS",
    "KASTAMONU",
    "KAYSERİ",
    "KIRKLARELİ",
    "KIRŞEHİR",
    "KOCAELİ",
    "İZMİT",
    "KONYA",
    "KÜTAHYA",
    "MALATYA",
    "MANİSA",
    "KAHRAMANMARAŞ",
    "MARAŞ",
    "MARDİN",
    "MUĞLA",
    "MUŞ",
    "NEVŞEHİR",
    "NİĞDE",
    "ORDU",
    "RİZE",
    "SAKARYA",
    "ADAPAZARI",
    "SAMSUN",
    "SİİRT",
    "SİNOP",
    "SİVAS",
    "TEKİRDAĞ",
    "TOKAT",
    "TRABZON",
    "TUNCELİ",
    "ŞANLIURFA",
    "UŞAK",
    "VAN",
    "YOZGAT",
    "ZONGULDAK",
    "AKSARAY",
    "BAYBURT",
    "KARAMAN",
    "KIRIKKALE",
    "BATMAN",
    "ŞIRNAK",
    "BARTIN",
    "ARDAHAN",
    "IĞDIR",
    "YALOVA",
    "KARABÜK",
    "KİLİS",
    "OSMANİYE",
    "DÜZCE",
]

const cityController=(counter,word)=>{
    let maxPoint=10;
    if (counter>1) {
        maxPoint=5;
    }
    const controll=cities.includes(word)
    if (controll) {
        return maxPoint;
    }else{
        return 0;
    }
    
}

module.exports={
    cityController
}