#!/usr/bin/env osascript -l JavaScript

// Required parameters:
// @raycast.schemaVersion 1
// @raycast.title Merge Front Two Safari Window
// @raycast.mode silent
//
// Optional parameters:
// @raycast.packageName Browsing
// # @raycast.icon 🧭
//
// Documentation:
// @raycast.author Jesse Traynham
// @raycast.authorURL https://github.com/traynham
// @raycast.description Merge Front Two Safari Window

function run(argv){

	const Safari = Application('Safari')
	const window1 = Safari.windows[0]
	const window2 = Safari.windows[1]

	window1.tabs().forEach(tab => {
		window2.tabs.push(new Safari.Tab({url: tab.url()}))-1
	})

	Safari.windows[0].close()

}
