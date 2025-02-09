// app/api/accept-job/route.js

import { google } from 'googleapis';
import { NextResponse } from 'next/server';
import { USERNAME } from '@/data/user'; // Adjust the path if necessary

export async function POST(req) {
  try {
    // Parse the JSON body
    const { jobId } = await req.json();
    if (!jobId) {
      return NextResponse.json({ error: 'Missing jobId' }, { status: 400 });
    }

    // Authenticate using a service account with credentials from environment variables.
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.SERVICE_ACCOUNT_EMAIL,
        private_key: process.env.SERVICE_ACCOUNT_PRIVATE_KEY.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });
    const spreadsheetId = process.env.NEXT_PUBLIC_GOOGLE_SHEET_ID;

    // Retrieve spreadsheet metadata to get the correct sheetIds for "Sheet2" and "Sheet3"
    const meta = await sheets.spreadsheets.get({ spreadsheetId });
    
    // Get active jobs sheet (Sheet2)
    const sheet2Info = meta.data.sheets.find(
      (sheet) => sheet.properties.title === "Sheet2"
    );
    if (!sheet2Info) {
      return NextResponse.json({ error: 'Sheet2 not found' }, { status: 404 });
    }
    const sheet2Id = sheet2Info.properties.sheetId;

    // Get inactive jobs sheet (Sheet3)
    const sheet3Info = meta.data.sheets.find(
      (sheet) => sheet.properties.title === "Sheet3"
    );
    if (!sheet3Info) {
      return NextResponse.json({ error: 'Sheet3 not found' }, { status: 404 });
    }
    // Note: We don't necessarily need sheet3's numeric ID for appending.

    // Retrieve Sheet2's data to determine which row to move.
    const getRes = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: 'Sheet2!A:H', // Adjust the range if necessary.
    });
    const rows = getRes.data.values;
    if (!rows || rows.length === 0) {
      return NextResponse.json({ error: 'No data found in Sheet2' }, { status: 404 });
    }

    // Assume the first row is the header.
    let rowIndex = -1;
    let rowData = null;
    for (let i = 1; i < rows.length; i++) {
      const row = rows[i];
      // Assuming job id is in the first column.
      if (row[0] === String(jobId)) {
        rowIndex = i;
        rowData = row;
        break;
      }
    }
    if (rowIndex === -1 || !rowData) {
      return NextResponse.json({ error: 'Job not found in Sheet2' }, { status: 404 });
    }

    // Append the found row data to Sheet3.
    // Since Sheet3 has an extra column ("hiree"), append USERNAME to the row.
    const newRowData = [...rowData, USERNAME];

    // Update the range to include the extra column (e.g., columns A to I)
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: 'Sheet3!A:I',
      valueInputOption: 'USER_ENTERED', // or "RAW" if preferred
      requestBody: {
        values: [newRowData],
      },
    });

    // Now delete the row from Sheet2.
    // Google Sheets API uses 0-based indexing, and the header is row 0.
    // The data rows start at index 1.
    const deleteRequest = {
      spreadsheetId,
      resource: {
        requests: [
          {
            deleteDimension: {
              range: {
                sheetId: sheet2Id,
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
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
