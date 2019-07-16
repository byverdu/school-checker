#!/bin/bash

# Create temp folders
mkdir .temp
touch .temp/temp.html

# Download placements pdf file
curl https://www.wandsworth.gov.uk/media/4428/how_places_were_offered_2019.pdf --output shared-data/placements.pdf

# Create temp html file
pdftohtml -c -s -i -p shared-data/placements.pdf .temp/temp.html

# Remove white spaces
sed -i '' -e 's/&#160;/ /g' .temp/temp-html.html

# Get digits on the page
grep '">[0-9]' .temp/temp-html.html > .temp/counts.txt

# Find elements that are titles in uppercase
grep -e '<p .*\w[[:upper:]]\+' .temp/temp-html.html > .temp/title-names.txt

# Cleaning up no needed text
sed -i '' -e '/** includes two places reserved for children with an EHCP/d 
/** includes one places reserved for children with an EHCP/d
/** includes one place reserved for a child with an EHCP/d
/** includes three places reserved for children with an EHCP/d
/** includes two places reserved for a children with an EHCP/d
/** includes one places reserved for a child with an EHCP/d
/PAGE/d
/HOW PLACES WERE OFFERED AT EACH WANDSWORTH PRIMARY SCHOOL 2019/d' .temp/title-names.txt