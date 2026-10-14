
import sqlite3
import csv
import os
from pathlib import Path

BASE_DIR = Path(r"c:\Users\bansa\Downloads\chitracropscience.in")

# Define database paths
DB_PATHS = {
    "fullstack": BASE_DIR / "chitra-crop-sciencegitback" / "chitra-crop-science-main" / "chitra-crop-nexus-main" / "django_backend" / "db.sqlite3",
    "standalone": BASE_DIR / "chitra-backend-maingitback" / "chitra-backend-main" / "db.sqlite3"
}

# Output directory
OUTPUT_DIR = BASE_DIR / "audit_output"
OUTPUT_DIR.mkdir(exist_ok=True)

def get_db_connection(db_path):
    return sqlite3.connect(db_path)

def export_table_to_csv(db_name, table_name, columns=None):
    db_path = DB_PATHS[db_name]
    conn = get_db_connection(db_path)
    cursor = conn.cursor()
    
    # Get table columns if not specified
    if not columns:
        cursor.execute(f"PRAGMA table_info({table_name})")
        columns = [row[1] for row in cursor.fetchall()]
    
    # Fetch all rows
    cursor.execute(f"SELECT {', '.join(columns)} FROM {table_name}")
    rows = cursor.fetchall()
    conn.close()
    
    # Write to CSV
    csv_path = OUTPUT_DIR / f"{db_name}_{table_name}.csv"
    with open(csv_path, "w", newline="", encoding="utf-8") as f:
        writer = csv.writer(f)
        writer.writerow(columns)
        writer.writerows(rows)
    
    return csv_path, rows

def get_count(db_name, table_name):
    db_path = DB_PATHS[db_name]
    conn = get_db_connection(db_path)
    cursor = conn.cursor()
    cursor.execute(f"SELECT COUNT(*) FROM {table_name}")
    count = cursor.fetchone()[0]
    conn.close()
    return count

def main():
    print("=== CHITRA CROP SCIENCE DATABASE AUDIT ===")
    
    for db_name in DB_PATHS.keys():
        db_path = DB_PATHS[db_name]
        print(f"\n--- Database: {db_name} ---")
        print(f"  Path: {db_path}")
        
        # Get list of tables
        conn = get_db_connection(db_path)
        cursor = conn.cursor()
        cursor.execute("SELECT name FROM sqlite_master WHERE type='table' ORDER BY name;")
        tables = [row[0] for row in cursor.fetchall()]
        conn.close()
        
        print(f"  Tables found: {', '.join(tables)}")
        
        # Export common tables we care about
        tables_to_export = [
            "products_product", "products_category", 
            "blog_blogpost", "gallery_galleryitem", 
            "testimonials_testimonial", "leads_lead",
            "customers_customer"
        ]
        
        for table in tables_to_export:
            if table in tables:
                count = get_count(db_name, table)
                print(f"  - {table}: {count} records")
                csv_path, rows = export_table_to_csv(db_name, table)
                print(f"    Exported to: {csv_path}")
                
                # Also create a simple text list of names/titles
                txt_path = OUTPUT_DIR / f"{db_name}_{table}_list.txt"
                with open(txt_path, "w", encoding="utf-8") as f:
                    for row in rows:
                        # Try to find a name/title field
                        value = None
                        for idx, val in enumerate(row):
                            if isinstance(val, str) and len(val) > 0:
                                value = val
                                break
                        if value:
                            f.write(f"{value}\n")
                print(f"    List exported to: {txt_path}")
    
    print("\n=== EXPORT COMPLETE ===")

if __name__ == "__main__":
    main()

