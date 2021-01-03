#!/usr/bin/env osascript -l JavaScript

// Required parameters:
// @raycast.schemaVersion 1
// @raycast.title Safari › Split Window
// @raycast.mode silent
//
// Optional parameters:
// @raycast.packageName Browsing
// @raycast.icon 🧭
// @raycast.argument1 { "type": "text", "placeholder": "title", "optional": true, "percentEncoded": true}
//
// Documentation:
// @raycast.author Jesse Traynham
// @raycast.authorURL https://github.com/traynham
// @raycast.description Split Safari tabs into new windows by groups of five.

function run(argv){

	const title = argv[0] || 'Split Safari Windows'
	const Safari = Application('Safari')
	const window1 = Safari.windows[0]
	const Tabs = Safari.windows[0].tabs() // JXA
	const tabs = [] // JS

	var docCount = 0
	
	// BUILD BETTER JS ARRAY OF OBJECTS.
	for (let i = 0; i < Tabs.length; i++) {
		tabs.push({name: Tabs[i].name(), url: Tabs[i].url()})
	}
	
	tabs.forEach((tab, i) => {

		if(i % 5 === 0){
			docCount = docCount + 1
			Safari.Document().make()

			let list = tabs.slice(i,i + 5).map(tab => `<li><a href="${tab.url}">${encodeURI(tab.name)}</a></li>`).join('')
			let pageTitle = `${title} ${docCount}`

			Safari.windows[0].currentTab.url = `data:text/html,<title>${pageTitle}</title><h1>${pageTitle}</h1><hr><ul>${list}</ul>`

		}

		Safari.windows[0].tabs.push(new Safari.Tab({url: tab.url}))

	})
	
	// CLOSE ORIGINAL WINDOW
	Safari.windows[docCount].close()

}
