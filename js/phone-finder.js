// global variable
const phoneContainer = document.getElementById("phone-container");
const detailsContainer = document.getElementById("details-container");
let error = document.getElementById("error");
// spinner function
const toggleSpinner = (toggle) => {
    document.getElementById("toggle").style.display = toggle;
};
//error handle function
const errorHandle = (err) => {
    error.style.display = "block";
    error.innerHTML = err;
    phoneContainer.innerHTML = "";
    detailsContainer.innerHTML = "";
};
// search button event handler
const searchButton = () => {
    const searchInput = document.getElementById("search-input");
    let input = searchInput.value.toLowerCase();
    toggleSpinner("block");
    // when try to search without input anything show this error
    if (input === "") {
        errorHandle("Must input a phone name!!");
        toggleSpinner("none");
        return;
    }
    // fetch api
    const url = `https://openapi.programming-hero.com/api/phones?search=${input}`;
    fetch(url)
        .then((res) => res.json())
        .then((data) => {
            if (data.status === false) {
                errorHandle("No Phone Found...");
                toggleSpinner("none");
            } else if (data.status === true) {
                getPhone(data.data);
            }
        });
    //input empty after found result something...
    searchInput.value = "";
};
// view all phone function
const getPhone = (phones) => {
    if (phones === false) {
        toggleSpinner("block");
    } else {
        toggleSpinner("none");
    }
    const max20 = phones.slice(0, 20);
    max20.forEach((phone) => {
        error.style.display = "none";
        // console.log(phone)
        const div = document.createElement("div");
        div.classList.add("col");
        div.innerHTML = `
        <div class="card rounded shadow border-0">
            <img src="${phone.image}" class="card-img-top w-50 mx-auto p-3" alt="...">
            <div class="card-body">
            <h5 class="card-title">Model: ${phone.phone_name}</h5>
            <p class="card-text">Brand: ${phone.brand}</p>
            </div>
            <button onclick="getPhoneDetails('${phone.slug}')" class="btn btn-success rounded">Show Details</button>
        </div>
        `;
        phoneContainer.appendChild(div);
    });
};
// get details phone data from api function
const getPhoneDetails = (id) => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    fetch(url)
        .then((res) => res.json())
        .then((data) => showPhoneDetais(data.data));
};
// show details phone function
const showPhoneDetais = (info) => {
    toggleSpinner("block");
    console.log(info);

    detailsContainer.innerHTML = `
    <div class=" card w-75 mx-auto m-5 shadow ">
    <img src="${info.image}" class=" card-img-top p-3  w-50 mx-auto" alt="...">
    <div class="card-body">
      <h5 class="card-title">Model: ${info.name}</h5>
      <p class="card-text">Brand: ${info.brand}</p>
      <p class="card-text"> ${info.releaseDate || "No Release Date Found"} </p>
      <h5 class="card-title">Main Features</h5>
      <p class="card-text">Chipset: ${info.mainFeatures.chipSet}</p>
      <p class="card-text">Display: ${info.mainFeatures.displaySize}</p>
      <p class="card-text">Storage: ${info.mainFeatures.storage}</p>
      <p class="card-text">Memory: ${info.mainFeatures.memory}</p>
      <p class="card-text">Sensors: ${info.mainFeatures.sensors[0]}, ${info.mainFeatures.sensors[1]
        }, ${info.mainFeatures.sensors[2]}, ${info.mainFeatures.sensors[3]}, ${info.mainFeatures.sensors[4]
        }, ${info.mainFeatures.sensors[5]}</p>



        <h5 class="card-title">Others </h5>
  <p class="card-text"> ${info.others?.Bluetooth ? info?.others?.Bluetooth : "No Others Found"
        }</p>
  <p class="card-text"> ${info.others?.GPS ? info?.others?.GPS : ""}</p>
  <p class="card-text"> ${info.others?.NFC ? info?.others?.NFC : ""}</p>
  <p class="card-text"> ${info.others?.Radio ? info?.others?.Radio : ""}</p>
  <p class="card-text"> ${info.others?.USB ? info?.others?.USB : ""}</p>
  <p class="card-text"> ${info.others?.WLAN ? info?.others?.WLAN : ""}</p>



        

    </div>
  </div>
    `;
    toggleSpinner("none");
};
