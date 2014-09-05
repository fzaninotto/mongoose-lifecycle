/**
 * Mongoose plugin adding lifecyle events on the model class.
 *
 * Initialization is straightforward:
 *
 *     var lifecycleEventsPlugin = require('path/to/mongoose-lifecycle');
 *     var Book = new Schema({ ... });
 *     Book.plugin(lifecycleEventsPlugin);
 *
 * Now the model emits lifecycle events before and after persistence operations:
 *
 *  - beforeInsert
 *  - afterInsert
 *  - beforeUpdate
 *  - afterUpdate
 *  - beforeSave (called for both inserts and updates)
 *  - afterSave (called for both inserts and updates)
 *  - beforeRemove
 *  - afterRemove
 *
 * You can listen to these events directly on the model.
 *
 * var Book = require('path/to/models/book');
 * Book.on('beforeInsert', function(book) {
 *   // do stuff...
 * });
 */
module.exports = exports = function lifecycleEventsPlugin(schema) {
  schema.pre('save', function (next) {
    var model = this.model(this.constructor.modelName);
    model.emit('beforeSave', this);
    schema.emit('beforeSave', this);
    if (this.isNew) {
      model.emit('beforeInsert', this);
      schema.emit('beforeInsert', this);
    }
    else {
      model.emit('beforeUpdate', this);
      schema.emit('beforeUpdate', this);
    }
    this._isNew_internal = this.isNew;
    next();
  });
  schema.post('save', function() {
    var model = this.model(this.constructor.modelName);
    model.emit('afterSave', this);
    schema.emit('afterSave', this);
    if (this._isNew_internal) {
      model.emit('afterInsert', this);
      schema.emit('afterInsert', this);
    }
    else {
      model.emit('afterUpdate', this);
      schema.emit('afterUpdate', this);
    }
    this._isNew_internal = undefined;
  });
  schema.pre('remove', function (next) {
    var model = this.model(this.constructor.modelName);
    model.emit('beforeRemove', this);
    schema.emit('beforeRemove', this);
    next();
  });
  schema.post('remove', function() {
    var model = this.model(this.constructor.modelName);
    model.emit('afterRemove', this);
    schema.emit('afterRemove', this);
  });
};