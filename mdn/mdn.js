#!/usr/bin/env node

// Dependency: This script requires Nodejs.
// Install Node: https://nodejs.org/en/download/
//
// Required parameters:
// @raycast.schemaVersion 1
// @raycast.title Search in MDN (Mozilla) Docs by Topic
// @raycast.mode silent
//
// Optional parameters:
// @raycast.packageName Web Searches
// @raycast.icon images/mdn_light.png
// @raycast.iconDark images/mdn_dark.png
// @raycast.argument1 { "type": "text", "placeholder": "js, css, html", "optional": true}
// @raycast.argument2 { "type": "text", "placeholder": "query" }
//
// Documentation:
// @raycast.author Jesse Traynham
// @raycast.authorURL https://github.com/traynham
// @raycast.description Search in MDN (Mozilla) Docs by topic

const { exec } = require('child_process')
let [topic, query] = process.argv.slice(2)

exec(`open "https://developer.mozilla.org/en-US/search?topic=${topic}&q=${encodeURIComponent(query)}"`)
