// lib/sheets.js
export async function getJobsFromGoogleSheet() {
  const spreadsheetId = process.env.NEXT_PUBLIC_GOOGLE_SHEET_ID;
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_SHEETS_API_KEY;
  const range = 'Sheet2!A1:H100'; 
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}?key=${apiKey}`;

  console.log("Fetching Google Sheet data from URL:", url);

  const res = await fetch(url, { cache: 'no-store' });
  if (!res.ok) {
    throw new Error('Failed to fetch jobs data from Google Sheets');
  }
  const data = await res.json();

  if (!data.values || data.values.length === 0) {
    return [];
  }

  // The first row is assumed to be headers.
  const [headers, ...rows] = data.values;
  if (!headers || headers.length === 0) {
    return [];
  }

  const jobs = rows.map((row) => {
    let job = {};
    headers.forEach((header, index) => {
      job[header.toLowerCase()] = row[index];
    });
    return job;
  });
  
  return jobs;
}
