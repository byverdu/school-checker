/// <reference types="Cypress" />
const uuid = require('uuid');
const schools = require('../../../shared-data/ofsted-reports');
const {
  addressCase,
  typeCase,
  ofstedCase
} = require('../../utils');

const data = [];
const schoolProps = {
  address: 'Address:',
  type: 'School type:',
  sex: 'Gender of entry:',
  age: 'Age range:',
  religion: 'Religious character:',
  website: 'Website:',
  extraInfo: 'Further information:',
  ofsted: 'Ofsted rating:'
};
const schoolStats = {
  statsReading: 'Reading',
  statsWriting: 'Writing',
  statsMaths: 'Maths'
}
const test = schools.slice(0, 1);

describe('Name of the group', () => {
  after(() => {
    cy.writeFile('config/scrapped-schools-data.json', JSON.stringify(data));
  });

  const schoolsCount = schools.length;

  schools.forEach((schoolURLReport, index) => {
    const id = uuid();
    const count = index + 1;
    const [, , , schoolName,] = schoolURLReport.split('/')
    console.log('index =>', index)
    let schoolsMapper = {};
    describe(`School Scrapper for ${schoolName}, ${count} out of ${schoolsCount}`, function () {
      before(() => {
        cy.visit(schoolURLReport);
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
              name,
              schoolURLReport
            }

            expect(true).to.equal(true)
          });
      });

      Object.keys(schoolProps).forEach(key => {
        it(`Gets ${schoolProps[key]} value`, () => {
          cy.get('dl.metadata-school-detail')
            .contains(`${schoolProps[key]}`)
            .next('dd')
            .then((element) => {

              let value = element[0].textContent;

              if (key === 'website' || key === 'extraInfo') {
                value = element[0].querySelector('a').href;
              }

              switch (key) {
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

      Object.keys(schoolStats).forEach((key, index) => {
        it(`Gets stats for ${schoolStats[key]}`, () => {
          cy.get('.primary-school-progress')
            .find('.column-third')
            .eq(index)
            .find('.scores')
            .then(element => {

              const text = element[0].querySelector('.label-label').textContent.trim();
              const score = element[0].querySelector('.label-value').textContent.trim();

              schoolsMapper = {
                ...schoolsMapper,
                [`${key}`]: `${text}:${score}`
              }
            });
        });
      });

      it('Gets the info for some metrics', () => {
        cy.get('.data-widget')
          .then(elements => {

            function getSvgElement(element) {
              return element.querySelector('svg').outerHTML;
            }

            function getScoreText(element, index) {
              return element.querySelectorAll('text')[index].textContent.replace('%', '');
            }

            schoolsMapper = {
              ...schoolsMapper,
              charts: {
                expected: {
                  text: 'Meeting expected Standard',
                  svg: getSvgElement(elements[0]),
                  score: {
                    school: getScoreText(elements[0], 0),
                    localAuthoroty: getScoreText(elements[0], 1),
                    england: getScoreText(elements[0], 2)
                  }
                },
                higher: {
                  text: 'Achieving higher Standard',
                  svg: getSvgElement(elements[1]),
                  score: {
                    school: getScoreText(elements[1], 0),
                    localAuthority: getScoreText(elements[1], 1),
                    england: getScoreText(elements[1], 2)
                  }
                },
                readScore: {
                  text: 'Average score in reading',
                  svg: getSvgElement(elements[2]),
                  score: {
                    school: getScoreText(elements[2], 0),
                    localAuthority: getScoreText(elements[2], 1),
                    england: getScoreText(elements[2], 2)
                  }
                },
                writeScore: {
                  text: 'Average score in writing',
                  svg: getSvgElement(elements[3]),
                  score: {
                    school: getScoreText(elements[3], 0),
                    localAuthority: getScoreText(elements[3], 1),
                    england: getScoreText(elements[3], 2)
                  }
                },
              }
            }
          });
      });
    });
  });
});

