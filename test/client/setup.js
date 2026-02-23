import { parseHTML } from "linkedom";

const {
	document,
	window,
	customElements,
	HTMLElement,
	Event,
	CustomEvent,
	NodeList,
	HTMLTemplateElement,
} = parseHTML(`
<!DOCTYPE html>
<html>
<body data-theme="light">
    <div id="app"></div>
    <template id="tmp-editor">
        <div></div>
    </template>
</body>
</html>
`);

global.document = document;
global.window = window;
global.customElements = customElements;
global.HTMLElement = HTMLElement;
global.Event = Event;
global.CustomEvent = CustomEvent;
global.NodeList = NodeList;
global.HTMLTemplateElement = HTMLTemplateElement;

// Mock localStorage
global.localStorage = {
	getItem: () => null,
	setItem: () => {},
	clear: () => {},
};
