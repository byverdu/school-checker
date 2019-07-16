/// <reference types="Cypress" />
const uuid = require('uuid');
const schools = require('../../../shared-data/ofsted-reports');
const {
  addressCase,
  typeCase,
  ofstedCase
} = require('../../utils');

const data = [];
const props = {
  address: 'Address:',
  type: 'School type:',
  sex: 'Gender of entry:',
  age: 'Age range:',
  religion: 'Religious character:',
  website: 'Website:',
  extraInfo: 'Further information:',
  ofsted: 'Ofsted rating:'
};
const test = schools.slice(0, 3);

describe('Name of the group', () => {
  after(() => {
    cy.writeFile('config/schools-data.json', JSON.stringify(data));
  });
  
  schools.forEach(school => {
    const id = uuid();
    let schoolsMapper = {};
    describe('School Scrapper', function() {
      before(() => {
        cy.visit(school);
      });
      after(() => {
        data.push(schoolsMapper);
      });

        
      it('Gets the School name', () => {
        cy.get('.heading-large')
        .then((element) => {
            const name = element[0].textContent;
            schoolsMapper = {
              ...schoolsMapper,
              id,
              name
            }

            expect(true).to.equal(true)
          });
        });
      
        
      Object.keys(props).forEach(key => {
        it(`Gets ${props[key]} value`, () => {
          cy.get('dl.metadata-school-detail')
            .contains(`${props[key]}`)
            .next('dd')
            .then((element) => {
              console.log(element)
              let value = element[0].textContent;

              if (key === 'website' || key === 'extraInfo') {
                value = element[0].querySelector('a').href;
              }

              switch(key) {
                case 'address':
                  schoolsMapper = {
                    ...schoolsMapper,
                    ...addressCase(value)
                  }
                  break;

                case 'type':
                  schoolsMapper = {
                    ...schoolsMapper,
                    ...typeCase(value)
                  }
                  break;

                case 'ofsted':
                  schoolsMapper = {
                    ...schoolsMapper,
                    ...ofstedCase(element[0])
                  }
                  break;
                
                default:
                  schoolsMapper = {
                    ...schoolsMapper,
                    [`${key}`]: value
                  }
              }

              expect(true).to.equal(true)
            });
          });
      });
    });
  });
});

