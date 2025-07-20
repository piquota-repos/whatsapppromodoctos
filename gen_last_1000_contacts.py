import pandas as pd
import json

# Load your Excel file
df = pd.read_excel("WA Data.xlsx", sheet_name="Sheet1", dtype={"Mobile": str})

# Drop rows where Name or Mobile is missing
df = df.dropna(subset=["Mobile", "Name"])

# Clean mobile numbers
def clean_mobile(mobile):
    digits = ''.join(filter(str.isdigit, str(mobile)))
    return digits[-10:] if len(digits) >= 10 else None

df['CleanedMobile'] = df['Mobile'].apply(clean_mobile)

# Filter valid and unique numbers
valid_df = df[df['CleanedMobile'].notnull()].drop_duplicates(subset=["CleanedMobile"])

# Get last 1000 entries
contacts = [
    {
        "phone": f"91{row['CleanedMobile']}",
        "name": row['Name'].strip()
    }
    for _, row in valid_df.tail(1000).iterrows()
]

# Save to JSON
with open("wa_contacts_last_1000.json", "w") as f:
    json.dump(contacts, f, indent=2)

print("✅ Last 1000 valid contacts saved to wa_contacts_last_1000.json")
