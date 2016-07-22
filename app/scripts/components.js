var TestComponent = Vue.extend({
  props: ['test'],
  template: '<div>Testing {{ test }}</div>'
});

Vue.component('test-component', TestComponent);

var ControlsComponent = Vue.extend({
  name: 'controls-component',
  template: 
    '<div id="controls">' +
	  '<p><button type="button">New NMBRS</button></p>' +
	'</div>'
});

var ResultsComponent = Vue.extend({
  name: 'results-component',
  data: function() {
	return {}; 
  },
  props: {
	selected: Array
  },
  template: 
	'<div id="results">' +
	  '<p>Length: {{selected.length}}</p>' +
      '<p>First: </p>' +
      '<p>Second: </p>' +
	'</div>'
});