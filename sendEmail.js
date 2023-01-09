const dataCalculation  = require('./dataCalculation');
const nodemailer = require('nodemailer');

require('dotenv').config();

async function sendMail(companyData){

    let sendData = `${companyData.name} Is Under Valued ! Current Market Price is ${companyData.marketPrice} and Graham Value is ${companyData.grahamNumber}
      link : https://merolagani.com/CompanyDetail.aspx?symbol=${companyData.name}`;
    
    let transporter = nodemailer.createTransport({
        host:"smtp.gmail.com",
        port:587,
        secure:false,
        auth:{
            user:process.env.EMAIL,
            pass:process.env.PASSWORD
        },
    })

    let info = await transporter.sendMail({
        from:'"From Code "<testcodeprivate@gmail.com',
        to:"amirpoudel2058@gmail.com",
        subject:"Stocks Under Valution -  Graham Number ",
        text:sendData,
    })

    console.log(info);



}

module.exports = {sendMail}