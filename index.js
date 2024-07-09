const express = require("express");
const bodyParser = require('body-parser'); 
const { google } = require("googleapis");
const path = require('path');

const app = express();


app.use(express.static(path.join(__dirname, 'views')));
app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.json()); 

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});


app.post("/", async (req, res) => {
    const { firstName, lastName, phone, email, jobType, jobSource, jobDescr, address, city, state, zipCode, area, startDate, startTime, endTime, test } = req.body;
    console.log("Received form data:", req.body);
    const auth = new google.auth.GoogleAuth({
        keyFile: "config.json",
        scopes: "https://www.googleapis.com/auth/spreadsheets"
    });

    try {
        const client = await auth.getClient();
        const googlesheets = google.sheets({ version: "v4", auth: client });
        const spreadsheetId = "1o_1CqBfl3YsHQjrKE4-_JFJHIx6SVmmLRoUZxTDqWa0";

        // Write rows to spreadsheet
        await googlesheets.spreadsheets.values.append({
            auth,
            spreadsheetId,
            range: "Data",
            valueInputOption: "RAW",
            resource: {
                values: [
                    [`${firstName} ${lastName}`, phone, email, jobType, jobSource, jobDescr, address, city, state, zipCode, area, startDate, startTime, endTime, test]
                ]
            }
        });

        res.send("Submitted to Google Sheets");
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Error submitting data to Google Sheets");
    }
});

const PORT = process.env.PORT || 2004;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));