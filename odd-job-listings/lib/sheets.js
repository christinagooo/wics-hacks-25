// lib/sheets.js
export async function getJobsFromGoogleSheet() {
    const spreadsheetId = process.env.GOOGLE_SHEET_ID;
    const apiKey = process.env.GOOGLE_SHEETS_API_KEY;
    const range = 'Sheet2!A1:D100'; 
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}?key=${apiKey}`;
  
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error('Failed to fetch jobs data from Google Sheets');
    }
    const data = await res.json();
  
    // The first row is assumed to be headers.
    const [headers, ...rows] = data.values;
    const jobs = rows.map((row) => {
      let job = {};
      headers.forEach((header, index) => {
        job[header.toLowerCase()] = row[index];
      });
      return job;
    });
  
    return jobs;
  }
  