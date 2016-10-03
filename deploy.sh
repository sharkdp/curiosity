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

    if [[ -e "$levelDir/post-deploy.sh" ]]; then
        pushd "$levelDir" > /dev/null
        bash post-deploy.sh
        rm post-deploy.sh
        popd > /dev/null
    fi
done
