var Employee = Backbone.View.extend({
  tagName: "li",
  template: _.template("<%= name %>"),
  render: function() {
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  },
  events: {
    "click .remove-entry": "removeEntry"
  },
  removeEntry: function() {
    this.model.destroy();
    this.remove();
  }
})

<span>{{name}}</span>

var moduleName = (function() {

  return {}
})();
