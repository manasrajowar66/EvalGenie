#!/usr/bin/env bash

# === Database Details ===
export PGPASSWORD='ADMIN'  # or source from .env
DBNAME="eval-genie"
IP="localhost"
USER="postgres"

# === Paths ===
SQL_FILE_DIR="sql-scripts"
EXECUTION_FILE="$SQL_FILE_DIR/execution.txt"

run_sql_files() {
  local directory=$1
  local file_list=$2
  for OUTPUT in $(gawk '{print $1}' "$file_list"); 
  do
    if [ -e "$directory/$OUTPUT" ]; then
      echo "✅ Running SQL file -> $OUTPUT"
      psql -h $IP -p 5433 -d $DBNAME -U $USER -f "$directory/$OUTPUT"
    else
      echo "❌ File not found -> $directory/$OUTPUT"
    fi
  done
}

# === Run SQL Scripts ===
run_sql_files "$SQL_FILE_DIR" "$EXECUTION_FILE"

# === Run Function Scripts ===
# psql -h $IP -d $DBNAME -U $USER -f dhanuka_functions_only.sql
# psql -h $IP -d $DBNAME -U $USER -f flm_functions_only.sql
# psql -h $IP -d $DBNAME -U $USER -f bd_functions_only.sql
