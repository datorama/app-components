#!/bin/bash

git fetch

LAST_COMMIT=$(git log | sed -n 1p)
LAST_COMMIT=${LAST_COMMIT#*commit }

echo "Last commit:" $LAST_COMMIT

VERSION="v"$(npx -c 'echo "$npm_package_version"')
TAG_VERSION=$(git tag -l --contains $LAST_COMMIT | cat | tail -1)

echo "Tag version:" $TAG_VERSION
echo "Package version:" $VERSION

if [[ $VERSION == $TAG_VERSION ]]; then
    echo "SUCCESS"
    exit 0
elif [[ $TAG_VERSION == "" ]]; then
    echo "ERROR: PR has no tag"
    exit 1
else
    echo "ERROR: PR tag does not equal to current package version"
    exit 1
fi
