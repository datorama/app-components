#!/bin/bash

git fetch

LAST_COMMIT=$(git log | sed -n 1p)
LAST_COMMIT=${LAST_COMMIT#*commit }

echo "Last commit:" $LAST_COMMIT

VERSION="v"$(npx -c 'echo "$npm_package_version"')

echo "Package version:" $VERSION

git tag -a $VERSION

git push origin $VERSION
