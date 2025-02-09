// app/api/accept-job/route.js
import { google } from 'googleapis';
import { NextResponse } from 'next/server';

export async function POST(req) {
  console.log("add-job POST request received");
  const { jobId, title, reward, description, imageUrl } = await req.json();

  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.SERVICE_ACCOUNT_EMAIL,
        private_key: process.env.SERVICE_ACCOUNT_PRIVATE_KEY.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });
    const spreadsheetId = process.env.GOOGLE_SHEET_ID;

    // Retrieve spreadsheet metadata to get the correct sheetId for "Sheet2"
    // ASSUMES SHEET2 CONTAINS ALL ACTIVE JOBS
    const meta = await sheets.spreadsheets.get({ spreadsheetId });
    const sheetInfo = meta.data.sheets.find(
      (sheet) => sheet.properties.title === "Sheet2"
    );
    if (!sheetInfo) {
      return NextResponse.json({ error: 'Sheet2 not found' }, { status: 404 });
    }
    const sheetId = sheetInfo.properties.sheetId;


    // const sheets = google.sheets({ version: "v4", auth });
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: `Sheet2!A:E`, // Columns A-E
      valueInputOption: "RAW",
      requestBody: {
        values: [[jobId, title, reward, description, imageUrl]], // New row data
      },
    });
    return Response.json({ message: "Row added successfully!" }, { status: 201 });
  } catch (error) {
    console.error("Error adding row to Google Sheets:", error);
    return Response.json({ error: "Failed to add row" }, { status: 500 });
  }

}