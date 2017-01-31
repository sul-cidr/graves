# The Chinese Graves Project

[![](https://api.travis-ci.org/sul-cidr/graves.svg)](https://travis-ci.org/sul-cidr/graves)

> The Chinese Graves Project is a digital humanities initiative based at Stanford that will build and harness an interactive spatial and textual analysis platform to examine the phenomenon of grave relocation in modern China, a campaign that has led to the exhumation and reburial of 10 million corpses in the past decade alone, and has transformed China’s graveyards into sites of acute personal, social, political, and economic contestation.

&mdash; Tom Mullaney, "[Introducing the Chinese Graves Project: A New Digital Humanities Initiative at Stanford University](http://tsmullaney.com/?p=412)"

## Install for Development
Clone the repository and run `bundle`.

Install and postGIS 
`brew install postgresql`
`brew install postgis` (on Mac)

run postgreSQL at port 5432

Initialise the graves databases with correct environment:
`buundle exec rake db:setup`
`bin/rake db:migrate RAILS_ENV=development`

You may need to clone the private graves-data repository and symlink it. You may need to use git-lfs to obtain the large binaries.
`brew install git-lfs`

From inside the graves-data repository, perform `git-lfs pull`. Then, from inside graves itself, simlink out with the equivalent of `ln -s ../graves-data data`, assuming graves-data is cloned into the same parent directory as graves.

With the new data, re-run the database migrations under the test environment to generate fixtures:
`buundle exec rake db:setup`
`bin/rake db:migrate RAILS_ENV=test`

Run the tests once to complete the generation:
`bundle exec rake`

Now, run `npm install` to build javascript and CSS bundles (npm install triggers a post-install call to grunt).

`rails s` will now allow you to test the application.

You will notice that there is no data. To populate the application, manually restore the backup data into the postgres database by running:
`psql -d graves_development < graves-2-28-16.sql` inside `graves-data/backups` (in the graves-data repository). This will fully populate the database.
