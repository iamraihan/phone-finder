// search button event listener 
const searchButton = () => {
    const searchInput = document.getElementById('search-input')
    let input = searchInput.value

    // fetch api 
    const url = `https://openapi.programming-hero.com/api/phones?search=${input}`
    fetch(url)
        .then(res => res.json())
        .then(data => getPhone(data.data))
}
const getPhone = (phones) => {
    // const max20 = phones.slice(0,20)
    const phoneContainer = document.getElementById('phone-container')
    phones.forEach(phone => {
        console.log(phone.slug)
        const div = document.createElement('div')
        div.classList.add('col')
        div.innerHTML = `
        <div class="card">
            <img src="${phone.image}" class="card-img-top" alt="...">
            <div class="card-body">
            <h5 class="card-title">${phone.phone_name}</h5>
            <p class="card-text">${phone.brand}</p>
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
        .then(data => console.log(data.data))
}

