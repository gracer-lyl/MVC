(function($) {
	// model
	var Item = Backbone.Model.extend({
		defaults: {
			part1: 'hello',
			part2: 'world'
		}
	})

	var List = Backbone.Collection.extend({
		model: Item
	})

	var ItemView = Backbone.View.extend({
		tagName: 'li',
		initialize: function() {
			_.bindAll(this, 'render')
		},
		render: function() {
			$(this.el).html('<span>' + this.model.get('part1') + ' ' + this.model.get('part2') + '</span>')
			return this
		}
	})

	var ListView = Backbone.View.extend({
		el: $('body'),
		events: {
			'click button#add': 'addItem'
		},
		initialize: function() {
			_.bindAll(this, 'render', 'addItem', 'appendItem')
			var item1 = new Item({
				part1: 'baidu',
				part2: '你好！'
			})
			var item2 = new Item({
				part1: 'google',
				part2: '你好！'
			})

			this.collection = new List([item1, item2])
			this.collection.bind('add', this.appendItem)
			this.count = 0
			this.render()

		},
		render: function() {
			var self = this
			$(this.el).append('<button id="add">增加一项</button>')
			$(this.el).append('<ul></ul>')
			_(this.collection.models).each(function(item) {
				self.appendItem(item);
			}, this);
		},
		addItem: function() {
			this.count++
			var item = new Item()
			item.set({
				part2: item.get('part2') + this.count
			})
			this.collection.add(item)
		},
		appendItem: function(item) {
			var itemView = new ItemView({
				model: item
			})
			$('ul', this.el).append(itemView.render().el)
		}
	})

	// 初始化
	var listView = new ListView()

})(Zepto);