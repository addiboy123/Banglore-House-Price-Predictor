let location_bar=document.querySelector("#uiLocations");
// let result=document.querySelector("#uiEstimatedPrice");

function getBathValue() {
    var uiBathrooms = document.getElementsByName("uiBathrooms");
    for(var i in uiBathrooms) {
      if(uiBathrooms[i].checked) {
          return parseInt(i)+1;
      }
    }
    return -1; // Invalid Value
  }
  
  function getBHKValue() {
    var uiBHK = document.getElementsByName("uiBHK");
    for(var i in uiBHK) {
      if(uiBHK[i].checked) {
          return parseInt(i)+1;
      }
    }
    return -1; // Invalid Value
  }



let location_url="http://127.0.0.1:5000/get_location_names"
let predict_url="http://127.0.0.1:5000/predict_home_price"
async function get_location() {
    let locations= await fetch(location_url);
    data= await locations.json();
    data.locations.forEach((i) => {
        let opt=document.createElement('option');
        opt.innerText=i;
        location_bar.append(opt)
    });

} 
get_location();

async function onClickedEstimatePrice() {
    var sqft = document.getElementById("uiSqft");
    var bhk = getBHKValue();
    var bathrooms = getBathValue();
    // var location = document.getElementById("uiLocations");
    var estPrice = document.getElementById("uiEstimatedPrice");
    $.post(predict_url, {
      total_sqft: parseFloat(sqft.value),
      bhk: bhk,
      bath: bathrooms,
      location: location_bar.value
  },function(data, status) {
      console.log(data.estimated_price);
      estPrice.innerHTML = "<h2>" + data.estimated_price.toString() + " Lakh</h2>";
      console.log(status);
  });
}