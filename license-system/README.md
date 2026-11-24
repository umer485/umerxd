# Blogger Theme License System

Yeh basic client-side license checker hai.

## Files
- `licenses.json`: customer ka name, license status aur end date.
- `license.js`: JSON read karke license check karta hai.

## Customer record
```json
{
  "name": "Customer Name",
  "license": "yes",
  "end_date": "2027-01-24"
}
```

- `license`: sirf `yes` ya `no`
- `end_date`: `YYYY-MM-DD` format
- End date ko last valid day maana gaya hai; Pakistan time ke mutabiq aglay din se license expired hoga.

## Blogger loader example
Repository ki public CDN URL use karte hue Blogger theme mein yeh structure add karein (customer name replace karein):

```html
<div id="ufxd-license-root" data-customer="Customer Name"></div>
<script src="https://cdn.jsdelivr.net/gh/umer485/umerxd@main/license-system/license.js"></script>
```

## Important limitation
Yeh browser-side check hai. JSON public hai aur JavaScript user ke browser mein execute hoti hai, is liye technically skilled user check ko bypass ya files copy kar sakta hai. Isay strong DRM/security na samjhein. Public JSON mein private data ya passwords kabhi na rakhein.
