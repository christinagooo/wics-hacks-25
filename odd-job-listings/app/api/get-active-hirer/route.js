/**
 * This is for getting all the jobs that the hirer has booked (sheet 3)
 * All jobs for which USERNAME is the hirer 
 */

// app/api/accept-job/route.js

import { google } from 'googleapis';
import { NextResponse } from 'next/server';

export async function GET(req) {
  try {
    // console.log("in the get request")
    // Parse the search params 
    const { searchParams } = new URL(req.url);
    const username = searchParams.get("username"); // ✅ Get username from query params
    if (!username) {
      return NextResponse.json({ error: 'Missing username' }, { status: 400 });
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
    const spreadsheetId = process.env.GOOGLE_SHEET_ID;

    // Retrieve spreadsheet metadata to get the correct sheetIds for "Sheet2" and "Sheet3"
    const meta = await sheets.spreadsheets.get({ spreadsheetId });

    // Get currently-being-worked-on jobs sheet (Sheet3)
    const sheet3Info = meta.data.sheets.find(
      (sheet) => sheet.properties.title === "Sheet3"
    );
    if (!sheet3Info) {
      return NextResponse.json({ error: 'Sheet3 not found' }, { status: 404 });
    }
    // Note: We don't necessarily need sheet3's numeric ID for appending.

    // Retrieve Sheet3's data
    const getRes = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: 'Sheet3!A:G', // Adjust the range if necessary.
    });
    
    const rows = getRes.data.values;
    if (!rows || rows.length === 0) {
      return NextResponse.json({ error: 'No data found in Sheet3' }, { status: 404 });
    }
    console.log("rows", rows)

    // Get header row and find USERNAME column index
    const headers = rows[0];
    const hirerIndex = headers.indexOf("hirer"); // 🔹 Adjust if needed

    if (hirerIndex === -1) {
      return Response.json({ error: "hirer column not found" }, { status: 400 });
    }

    // Filter rows where username matches
    const filteredRows = rows.slice(1).filter((row) => row[hirerIndex] === username);

    // Convert to objects
    const result = filteredRows.map((row) => {
      let obj = {};
      headers.forEach((key, index) => {
        obj[key] = row[index] || ""; // Default to empty string if missing
      });
      return obj;
    });

    return Response.json(result, { status: 200 });

  } catch (error) {
    console.error('Error in /api/get-active-hirer:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}


