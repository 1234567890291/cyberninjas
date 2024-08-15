'use strict'
import API_KEY from './config.js'

const ipAddressField = document.querySelector('.ipAddressField')
const timezoneInput = document.querySelector('.timezoneInput')
const countryLocationInput = document.querySelector('.locationInput')
const ispInput = document.querySelector('.ispInput')
const submitBtn = document.querySelector('.submit-btn')
const inputField = document.querySelector('.input-field')
const mapSelection = document.querySelector('.map-selection')

let map
let marker

const initMap = () => {
  const selectedMap = mapSelection.value
  const mapContainer = document.getElementById('map')
  mapContainer.innerHTML = ''

  if (selectedMap === 'google') {
    map = new google.maps.Map(mapContainer, {
      center: { lat: 51.505, lng: -0.09 },
      zoom: 13,
    })
    marker = new google.maps.Marker({
      position: { lat: 51.505, lng: -0.09 },
      map: map,
    })
  } else {
    map = L.map('map').setView([51.505, -0.09], 13)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map)
    marker = L.marker([51.505, -0.09]).addTo(map)
  }
}

const updateMap = (lat, lng) => {
  const selectedMap = mapSelection.value
  const position = { lat: parseFloat(lat), lng: parseFloat(lng) }

  if (selectedMap === 'google') {
    map.setCenter(position)
    map.setZoom(17)
    marker.setPosition(position)
  } else {
    map.setView([lat, lng], 17)
    marker.setLatLng([lat, lng])
  }
}

// API
let ipAddress
let randomIP = ''
let timeZone
let countryLocation
let cityLocation
let postalCode
let isp
let lat
let lng

let url = `https://api.ipgeolocation.io/ipgeo?apiKey=${API_KEY}`
fetch(url)
  .then((response) => response.json())
  .then((response) => {
    ipAddress = response.ip
    timeZone = response.time_zone.offset
    countryLocation = response.country_name
    cityLocation = response.city
    postalCode = response.zipcode
    isp = response.isp
    lat = response.latitude
    lng = response.longitude

    ipAddressField.innerHTML = ipAddress
    timezoneInput.innerHTML = ` UTC ${timeZone}`
    countryLocationInput.innerHTML = `${countryLocation}, ${cityLocation} ${postalCode}`
    ispInput.innerHTML = isp
    updateMap(lat, lng)
  }).catch(error => console.log(error))

// Search by IP + validation
submitBtn.addEventListener('click', (event) => {
  event.preventDefault()
  if (
    inputField.value.match(
      /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,
    )
  ) {
    randomIP = inputField.value
    url = `https://api.ipgeolocation.io/ipgeo?apiKey=${API_KEY}&ip=${randomIP}`
    fetch(url)
      .then((response) => response.json())
      .then((response) => {
        ipAddress = response.ip
        timeZone = response.time_zone.offset
        countryLocation = response.country_name
        cityLocation = response.city
        postalCode = response.zipcode
        isp = response.isp
        lat = response.latitude
        lng = response.longitude

        ipAddressField.innerHTML = ipAddress
        timezoneInput.innerHTML = ` UTC ${timeZone}`
        countryLocationInput.innerHTML = `${countryLocation}, ${cityLocation} ${postalCode}`
        ispInput.innerHTML = isp
        updateMap(lat, lng)
      }).catch(error => console.log(error))
  } else {
    alert('You have entered an invalid IP address!')
    return false
  }
})

// Reinitialize map on selection change
mapSelection.addEventListener('change', initMap)

// Initialize map when the window loads
window.onload = initMap
