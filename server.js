const express = require('express');
const collectData = require('./collectData');
const dataCalculation = require('./dataCalculation');
const sendEmail = require('./sendEmail');
const axios = require('axios');

//const collectData = require('./collectData.js');

const app = express();
const port = 8000;

 //collectData.companyCodeName();

//collectData.readData()

function filterData(companyData){
    //let textData =[];
    companyData.forEach((company)=>{
        if(Number(company.marketPrice)<=Number(company.grahamNumber)){
            sendEmail.sendMail(company);
           
        }
    })

   // sendEmail.sendMail(textData);
}

async function main(){
    //const companyDetails = await dataCalculation.findGrahamNumber();
   // console.log(companyDetails)
    //sendEmail.sendMail(companyDetails[0]);
   // filterData(companyDetails);
   await collectData.readData();
}

main();




app.get('/',(req,res)=>{
    res.send("Hello World");
})

app.listen(port,()=>{
    console.log(`Listening on port ${port}`);
})

