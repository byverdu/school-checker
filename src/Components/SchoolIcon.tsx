import React from 'react';
import { EnumOfstedRatingColouring } from 'models';

interface SchoolIconProps {
  ratingColor: EnumOfstedRatingColouring;
}

const SchoolIcon: React.SFC<SchoolIconProps> = ({ratingColor}) => (
  <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 512 512" width="32" height="32" fill={ratingColor}><path d="M220.128,394.687a6,6,0,1,0-.88-11.967c-27.763,2.043-52.9,6.665-70.794,13.012C127.583,403.139,117,412.5,117,423.552c0,27.49,68.5,41.873,136.17,41.873,60.976,0,113.069-11.319,129.627-28.165,4.184-4.257,6.27-8.886,6.2-13.759-.032-10.884-10.482-20.124-31.06-27.466-17.739-6.329-42.655-10.937-70.16-12.974a6,6,0,1,0-.887,11.966C348.361,399.582,377,414.74,377,423.552c0,.034,0,.069,0,.1.026,1.555-.9,3.3-2.761,5.193-12,12.213-57.446,24.577-121.069,24.577-34.194,0-66.3-3.654-90.4-10.29C139.443,436.71,129,428.67,129,423.552,129,414.616,157.962,399.264,220.128,394.687Z"/><path d="M346.273,241.939a8.4,8.4,0,1,0,8.346,8.4A8.387,8.387,0,0,0,346.273,241.939Z"/><path d="M256,196.048c-7.225,0-14.451-1.173-20.081-3.517l-40.876-17.019v34c20.609.662,39.293,17.713,51.74,29.072,2.914,2.659,6.408,5.848,8.41,7.283,1.99-1.445,5.453-4.621,8.344-7.271,12.568-11.526,31.531-28.91,51.985-29.1V176.109l-39.441,16.422C270.451,194.875,263.225,196.048,256,196.048Z"/><path d="M256,109.291l-94.391,39.3,78.923,32.86c8.24,3.432,22.7,3.432,30.936,0l78.923-32.86Z"/><path d="M440,283.671V78.575a32.037,32.037,0,0,0-32-32H104a32.037,32.037,0,0,0-32,32v205.1a32.037,32.037,0,0,0,32,32H205.923a6,6,0,0,1,5.586,3.809l41.264,105.226L294.037,319.48a6,6,0,0,1,5.586-3.809H408A32.037,32.037,0,0,0,440,283.671ZM368.306,154.132l-15.915,6.626v70.128a20.355,20.355,0,1,1-12-.07V165.755l-12.869,5.358V215.5a6,6,0,0,1-6,6H315.86c-15.916,0-32.945,15.615-44.214,25.948-7.943,7.285-11.931,10.941-16.424,10.941-4.547,0-8.551-3.654-16.528-10.933-11.326-10.336-28.443-25.956-44.886-25.956h-4.765a6,6,0,0,1-6-6v-44.98l-39.349-16.384a6,6,0,0,1,0-11.078l110-45.8a6,6,0,0,1,4.612,0l110,45.8a6,6,0,0,1,0,11.078Z"/></svg>
);

export default SchoolIcon;