#!/usr/bin/env node

// Searches
//
//	Dependency1: Node. Download from https://nodejs.org/en/download/
// Dependency2: This script requires the searches.json file.
// The JSON file is an array of objects describing search services.
//
// JSON OBJECT:
//    Name: String
//    Shortcut: String
//    Aliases: string or array of strings
//    Default: boolean (You can have multiple defaults)
//    URL: The url. The query is appended to the end of the url.
//    Group: A general group name. This can be used to activate several sites at once.
//
// Examples:
//    searches (m <search term for MDN>)
//    searches (js <search term for js group>)
//    searches (/r funny) // Funny Subreddit.
//    searches (ls) // list your services in terminal or browser
//
// Other Notes:
//    Works from command line too.
//
// Required parameters:
// @raycast.schemaVersion 1
// @raycast.title Searches
// @raycast.mode silent
//
// Optional parameters:
// @raycast.icon 🔎
// @raycast.author Jesse Traynham
// @raycast.packageName Searches
// @raycast.argument1 { "type": "text", "placeholder": "service query" }

const { exec } = require('child_process')
const fs = require('fs')
const services = require('./searches.json')

// NORMALIZE ARGV FOR BOTH RAYCAST AND COMMAND LINE
let argv = process.argv.slice(2).join(' ').split(' ')

// EXTRACT SERVICE NAME AND QUERY
let service = argv.shift()
let query = argv.join(' ')

// LIST SERVICES IF SHORTCUT IS "LS"
if(service === 'ls'){

	// IF COMMAND LINE
	if(process.env.XPC_SERVICE_NAME == 0){
		console.log(services)
		return
	}
	
	let rows = services.map(service => {
		return `<tr>
			 <td>${service.name}</td>
			 <td>${service.shortcut}</td>
			 <td>${service.aliases ? service.aliases : '' }</td>
			 <td>${service.url}</td>
		</tr>`
		}).join('')
	
	let data = `<table><tr><th>Name</th><th>Shortcut</th><th>Aliases</th><th>URL</th></tr>${rows}</table>`

	// WRITE FILE
	try {
		fs.writeFileSync(process.cwd() + '/searches.html', data)
		exec(`open searches.html`, (error, stdout, stderr) => {
			console.log(error)
		})
	} catch (err) {
		console.error(err)
	}
	
	return

} // IF "LS"

let result = []

// LOCATE SERVICE ITEM(S)
result = services.filter(
	item => item.shortcut === service ||              // SHORTCUT
	item.group === service ||                         // GROUP
	(item.aliases && item.aliases.includes(service))  // ALIASES
).map(
	service => `${service.url}${encodeURIComponent(query)}`.replace(/&/g, '\\&')
)

// IF NO RESULT, FIND DEFAULT(S)
if(!result.length){
	query = process.argv.slice(2).join(' ') // RESTORE FULL QUERY STRING
	result = services.filter(
		service => service.default).map(service => `${service.url}${encodeURIComponent(query)}`.replace(/&/g, '\\&')
	)
}

// OPEN ONE OR MORE URLS
if(result.length) {
	const open = exec(`open ${result.join(' ')}`, (error, stdout, stderr) => {
		//console.log(error)
		return true
	})
}