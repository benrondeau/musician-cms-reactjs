# Musician CMS

A web app for tracking music events (concerts, festivals, etc.) using React, Node.js and MySQL database.

### Tech Specs
- Node.js server running express middleware
- MySQL for data storage
- React for rendering UI
- React Router for handling views
- Redux for state management
- Gulp->Browserify->Babel build system

### Form Features
- Simple form validation on front end, complete validation server side


### Scripts
- `npm run dev` = start development server, run gulp build and watch scripts
- `npm run build` = create build


### Directory Structure
```
- build (pacakaged files for production use
- gulp (dev & build scripts)
- src
    - app (react app files)
    - www (html & css files)
- server.js (Web & API server)
```


### Local Development

**Requirements:**

- Node.js and NPM

**Steps:**

1. Clone repo to your machine.
2. `cd` into root of repo, run `npm install`
3. Create `.env` file in root folder and define value for `CLEARDB_DATABASE_URL`, which just needs to be a valid `mysql://` connection to a MySQL database.
4. Run `npm run dev` for build scrips && `node server.js` for API sever. Open browser to `localhost:5000` for API calls to work.
5. Your database will be empty, so use the API or `/new` route to create some dummy events.

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

**Required Parameters:** None. If no parameters passed, API returns all events.

**Optional Parameters (query string form):**

| Name        | Type         | Usage | Description  |
|:------------- |:-------------|:-----|:-----|
| `id` | integer | Optional | ID # for event |
| `event_title` | string | Optional | Title of event |
| `category` | string | Optional | Event's category, only 1 category per event |
| `featured_flag` | intege | Optional | Must be '0' (false) or '1' (true). Whether the event is featured or not.|



#### POST `/api/event`

**Function:** Create new event.

**Response:** Successful creation returns `Status: 200 OK`

**Required Parameters:** `event_title`, passed as `string`

**Optional Parameters (query string form):**

| Name        | Type         | Description  |
|:------------- |:-------------|:-----|
| `description` | string | Description of event. |
| `category` | string | Event's category |
| `featured_flag` | integer | Must be '0' (false) or '1' (true). |
| `start_date` | integer | Must be in [ISO8601](http://www.iso.org/iso/iso8601) format. Start date of event. |
| `end_date` | integer | Must be in [ISO8601](http://www.iso.org/iso/iso8601) format. End date of event. |

#### PUT `/api/event/:id`

**Function:** Update existing event.

**Response:** Successful creation returns `Status: 200 OK`

**Required Parameters:** `id` (integer) & `event_title` (string).

**Optional Parameters (query string form):**

| Name        | Type         | Description  |
|:------------- |:-------------|:-----|
| `description` | string | Description of event. |
| `category` | string | Event's category |
| `featured_flag` | integer | Must be '0' (false) or '1' (true). |
| `start_date` | integer | Must be in [ISO8601](http://www.iso.org/iso/iso8601) format. Start date of event. |
| `end_date` | integer | Must be in [ISO8601](http://www.iso.org/iso/iso8601) format. End date of event. |

#### DELETE `/api/event/:id`

**Function:** Delete existing event.

**Response:** Successful deletion returns `Status: 200 OK`

**Required Parameters (query string form):** `id`, passed as integer

Any other parameters passed are ignored.

