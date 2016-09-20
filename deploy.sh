#!/bin/bash

rm -rf dist
mkdir dist

cp -r assets/* assets/.htaccess dist

for dir in levels/level*/; do
    level=$(basename "$dir")
    levelDir="dist/$level"
    mkdir "$levelDir"
    for file in "$dir"/*; do
        filename=$(basename "$file")
        extension="${filename##*.}"
        if [[ $extension == "html" ]]; then
            cat "templates/header.html" "$file" "templates/footer.html" > "$levelDir/$filename"
        else
            cp "$file" "$levelDir"
        fi
    done
done
