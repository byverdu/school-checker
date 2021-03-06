export enum EnumOfstedRating {
  None,
  Outstanding,
  Good,
  'Requires improvement',
  Inadequate,
}

export enum EnumOfstedRatingColouring {
  None = '#5158BB',
  Outstanding = '#517143',
  Good = '#FFCC00',
  'Requires improvement' = '#F96D02',
  Inadequate = '#CA3C25',
}

export enum EnumFlatRatingColouring {
  New = '#517143',
  Mid = '#FFCC00',
  Half = '#F96D02',
  Old = '#CA3C25',
}

export enum EnumTypeOfSchool {
  'Foundation school',
  'Maintained school',
  'Community school',
  'Voluntary aided school',
  'Faith school',
  'Academy - Converter mainstream',
  'Academy sponsor led mainstream',
  'Academy',
  'Free school - Mainstream'
}

export type MarkerType = 'school' | 'flat' | 'location';

export interface CustomMarkerOpts extends google.maps.MarkerOptions {
  id?: MarkerType;
}

export const mapTypeOfSchool = {
  0: `Foundation schools are maintained schools which differ from other maintained schools in that the governing body employs the staff, most commonly holds the land and buildings, and is responsible for admissions.

  A smaller number of foundation schools are supported by a charitable foundation. In these cases the foundation, rather than the governing body, will hold the land.`,

  1: `Maintained schools are schools funded by a local authority. They have to follow the national curriculum opens in a new windowand are regularly inspected by Ofsted opens in a new window. They generally follow the local authority's rules on admissions, special educational needs and exclusions. Maintained schools are overseen by governors and are held to account by their local authority.`,

  2: `Community schools are maintained schools which do not fall into more specialised categories such as foundation school, pupil referral unit, voluntary aided or voluntary controlled school.`,

  3: `A voluntary aided school is a type of maintained school run by a charitable foundation which own the school's premises and appoints the majority of governors. The governing body is the employer of staff and sets the school's admission criteria. The majority of voluntary aided schools are faith schools and can prioritise 100% of their places on faith-based admissions criteria when they are oversubscribed.`,

  4: `Faith schools can choose what they teach in religious studies. Faith schools may have different admissions criteria and staffing policies to other state schools, although anyone can apply for a place. Faith schools can be academies, free schools, voluntary aided, voluntary controlled schools or other maintained schools.`,

  5: `This is usually a school which has chosen to convert to academy status. It inherits the performance history of its predecessor school, unlike a sponsor led academy, which does not. Academy converters can also be former 'Academy sponsor-led' schools that are now under the management of a new trust.`,

  6: `These academies differ from other academies in that they are run by a trust that was established by a sponsor. Also, although any academy can have a sponsor, those which are 'sponsor led' were typically underperforming and in need of help from a sponsor to improve performance. Some sponsor led academies were entirely new schools built to meet an increased need for school places.`,

  7: `Academies are schools funded directly by the government, not a local authority. They don't have to follow the national curriculum opens in a new window(although many academies choose to follow it) and can set their own term dates. They still have to follow the same rules on Ofsted inspections opens in a new window, special educational needs and exclusions as other state schools.

  Academies are run by an academy trust which sets the admissions policy and employs the staff. Some schools are part of multi-academy trusts (MATs) that control more than one school. As part of a MAT they can share staff and expertise, and make savings when buying goods and services. Some academies have sponsors such as businesses, universities, other schools, faith groups or voluntary groups.
  
  Most academies lease land and buildings from a local authority at a peppercorn rent. In some cases, the freehold may be held by the academy or by a charitable foundation.`,

  8: `Free schools are schools funded by the government and not run by a local authority. They can be established by a charity, a community group, parents or a business. They have more control over how they do things, for example whether to follow the national curriculum opens in a new window, setting staff pay and conditions and the length of school terms and the school day. They have to follow the same rules on Ofsted inspections opens in a new window, special educational needs and exclusions as other state schools.
  
  Like other state schools, there are no fees for parents to pay, 'free' is intended in the sense of 'free to make their own decisions'.`
}
