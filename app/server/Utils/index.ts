import axios from 'axios';

export const BASE_API_URL = 'https://api.nestoria.co.uk/api?action=search_listings&encoding=json&pretty';

let pageNumber = 0;

export async function getPaginatedFlats (url, flats, resolve, reject) {
  axios.get(url)
    .then(response => {
      const fetchedFlats = flats.concat(response.data.response.listings)
      if (response.data.response.total_pages > pageNumber) {
        pageNumber += 1;
        console.log(pageNumber)
        const newUrl = `${BASE_API_URL}&page=${pageNumber}&place_name=putney&listing_type=rent&number_of_results=50`
        getPaginatedFlats(newUrl, fetchedFlats, resolve, reject)
      } else {
        resolve(fetchedFlats)
      }
    })
    .catch(error => {
      console.log(error)
      reject('Something wrong. Please refresh the page and try again.')
    })
}