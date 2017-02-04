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


#### GET `/api/event`

**Function:** Read events from database.

**Response:** Matching events returned in JSON object:

`Status: 200 OK`
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

Default: If no parameters passed, API returns all events.

**Parameters:**

| Name        | Type         | Usage | Description  |
|:------------- |:-------------|:-----|:-----|
| `id` | string | Optional | ID # for event |
| `event_title` | string | Optional | Title of event |
| `category` | string | Optional | Event's category, only 1 category per event |
| `description` | string | Optional | Description of event. |
| `featured_flag` | boolean | Optional | Must be in 'true' or 'false' format. Whether the event is featured or not.|



#### POST `/api/event/create`

**Function:** Create new event.

**Response:** Successful creation returns `Status: 200 OK`

**Parameters:**

| Name        | Type         | Usage | Description  |
|:------------- |:-------------|:-----|:-----|
| `event_title` | string | **REQUIRED** | Title of event. |
| `category` | string | Optional | Event's category |
| `description` | string | Optional | Description of event. |
| `featured_flag` | boolean | Optional | Must be in 'true' or 'false' format. |
| `start_date` | string | Optional | Must be in YYYY-DD-MM format. Start date of event. |
| `description` | string | Optional | Must be in YYYY-DD-MM format. End date of event. |

#### POST `/api/event/update`

**Function:** Update existing event.

**Response:** Successful creation returns `Status: 200 OK`

**Parameters:**

| Name        | Type         | Description  |
|:------------- |:-------------|:-----|
| `event_title` | string | Required. Title of event. |
| `category` | string | Optional. Event's category |
| `description` | string | Optional. Description of event. |
| `featured_flag` | boolean | Optional. Must be in 'true' or 'false' format. |
| `start_date` | string | Optional. Must be in YYYY-DD-MM format. Start date of event. |
| `description` | string | Optional. Must be in YYYY-DD-MM format. End date of event. |
