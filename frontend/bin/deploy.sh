#!/bin/sh


aws s3 cp --recursive --acl public-read ./dist s3://$bucket/
