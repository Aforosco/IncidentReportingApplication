#!/bin/bash
set -e

echo "Waiting for PostgreSQL to be ready..."
until dotnet ef database update --no-build; do
  echo "Database not ready yet, waiting..."
  sleep 2
done

echo "Running migrations..."
dotnet ef database update --no-build

echo "Starting application..."
exec dotnet IncidentReportingApplication.dll