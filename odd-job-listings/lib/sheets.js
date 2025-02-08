// lib/sheets.js
export async function getJobsFromGoogleSheet() {
    const spreadsheetId = "1KvbZ7lOh88dJ0MAF96izUOyZKuHH_oWDpKWQZsYebNI";
    const apiKey = "AIzaSyD5m8SkmN9xNh8mGNvM4gRlWqQPxqXKRB4";
    const range = 'Sheet1!A1:D100'; // Adjust this range to match your sheet
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
  