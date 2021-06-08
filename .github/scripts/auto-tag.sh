#!/bin/bash

git fetch

LAST_COMMIT=$(git log | sed -n 1p)
LAST_COMMIT=${LAST_COMMIT#*commit }

echo "Last commit:" $LAST_COMMIT

VERSION="v"$(npx -c 'echo "$npm_package_version"')
TAG_VERSION=$(git tag -l --contains $LAST_COMMIT | cat | tail -1)

echo "Package version:" $VERSION

if [[ $VERSION == $TAG_VERSION ]]; then
    git push origin $VERSION;
else
    git tag -a $VERSION
    git push origin $VERSION
fi

exit 0
