# Reader Submission Setup Guide

## The Problem
You're getting "Script function not found: doGet" because the script wasn't saved properly.

## Step-by-Step Fix:

### 1. Go Back to Your Apps Script
- Go back to your Google Sheet
- Click `Extensions` → `Apps Script`

### 2. Replace ALL Code
**Delete everything** in the editor and paste this **EXACT** code:

```javascript
function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSheet();
    const data = JSON.parse(e.postData.contents);
    
    // Add new row with the data
    sheet.appendRow([
      new Date().toLocaleString('en-IN', {timeZone: 'Asia/Kolkata'}),
      data.title || '',
      data.description || '', 
      data.reporterName || '',
      data.contact || '',
      data.driveLink || 'कोई अटैचमेंट नहीं',
      'नया सबमिशन'
    ]);
    
    return ContentService
      .createTextOutput(JSON.stringify({success: true, message: 'Data saved successfully'}))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({success: false, error: error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService
    .createTextOutput('Script is working! Ready to receive submissions.')
    .setMimeType(ContentService.MimeType.TEXT);
}

function testFunction() {
  return "Test successful!";
}
```

### 3. Save the Script
- **Press `Ctrl+S`** or click the **Save** icon
- **Wait for "Saved"** message to appear

### 4. Test the Functions
- In the function dropdown (next to run button), select `doGet`
- Click **Run** button
- Should say "Execution completed" (not "function not found")

### 5. Re-Deploy
- Click `Deploy` → `Manage Deployments`
- Click the **pencil icon** (edit) on your existing deployment
- Click **Deploy** again
- **Copy the NEW URL**

### 6. Test the URL
- Paste your new URL in browser
- Should show: "Script is working! Ready to receive submissions."
- If yes, you're ready!

### 7. Update Sanity
- Go to Sanity Studio
- Update the "Google Sheets URL" with your new working URL
- Toggle "Enable Submissions" to ON
- Publish

## Quick Test
After setup, test by submitting the form on your website. Check your Google Sheet - a new row should appear!

## Still Having Issues?
1. Make sure your Google Sheet has the headers in Row 1
2. Check that the script has permission to access the sheet
3. Try refreshing the Apps Script page and re-saving the code

The key is making sure the code is **SAVED** before deploying!
