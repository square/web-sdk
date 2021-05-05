#! /bin/bash

set -eux

# get your local up to date
git fetch origin
# switch to default distribution branch
git checkout main
# create a merge commit from the pre-release branch
git merge --no-ff --no-edit beta
# push to github
git push origin main
# go back to beta for your next PR ;)
git checkout beta
