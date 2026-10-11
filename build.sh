#!/bin/bash

rm -rf dist
mkdir dist

cp -r assets/* dist

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
            cp -r "$file" "$levelDir"
        fi
    done

    if [[ -e "$levelDir/post-build.sh" ]]; then
        pushd "$levelDir" > /dev/null
        bash post-build.sh
        rm post-build.sh
        popd > /dev/null
    fi
done

mkdir dist/finish
cat "templates/header.html" "levels/finish/eof.html" "templates/footer.html" > "dist/finish/eof.html"