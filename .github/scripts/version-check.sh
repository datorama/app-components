#!/bin/bash

# https://stackoverflow.com/a/29394504/5072717
function version { echo "$@" | awk -F. '{ printf("%d%03d%03d%03d\n", $1,$2,$3,$4); }'; }

VERSION=$(npx -c 'echo "$npm_package_version"')

git fetch
git checkout master
git pull

LAST_VERSION=$(npx -c 'echo "$npm_package_version"')

if [[ $(version $VERSION) > $(version $LAST_VERSION) ]]; then
    echo "SUCCESS: Version check is successful"
    exit 0
elif [[ $(version $VERSION) == $(version $LAST_VERSION) ]]; then
    echo "ERROR: App version same as latest version in master branch. Please update the version in package.json"
    exit 1
elif [[ $(version $VERSION) < $(version $LAST_VERSION) ]]; then
    echo "ERROR: Updated app version lower than latest version in master branch. Please update the version in package.json"
    exit 1
fi
