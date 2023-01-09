
const cheerio = require('cheerio');
const axios = require('axios');
const pretty = require("pretty");
const fs = require("fs");
const calculate = require('./dataCalculation')
const sendEmail = require('./sendEmail');
//collecting all company code name ;



const url = 'https://merolagani.com/LatestMarket.aspx';

const companyDataUrl = 'https://merolagani.com/CompanyDetail.aspx?symbol=';
//const companyDataUrl = 'https://www.sharesansar.com/company/';



let companyCode = [];

async function companyCodeName(){
    const responseData = await axios.get(url);
    const $ = cheerio.load(responseData.data);
    const rawCode = $(".decrease-row");
    console.log(typeof rawCode)
  //  console.log(rawCode.text());

    console.log(rawCode.length);
    rawCode.each(function (id,ele){
        
        //console.log($(ele).text());
        let name = $(ele).find("a").text();
        companyCode.push(name);
        // console.log(name);
    })
    
    console.log(companyCode);
    fs.writeFileSync("companyCodeName.csv","");
    for(let code of companyCode){
       // console.log(code);
       fs.appendFileSync("companyCodeName.csv",`${code}\n`);
    }
    

    
}

async function getCompanyDetails(companyName){
       const response = await axios.get(companyDataUrl+companyName);
       const $ = cheerio.load(response.data);
       
        const companyData ={
          name:"",
          sector:"",
          sharesOutstanding:"",
          marketPrice:"",
          change:"",
          lastTradedOn:"",
          highLow52Weeks:"",
          average120Day:"",
          oneYearYield:"",
          eps:"",
          peRatio:"",
          bookValue:"",
          pbv:"",
          dividend:"",
          bonus:"",
          rightShare:"",
          average30Day:"",
          marketCapitalization:"",
          grahamNumber:"",
          
        };
       console.log(companyDataUrl+companyName);
       companyData.name = companyName;
       companyData.sector=$('#accordion > tbody:nth-child(1) > tr > td').text().replaceAll('\n','').trim();
       companyData.sharesOutstanding = $('#accordion > tbody:nth-child(2) > tr > td').text().replaceAll('\n','').replaceAll(' ','');
       companyData.marketPrice=($('#ctl00_ContentPlaceHolder1_CompanyDetail1_lblMarketPrice').text());
       companyData.change = $('#ctl00_ContentPlaceHolder1_CompanyDetail1_lblChange').text();
       companyData.lastTradedOn = $('#accordion > tbody:nth-child(5) > tr > td').text().replaceAll('\n','').replaceAll(' ',''); 
       companyData.highLow52Weeks = $('#accordion > tbody:nth-child(6) > tr > td').text().replaceAll('\n','').replaceAll(' ',''); 
       companyData.average120Day = $('#accordion > tbody:nth-child(8) > tr > td').text().replaceAll('\n','').replaceAll(' ',''); 
       companyData.oneYearYield = $('#ctl00_ContentPlaceHolder1_CompanyDetail1_lblYearYeild').text(); 
       companyData.eps = $('#accordion > tbody:nth-child(10) > tr > td').text().replaceAll('\n','').replaceAll(' ','').slice(0,4); 
       companyData.peRatio = $('#accordion > tbody:nth-child(11) > tr > td').text().replaceAll('\n','').replaceAll(' ',''); 
       companyData.bookValue = $('#accordion > tbody:nth-child(12) > tr > td').text().replaceAll('\n','').replaceAll(' ',''); 
       companyData.pbv = $('#accordion > tbody:nth-child(13) > tr > td').text().replaceAll('\n','').replaceAll(' ',''); 
       companyData.dividend = $('').text(); 
       companyData.bonus = $('').text(); 
       companyData.rightShare = $('').text(); 
       companyData.average30Day = $('#accordion > tbody:nth-child(17) > tr > td').text().replaceAll('\n','').replaceAll(' ',''); 
       companyData.marketCapitalization = $('#accordion > tbody:nth-child(18) > tr > td').text().replaceAll('\n','').replaceAll(' ',''); 
        
        return companyData;

       
       
}
function waitforme(milisec) {
  return new Promise(resolve => {
      setTimeout(() => { resolve('') }, milisec);
  })
}


async function readData(){
  const buffer_data = fs.readFileSync('companyCodeName.csv',  {encoding:'utf8', flag:'r'});
  const companyName = buffer_data.split('\n');
  
  console.log(companyDataUrl+companyName[0]);
  const allCompanyData = [];
  console.log(companyName.length);
  for(let i=0;i<companyName.length-1;i++){
    
      await waitforme(20000);
      const company = await getCompanyDetails(companyName[i]);
     // allCompanyData.push(await getCompanyDetails(companyName[i]));
     allCompanyData.push(company);
     company.grahamNumber = calculate.grahamNumber(company);
     console.log(company.grahamNumber);
      if(Number(company.marketPrice)<=Number(company.grahamNumber)){
        sendEmail.sendMail(company);
       // let sendData = `${companyData.name} Is Under Valued ! Current Market Price is ${companyData.marketPrice} and Graham Value is ${companyData.grahamNumber}`;
       // textData.push(sendData);
       //debbugin
       console.log("email send");
    }
      console.log(i);
    
    
    


  }
  //allCompanyData.push(await getCompanyDetails(companyName[111]));
  
  //console.log(allCompanyData);
 // return allCompanyData;
  
}





 











module.exports={companyCodeName,readData};
