const axios = require('axios');

const axiosInstance = axios.create({
    baseURL: "http://sozluk.gov.tr/gts?ara=",
    
});
// axiosInstance.interceptors.request.use(async req => {
//     const accessToken = localStorage.getItem("access_token");
//     if (accessToken !==null){
//         req.headers.Authorization = `Bearer ${accessToken}`
      
//     }
//     return req
// })


module.exports=axiosInstance;