import pandas as pd
import json

# Load Excel file (force Mobile as string)
df = pd.read_excel("WA Data.xlsx", sheet_name="Sheet1", dtype={"Mobile": str})
print("Columns:", df.columns.tolist())

# Drop rows with missing required fields
initial_rows = len(df)
df = df.dropna(subset=["Mobile", "Name"])

# Clean mobile number
def clean_mobile(mobile):
    digits = ''.join(filter(str.isdigit, str(mobile)))
    return digits[-10:] if len(digits) >= 10 else None

df['CleanedMobile'] = df['Mobile'].apply(clean_mobile)

# Split valid and invalid rows
valid_df = df[df['CleanedMobile'].notnull()].drop_duplicates(subset=["CleanedMobile"])
invalid_df = df[df['CleanedMobile'].isnull()]

# ✅ Prepare valid contact list
contacts = [
    {
        "phone": f"91{row['CleanedMobile']}",
        "name": row['Name'].strip()
    }
    for _, row in valid_df.iterrows()
]

# Save valid contacts
with open("wa_contacts.json", "w") as f:
    json.dump(contacts, f, indent=2)
print(f"✅ Saved {len(contacts)} valid contacts to wa_contacts.json")

# ❌ Save invalid data (optional fields: name, original mobile)
invalid_entries = [
    {
        "name": row['Name'].strip(),
        "original_mobile": row['Mobile']
    }
    for _, row in invalid_df.iterrows()
]

with open("wa_invalid_contacts.json", "w") as f:
    json.dump(invalid_entries, f, indent=2)
print(f"⚠️ Saved {len(invalid_entries)} invalid contacts to wa_invalid_contacts.json")
