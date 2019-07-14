#!/bin/bash

# url variables
councilUrl="https:\/\/www.wandsworth.gov.uk\/schools-and-admissions\/schools\/types-of-school\/primary-schools\/"
ofstedReportUrl="www.compare-school-performance.service.gov.uk\/school\/"
curlSchoolsList=$(curl https://www.wandsworth.gov.uk/schools-and-admissions/schools/types-of-school/primary-schools/primary-schools-list/)

# Actions
function downloadListSchools {
  # save curl response
  mkdir .temp | echo "$curlSchoolsList" > .temp/primary-schools-list.html

  # # sort lines that are school links
  cat .temp/primary-schools-list.html | grep '<li><a href="/schools-and-admissions/schools/types-of-school/primary-schools/primary-schools-list' > .temp/primary-schools-list.txt

  # convert html tags into plain text
  sed -i '' -e 's/<li><a href="/https:\/\/www.wandsworth.gov.uk/g
  s/">.*/ /g' .temp/primary-schools-list.txt

}

function dowloadOfstedReports {
  # get links for ofsted report
  for URL in `cat .temp/primary-schools-list.txt`; do echo "$URL" ;curl -v --silent $1 "$URL" --stderr - | grep "$ofstedReportUrl" >> .temp/temp-ofsted-link.txt; done

  # clean up ofsted reports data
  sed -i '' -e 's/<td>\(.*\)">/ /g;s/<\(.*\)td>/ /g' .temp/temp-ofsted-link.txt
}

function createJSDataFile {
  # combination of sed commands, separeted by [;] or new line
  # 0- insert at line 1 and read from variable => '1i\ 
  # const BASE_URL = '\"$councilUrl\"';
  # 1- Add at the beginning of the file => 1s/^/module.exports = [/
  # 2- Add double quotes at the beginning of each line => s/'$councilUrl'/`${BASE_URL}/g
  # 3- Add double quotes and comma at the end of each line => s/$/",/g
  # 4- Close array, needs to be in new line => $a\
  # ];

  sed -e '1s/^/module.exports = [/
  s/'$ofstedReportUrl'/`${BASE_URL}/g
  s/$/`,/g
  $a\
  ];' .temp/temp-ofsted-link.txt > .temp/ofsted-data-scriptjs.txt
  
  # delete returns carriages and white spaces
  tr -d "\r " < .temp/ofsted-data-scriptjs.txt > shared-data/ofsted-reports.js
  
  # Adding "const" afterwards for avoid losing whitespace when formatting in previous step
  sed -i '' -e '1i\
  const BASE_URL = '\"$ofstedReportUrl\"';' shared-data/ofsted-reports.js
}

# Execute Actions
downloadListSchools
dowloadOfstedReports
createJSDataFile

rm -rf .temp
