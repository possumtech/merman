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
    <div id="app">
        <article id="editor-section">
            <fieldset role="group">
                <select id="branch-dropdown" aria-label="Select Branch"></select>
                <button id="toggle-view" data-action="toggle-mode" data-i18n="toggle-view"></button>
            </fieldset>
            <textarea id="markdown-editor" spellcheck="false" aria-label="Markdown Editor" rows="10"></textarea>
        </article>
    </div>
    <template id="tmp-editor">
        <div></div>
    </template>
</body>
</html>
`);

global.document = document;
global.window = window;
window.location = new URL("http://localhost/");
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
