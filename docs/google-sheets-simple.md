# Simple Google Sheets Setup for Reader Submissions

## Quick Setup (5 minutes)

### Step 1: Create Google Sheet
1. Create new Google Sheets document
2. Name it: "पल्टन न्यूज़ - Reader Submissions"
3. Add these headers in Row 1:
```
Timestamp | Title | Description | Reporter Name | Contact | Drive Link | Status
```

### Step 2: Apps Script
1. In your sheet: `Extensions` → `Apps Script`
2. Paste this code:

```javascript
function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSheet();
    const data = JSON.parse(e.postData.contents);
    
    sheet.appendRow([
      data.timestamp,
      data.title,
      data.description, 
      data.reporterName,
      data.contact,
      data.driveLink,
      data.status
    ]);
    
    return ContentService.createTextOutput('Success');
  } catch (error) {
    return ContentService.createTextOutput('Error: ' + error);
  }
}
```

### Step 3: Deploy
1. `Deploy` → `New Deployment`
2. Type: `Web app`
3. Execute as: `Me`
4. Access: `Anyone`
5. **Copy the Web App URL**

### Step 4: Add to Sanity
1. Go to Sanity Studio
2. Create `Reader Submission Settings`:
   - Active: ✅ Yes
   - Google Sheets URL: **Paste your Web App URL**
   - Notification Email: (optional)

## Done! 

Users can now:
1. Click "सबमिशन फॉर्म खोलें" 
2. Goes to `/submissions` page
3. Fill 4 simple fields
4. Confirm submission
5. Data appears in your Google Sheet

## Data Structure:
- **Timestamp**: When submitted
- **Title**: Story headline  
- **Description**: Full story content
- **Reporter Name**: Who submitted
- **Contact**: Email/phone
- **Drive Link**: Google Drive attachments
- **Status**: "नया सबमिशन"

Clean, simple, exactly what you wanted! 🎯
