#!/bin/bash

# Actions
function downloadListSchools {
  # save curl response
  mkdir .temp | echo "$curlSchoolsList" > .temp/primary-schools-list.html

  # # sort lines that are school links
  cat .temp/primary-schools-list.html | grep '<li><a href="/schools-and-admissions/schools/types-of-school/primary-schools/primary-schools-list' > .temp/temp-schools-list.txt

  # convert html tags into plain text
  sed -i '' -e 's/<li><a href="/https:\/\/www.wandsworth.gov.uk/g
  s/">.*/ /g' .temp/temp-schools-list.txt

  # remove extra tabs
  tr -d " \t" < .temp/temp-schools-list.txt > .temp/primary-schools-list.txt
}

function dowloadOfstedReports {
  # get links for ofsted report
  for URL in `cat .temp/primary-schools-list.txt`; do echo "$URL" ;curl -v --silent $1 "$URL" --stderr - | grep "$ofstedReportUrl" >> .temp/temp-ofsted-link.txt; done

  # clean up ofsted reports data
  sed -i '' -e 's/<td>\(.*\)">/ /g;s/<\(.*\)td>/ /g' .temp/temp-ofsted-link.txt
  tr -d " \t" < .temp/temp-ofsted-link.txt > shared-data/ofsted-link.txt
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

  sed -e '1i\
  const BASE_URL = '\"$ofstedReportUrl\"';
  1s/^/module.exports = [/
  s/'$ofstedReportUrl'/`${BASE_URL}/g
  s/$/`,/g
  $a\
  ];' shared-data/ofsted-link.txt > shared-data/schools-list.js
}

# url variables
councilUrl="https:\/\/www.wandsworth.gov.uk\/schools-and-admissions\/schools\/types-of-school\/primary-schools\/"
ofstedReportUrl="www.compare-school-performance.service.gov.uk\/school\/"
curlSchoolsList=$(curl https://www.wandsworth.gov.uk/schools-and-admissions/schools/types-of-school/primary-schools/primary-schools-list/)

# Execute Actions
downloadListSchools
dowloadOfstedReports
createJSDataFile

rm -rf .temp
