const phoneContainer = document.getElementById('phone-container')
const error = document.getElementById('error')

// search button event listener 
const searchButton = () => {
    const searchInput = document.getElementById('search-input')
    let input = searchInput.value


    if (input === '') {
        error.style.display = 'block'
        error.innerHTML = 'Must input a phone name!!'
        return
    }
    // fetch api 
    const url = `https://openapi.programming-hero.com/api/phones?search=${input}`
    fetch(url)
        .then(res => res.json())
        .then(data => {
            if (data.status === 'false') {
                // console.log(data.data)
                error.innerHTML = 'Please input a valid phone name'
            } else {
                getPhone(data.data)
            }
        })

    searchInput.value = ''
}
const getPhone = (phones) => {
    const max20 = phones.slice(0, 20)
    // const phoneContainer = document.getElementById('phone-container')
    max20.forEach(phone => {
        error.style.display = 'none'
        // console.log(phone)
        const div = document.createElement('div')
        div.classList.add('col')
        div.innerHTML = `
        <div class="card">
            <img src="${phone.image}" class="card-img-top " alt="...">
            <div class="card-body">
            <h5 class="card-title">Model: ${phone.phone_name}</h5>
            <p class="card-text">Brand: ${phone.brand}</p>
            </div>
            <button onclick="getPhoneDetails('${phone.slug}')" class="btn btn-primary">Show Details</button>
        </div>
        `
        phoneContainer.appendChild(div)
    })
}

const getPhoneDetails = (id) => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`
    fetch(url)
        .then(res => res.json())
        .then(data => showPhoneDetais(data.data))
}
const showPhoneDetais = (info) => {
    console.log(info)
    const detailsContainer = document.getElementById('details-container')
    detailsContainer.innerHTML = `
    <div class="card w-50 mx-auto m-5">
    <img src="${info.image}" class="card-img-top " alt="...">
    <div class="card-body">
      <h5 class="card-title">Model: ${info.name}</h5>
      <p class="card-text">Brand: ${info.brand}</p>
      <p class="card-text"> ${info.releaseDate || 'No Release Date Found'} </p>
      <p class="card-text">Chipset: ${info.mainFeatures.chipSet}</p>
      <p class="card-text">Display: ${info.mainFeatures.displaySize}</p>
      <p class="card-text">Storage: ${info.mainFeatures.storage}</p>
      <p class="card-text">Memory: ${info.mainFeatures.memory}</p>
      <p class="card-text">Sensors: ${info.mainFeatures.sensors[0]}, ${info.mainFeatures.sensors[1]}, ${info.mainFeatures.sensors[2]}, ${info.mainFeatures.sensors[3]}, ${info.mainFeatures.sensors[4]}, ${info.mainFeatures.sensors[5]}</p>

        

    </div>
  </div>
    `
}

