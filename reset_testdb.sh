#!/bin/bash
# Reset the local meteor db with the test-db
echo "Start restoring local db"
cd mongo_test_db
mongorestore --host localhost:3001 --db meteor  --verbose neptun_sunhill
echo "Launched..."
