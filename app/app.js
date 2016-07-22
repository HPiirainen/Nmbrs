var vm = new Vue({
  el: '#app',
  data: {
    message: 'Hello Vue.js!',
    rowLength: 9,
    nmbrs: null,
    rows: null,
    initialNmbrs: _.split(_.join(_.concat(_.range(1, 10), _.range(11, 20)), ''), ''),
    selectedNmbrs: [],
    first: null,
    second: null
  },
  created: function() {
	this.initGame();
	console.log(this.nmbrs);
	console.log(this.rows);
  },
  computed: {
	sum: {
	  set: function(newSum) {
		this.sum = newSum;
	  },
	},
  },
  methods: {
	chunk: function(nmbrs) {
	  return _.chunk(nmbrs, this.rowLength);
	},
	initGame: function() {
	  this.nmbrs = this.initialNmbrs;
	  this.rows = this.chunk(this.nmbrs);
	},
	select: function(row, column, value) {
	  console.log(row, column, value);
	  var nmbr = {
		row: row,
		col: column,
		val: value
	  };
	  var count = this.selectedNmbrs.length;
	  if(count == 0 || count == 1) {
		this.selectedNmbrs.push(nmbr);
		console.log(this.selectedNmbrs);
	  } else {
		console.error('Max 2 values can be selected at the same time');
	  }
	},
  },
  watch: {
	'selectedNmbrs.length': function(val) {
	  console.log("val", val);
	  if(val == 2) {
		
	  }
	}
  },
  components: {
	'results-component': ResultsComponent,
	'controls-component': ControlsComponent
  }
});