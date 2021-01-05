#!/usr/bin/env osascript -l JavaScript

// Required parameters:
// @raycast.schemaVersion 1
// @raycast.title Safari › Peel Tabs
// @raycast.mode silent
//
// Optional parameters:
// @raycast.packageName Browsing
// @raycast.icon 🧭
// @raycast.argument1 { "type": "text", "placeholder": "number of tabs", "optional": true}
//
// Documentation:
// @raycast.author Jesse Traynham
// @raycast.authorURL https://github.com/traynham
// @raycast.description Peel off some tabs from Safair Window. Default 5 tabs.

function run(argv){

	const Safari = Application('Safari')
	const numOfTabs = argv[0] || 5

	if(Safari.windows[0].tabs().length <= numOfTabs){
		console.log('Not enough tabs to peel.')
		return
	}
	
	Safari.Document().make()

	const Tabs1 = Safari.windows[1].tabs()
	const Tabs2 = Safari.windows[0].tabs

	for (let i = Tabs1.length; i > (Tabs1.length - numOfTabs); i--) {
		Tabs2.unshift(new Safari.Tab({url: Tabs1[i - 1].url()}))
		Tabs1[i - 1].close()
	}
	
	Tabs2()[numOfTabs].close()

}