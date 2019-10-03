import axios from 'axios';

let pageNumber = 0;

export async function getPaginatedFlats (url, flats, resolve, reject) {
  const newUrl = new URL(url);

  axios.get(url)
  .then(response => {
    const fetchedFlats = flats.concat(response.data.response.listings)
    if (response.data.response.total_pages > pageNumber) {
      pageNumber += 1;
      newUrl.searchParams.set('page', `${pageNumber}`);

      getPaginatedFlats(newUrl.href, fetchedFlats, resolve, reject)
      } else {
        pageNumber = 0;
        resolve(fetchedFlats)
      }
    })
    .catch(error => {
      console.log(error)
      reject('Something wrong. Please refresh the page and try again.')
    })
}