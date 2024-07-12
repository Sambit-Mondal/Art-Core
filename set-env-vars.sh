#!/bin/bash

# Load .env file
export $(grep -v '^#' .env | xargs)

# Add each environment variable to Vercel
for var in $(grep -v '^#' .env | cut -d= -f1); do
  vercel env add $var development <<< $(printenv $var)
  vercel env add $var preview <<< $(printenv $var)
  vercel env add $var production <<< $(printenv $var)
done