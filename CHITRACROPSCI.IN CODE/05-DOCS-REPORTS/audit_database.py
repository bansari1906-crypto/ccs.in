
import sqlite3
import json
from pathlib import Path

def get_db_path(identifier):
    if identifier == "fullstack":
        return r"c:\Users\bansa\Downloads\chitracropscience.in\chitra-crop-sciencegitback\chitra-crop-science-main\chitra-crop-nexus-main\django_backend\db.sqlite3"
    elif identifier == "standalone":
        return r"c:\Users\bansa\Downloads\chitracropscience.in\chitra-backend-maingitback\chitra-backend-main\db.sqlite3"

def query_database(db_path, query):
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    cursor.execute(query)
    results = cursor.fetchall()
    conn.close()
    return results

def get_table_info(db_path, table_name):
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    cursor.execute(f"PRAGMA table_info({table_name})")
    columns = [row[1] for row in cursor.fetchall()]
    conn.close()
    return columns

def main():
    # List of database identifiers
    dbs = ["fullstack", "standalone"]
    
    for db_id in dbs:
        db_path = get_db_path(db_id)
        print(f"\n--- DATABASE: {db_id} ---")
        
        # Get list of all tables in the database
        conn = sqlite3.connect(db_path)
        cursor = conn.cursor()
        cursor.execute("SELECT name FROM sqlite_master WHERE type='table';")
        tables = [row[0] for row in cursor.fetchall()]
        conn.close()
        
        for table in tables:
            print(f"\nTable: {table}")
            # Get count
            count = query_database(db_path, f"SELECT COUNT(*) FROM {table}")[0][0]
            print(f"Count: {count}")
            
            # Get sample data or all names/titles
            columns = get_table_info(db_path, table)
            print(f"Columns: {', '.join(columns)}")
            
            # Try to find name/title columns
            name_col = None
            for col in ["name", "title", "slug"]:
                if col in columns:
                    name_col = col
                    break
            
            if name_col and count > 0:
                print("\nSample names/titles:")
                rows = query_database(db_path, f"SELECT {name_col} FROM {table}")
                for row in rows[:20]:  # Show first 20
                    print(f"  - {row[0]}")

if __name__ == "__main__":
    main()

