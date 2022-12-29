rm -rf deploy.zip
zip -r deploy.zip . -x  "/node_modules/*"  -x  "*.env" -x  "package-lock.json" 
eb use Backend-env
eb deploy --staged