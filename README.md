# Musician CMS

A web app for tracking music events (concerts, festivals, etc.) using React, Node.js and MySQL database.

### Local Development

**Requirements:**

- Node.js and NPM

**Steps:**

1. Clone repo to your machine.
2. `cd` into root of repo, run `npm install`
3. Create `.env` file in root folder and define value for `CLEARDB_DATABASE_URL`.
4. Run `npm start` to boot up server. View server console output for any errors.

To run tests: `npm test`

### API Documentation
This API only accepts parameters in the HTTP query string format. Example: `?name=bonaroo&category=festival`

Responses will be sent in the JSON format:

```json
[
     {
         "id": 12,
         "event_title": "SXSW",
         "start_date": "2017-03-13T05:00:00.000Z",
         "end_date": "2017-03-19T05:00:00.000Z",
         "category": "festival",
         "description": "The SXSW Music Festival is one of the largest and most influential global music industry events of the year, taking place every March in Austin, Texas – the Live Music Capital of the World.",
         "featured_flag": 0,
         "created_at": "2017-01-01T06:00:00.000Z",
         "updated_at": "2017-01-05T06:00:00.000Z"
     }
 ]
 ```

**GET `/api/event` Params:**

| Name        | Type         | Description  |
|:------------- |:-------------|:-----|
| `id` | string | Returns event matching id # |
| `event_title` | string | Returns events matching to string |
| `start_date` | string | Must be in YYYY-MM-DD format. Returns events matching to string |
| `end_date` | string | Must be in YYYY-MM-DD format. Returns events matching to string |
| `category` | string | Returns events with matching category |
| `description` | string | returns events matching to string |
| `featured_flag` | boolean | Must be in 'true' or 'false' format. Returns featured events |
