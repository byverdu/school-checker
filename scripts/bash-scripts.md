# Bash Instructions

## Download placements pdf file

```shell
> curl https://www.wandsworth.gov.uk/media/4428/how_places_were_offered_2019.pdf --output placements.pdf
```

### Convert to html

```shell
> pdftohtml -c -s -i -p placements.pdf
```

### Remove white spaces

```shell
sed -i '' -e 's/&#160;/ /g' placements-html.html
```

### Find elements that are digits

```bash
> grep '">[0-9]' placements-html.html > counts.txt
```

### Find elements that are titles in uppercase

```bash
# '.*' concats patterns in regex

> grep -e '<p .*\w[[:upper:]]\+' placements-html.html > title-names.txt
```

### Delete unneeded lines

```bash
> sed -i '' -e '/PAGE/d' title-names.txt
```

### Add new line after pattern

```bash
> sed -i '' -e '/[0-9]m/s/$/\
/' counts.txt
```

## Get page with list of schools

```shell
> curl https://www.wandsworth.gov.uk/schools-and-admissions/schools/types-of-school/primary-schools/primary-schools-list/ > schools-list.html
```

### Grab those lines that are school links

```shell
> cat schools-list.html | grep '<li><a href="/schools-and-admissions/schools/types-of-school/primary-schools/primary-schools-list' > schools-list.txt
```

### Convert html tags into plain text

```shell
> sed -i '' -e 's/<li><a href="/https:\/\/www.wandsworth.gov.uk/g' schools-list.txt

> sed -i '' -e 's/">.*/ /g' schools-list.txt
```

### Convert text file into js

```shell
# combination of sed commands, separeted by [;] or new line
# 1- Add at the beginning of the file => 1s/^/module.exports = [/
# 2- Add double quotes at the beginning of each line => s/https/"https/g
# 3- Add double quotes and comma at the end of each line => s/$/",/g
# 4- Close array, needs to be in new line => $a\
# ];

sed -e '1s/^/module.exports = [/
s/https/"https/g
s/$/",/g
$a\
];' schools-list.txt > schools-list.js
```
