import moment from 'moment';
import { EnumOfstedRating } from 'Models/Enums';

export interface School {
  id: string;
  name: string;
  schoolURLReport: string;
  address: string;
  postcode: string;
  type: string;
  sex: string;
  age: string;
  religion: string;
  website: string;
  extraInfo: string;
  ofstedDate: string;
  daysSinceLastReport: string;
  ofstedRating: string;
  statsReading: string;
  statsWriting: string;
  statsMaths: string;
  admissionNumber: number;
  furthestDistance: number;
  charts: ChartsData;
  lat: number;
  lng: number;
}

export class SchoolMaker {
  static create(school: School): School {

    const {
      id,
      name,
      schoolURLReport,
      address,
      postcode,
      type,
      sex,
      age,
      religion,
      website,
      extraInfo,
      ofstedDate,
      ofstedRating,
      statsReading,
      statsWriting,
      statsMaths,
      admissionNumber,
      furthestDistance,
      charts,
      lat,
      lng
    } = school;

    let daysSinceLastReport = 'Not Applicable';
    let ofstedDay = ofstedDate;

    if (moment(ofstedDate).isValid()) {
      const today = moment();
      ofstedDay = moment(ofstedDate).format('DD MMM YYYY');
      let tempDate = moment(ofstedDate);
  
      let diffYears = today.diff(tempDate, 'years');
      tempDate.add(diffYears, 'years');
      
      let diffMonths = today.diff(tempDate, 'months');
      tempDate.add(diffMonths, 'months');
  
      let diffDays = today.diff(tempDate, 'days');
      
      daysSinceLastReport = `${diffYears} years ${diffMonths} months and ${diffDays} days`;
    }


    return {
      id,
      name,
      schoolURLReport,
      address,
      postcode,
      type,
      sex,
      age,
      religion,
      website,
      extraInfo,
      ofstedDate: ofstedDay ,
      daysSinceLastReport,
      ofstedRating: EnumOfstedRating[ofstedRating],
      statsReading,
      statsWriting,
      statsMaths,
      admissionNumber,
      furthestDistance,
      charts,
      lat,
      lng
    }
  }
}

export interface ChartsData {
  expected: Chart;
  higher: Chart;
  readScore: Chart;
  writeScore: Chart;
}

export interface Chart {
  text: string;
  svg: string;
  score: {
    school: number;
    localAuthority: number;
    england: number;
  }
}
