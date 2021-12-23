#! /bin/bash

mongoimport --host mongo-db --db test --collection users --type json --file /mongo-seed/Users.json --jsonArray
mongoimport --host mongo-db --db test --collection movements --type json --file /mongo-seed/movements.json --jsonArray
mongoimport --host mongo-db --db test --collection bonos --type json --file /mongo-seed/bonos.json --jsonArray