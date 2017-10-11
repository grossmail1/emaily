import React, {Component} from 'react'
import axios from 'axios'
class App extends Component {

	componentDidMount () {
		var iframe = this.iframe
		axios.get('./007.xhtml').then(data => {
			var documentText = data.data
			var parser = new DOMParser()
			var newDoc = parser.parseFromString(documentText, 'text/html')
			var newNode = newDoc.documentElement
			console.log('new doc', documentText)

			var head = newDoc.querySelector('head')
			var base = document.createElement('base')
			base.setAttribute('href', './007.xhtml')
			head.insertBefore(base, head.firstElementChild)

			var style = document.createElement('style')
			style.innerHTML = 'html{transform: scale(' + 1 +';transform-origin: 0 0; overflow: hidden;}'
			head.appendChild(style)
			iframe.contentWindow.document.open()
			iframe.contentWindow.document.write(newNode.outerHTML)
			iframe.contentWindow.document.close()
		}, 'text')
	}

	render() {
		return (
			<div>
				<div style={{height: '775px', width: '641.919px'}}>
					<iframe ref={i => this.iframe = i}/>
				</div>
			</div>
		)
	}

}

export default App