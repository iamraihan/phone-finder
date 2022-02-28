// search button event listener 
const searchButton = () => {
    const searchInput = document.getElementById('search-input')
    let input = searchInput.value

    // fetch api 
    const url = `https://openapi.programming-hero.com/api/phones?search=${input}`
    fetch(url)
        .then(res => res.json())
        .then(data => console.log(data.data))
}
