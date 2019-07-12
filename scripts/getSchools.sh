#!/bin/bash

councilUrl="https:\/\/www.wandsworth.gov.uk\/schools-and-admissions\/schools\/types-of-school\/primary-schools\/"

curlSchoolsList=$(curl https://www.wandsworth.gov.uk/schools-and-admissions/schools/types-of-school/primary-schools/primary-schools-list/)

# save curl response
mkdir .temp | echo "$curlSchoolsList" > .temp/schools-list.html

# sort lines that are school links
cat .temp/schools-list.html | grep '<li><a href="/schools-and-admissions/schools/types-of-school/primary-schools/primary-schools-list' > .temp/schools-list.txt

# convert html tags into plain text
sed -i '' -e 's/<li><a href="/https:\/\/www.wandsworth.gov.uk/g
s/">.*/ /g' .temp/schools-list.txt

# c"ombination of sed commands, separeted by [;] or new line
# 1- Add at the beginning of the file => 1s/^/module.exports = [/
# 2- Add double quotes at the beginning of each line => s/https/"https/g
# 3- Add double quotes and comma at the end of each line => s/$/",/g
# 4- Close array, needs to be in new line => $a\
# ];

sed -e '1i\ 
const BASE_URL = '\"$councilUrl\"';
1s/^/module.exports = [/
s/'$councilUrl'/`${BASE_URL}/g
s/$/`,/g
$a\
];' .temp/schools-list.txt > shared-data/schools-list.js

rm -rf .temp
