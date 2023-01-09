const collectData = require('./collectData');

 function grahamNumber(companyData){
    
    
   // console.log(allCompanyData);
   let marketPrice = Number(companyData.MarketPrice);
   let eps = Number(companyData.eps);
   let bookValue = Number(companyData.bookValue);
   let grahamValue =  Math.sqrt(22.5*eps*bookValue);
   return grahamValue;
   

   

}

async function findGrahamNumber(){
    //const allCompanyData =await collectData.readData();
   // function calculate(company){
    //    company.grahamNumber = grahamNumber(company);
   // }
  //  allCompanyData.forEach(calculate);
    // console.log(allCompanyData[0].name)
    // console.log(allCompanyData[0].marketPrice);
    // console.log(allCompanyData[0].grahamNumber);
   // return allCompanyData;
   
   
}

module.exports ={findGrahamNumber,grahamNumber};