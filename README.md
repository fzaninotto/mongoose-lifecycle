mongoose-lifecycle
==================

Mongoose plugin adding lifecyle events on the model class.

Installation
------------

Add the plugin as a dependency to your project in `package.json`:

```javascript
{
  "name": "myproject",
  ...
  "dependencies": {
    "mongoose": "2.6.5",
    "mongoose-lifecycle": "1.0.0",
    ...
  },
}
```

And run `npm install` again.

Usage
-----

Initialization is straightforward:

```javascript
var Book = new Schema({ ... });
Book.plugin(require('mongoose-lifecycle'));
```

Now the model emits lifecycle events before and after persistence operations:

 - beforeInsert
 - afterInsert
 - beforeUpdate
 - afterUpdate
 - beforeSave (called for both inserts and updates)
 - afterSave (called for both inserts and updates)
 - beforeRemove
 - afterRemove

You can listen to these events directly on the model.

```javascript
var Book = require('path/to/models/book');
Book.on('beforeInsert', function(book) {
  // do stuff...
});
```

License
-------

MIT License