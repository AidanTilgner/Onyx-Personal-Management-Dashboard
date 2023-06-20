#!/bin/bash

file=".api-keys.json"

if [ ! -f "$file" ]; then
  echo "{}" > "$file"
  echo "Created a new $file file with initial content."
else
  echo "$file already exists."
fi
