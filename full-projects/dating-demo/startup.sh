#!/bin/sh
# This script will start the application
docker exec -u postgres muzz_db_1 psql postgres postgres -f docker-entrypoint-initdb.d/schema.sql
