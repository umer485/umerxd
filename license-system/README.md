# Blogger Theme License System

The Blogger theme loads `license.js` from jsDelivr. The script fetches `licenses.json` from this same GitHub folder.

## Current JSON format

```json
{
  "name": "Ali",
  "expiry_date": "2027-02-03"
}
```

- `name`: must match the customer name configured in the Blogger theme.
- `expiry_date`: date format `YYYY-MM-DD`.
- The expiry date is treated as the final valid day. The license expires after that day in Pakistan time.

## CDN files

- Script: https://cdn.jsdelivr.net/gh/umer485/umerxd@main/license-system/license.js
- JSON: https://cdn.jsdelivr.net/gh/umer485/umerxd@main/license-system/licenses.json

## Important limitation

This is a basic browser-side check, not tamper-proof DRM. The JSON is public and browser JavaScript can be inspected or bypassed. Do not put secrets or passwords in this JSON file.
