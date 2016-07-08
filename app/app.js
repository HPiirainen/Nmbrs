new Vue({
  el: '#app',
  data: {
    message: 'Hello Vue.js!',
    newItem: '',
    items: [
	  { title: 'Eka' },
	  { title: 'Toka' },
	  { title: 'Kolmas' }
    ]
  },
  methods: {
    reverseMsg: function () {
      this.message = _.split(this.message, '');
      this.message = _.reverse(this.message);
      this.message = _.join(this.message, '');
    },
    addItem: function() {
	  var item = _.trim(this.newItem);
	  if( item ) {
		this.items.push({ title: item });
        this.newItem = '';
	  }
    },
    removeItem: function(index) {
      this.items.splice(index, 1);
    }
  }
})