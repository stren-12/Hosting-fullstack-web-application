rm -rf deploy.zip
zip -r deploy.zip . -x  "/node_modules/*"  -x  "*.env" -x  "package-lock.json"
eb setenv AWS_ACCESS_KEY_ID=$AWS_ACCESS_KEY_ID AWS_DEFAULT_REGION=$AWS_DEFAULT_REGION AWS_SECRET_ACCESS_KEY=$AWS_SECRET_ACCESS_KEY PGDATABASE=$PGDATABASE PGHOST=$PGHOST PGPASSWORD=$PGPASSWORD PGUSER=$PGUSER SALT=$SALT TOKEN_SECRET=$TOKEN_SECRET bucket=$bucket