module.exports = {
  addressCase: (value) => {
    const temp = value.split(', London, ');
    const address = temp.shift();
    const postcode = temp.pop();

    return {
      address,
      postcode
    }
  },
  typeCase: (value) => ({
    type: value.split('\n            ')[1].split('     ').shift()
  }),
  ofstedCase: (element) => {
    const ofstedRating = element.querySelector('.rating-text');
    const ofstedDate = element.querySelector('.rating-date time');
    const rating = ofstedRating ? ofstedRating.textContent.split('                ').pop().trim() : 'Not Applicable';
    const date = ofstedDate ? ofstedDate.textContent : 'Not Applicable';

    return {
      ofstedDate: date,
      ofstedRating: rating
    }
  }
};