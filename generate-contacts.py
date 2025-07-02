import pandas as pd
import json

# Load Excel file (force Mobile as string)
df = pd.read_excel("WA Data.xlsx", sheet_name="Sheet1", dtype={"Mobile": str})

print("Columns:", df.columns.tolist())

# Drop rows with missing mobile or name
df = df.dropna(subset=["Mobile", "Name"])

# Clean mobile number: strip non-digits, extract last 10 digits
def clean_mobile(mobile):
    digits = ''.join(filter(str.isdigit, str(mobile)))
    return digits[-10:] if len(digits) >= 10 else None

df['CleanedMobile'] = df['Mobile'].apply(clean_mobile)
df = df[df['CleanedMobile'].notnull()]

# Remove duplicates (optional)
df = df.drop_duplicates(subset=["CleanedMobile"])

# Prepare contact list
contacts = [
    {
        "phone": f"91{row['CleanedMobile']}",
        "name": row['Name'].strip()
    }
    for _, row in df.iterrows()
]

# Save to JSON
with open("wa_contacts.json", "w") as f:
    json.dump(contacts, f, indent=2)

print(f"✅ Saved {len(contacts)} contacts to wa_contacts.json")
