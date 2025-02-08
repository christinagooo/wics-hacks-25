// app/api/accept-job/route.js
import { google } from 'googleapis';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { jobId } = await req.json();
    if (!jobId) {
      return NextResponse.json({ error: 'Missing jobId' }, { status: 400 });
    }

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

    // Retrieve the sheet’s data to determine which row to delete.
    const getRes = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: 'Sheet2!A:D',
    });
    const rows = getRes.data.values;
    if (!rows || rows.length === 0) {
      return NextResponse.json({ error: 'No data found' }, { status: 404 });
    }

    let rowIndex = -1;
    for (let i = 1; i < rows.length; i++) {
      const row = rows[i];
      if (row[0] === String(jobId)) {
        rowIndex = i;
        break;
      }
    }
    if (rowIndex === -1) {
      return NextResponse.json({ error: 'Job not found' }, { status: 404 });
    }

    const deleteRequest = {
      spreadsheetId,
      resource: {
        requests: [
          {
            deleteDimension: {
              range: {
                sheetId,
                dimension: 'ROWS',
                startIndex: rowIndex,
                endIndex: rowIndex + 1,
              },
            },
          },
        ],
      },
    };

    await sheets.spreadsheets.batchUpdate(deleteRequest);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error in /api/accept-job:', error);
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
  }
}
