mongoose-lifecycle
==================

[Mongoose](https://github.com/LearnBoost/mongoose) plugin adding lifecyle events to the model class.

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
module.exports = mongoose.model('Book', Book);
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
  console.log('A new book "%s" was inserted', book.title);
});
```

The `beforeInsert` event is emitted just before a new document is persisted:

```javascript
var book = new Book();
book.title = 'War and Peace';
book.save(); // logs the book title to the console
});
```

Why Not Use The `save` and `remove` events?
-------------------------------------------

Because you may not have access to the right class to register them.

```javascript
// if you register an event listener on the Schema class, it works
// in models/book.js
var Book = new Schema({ ... });
Book.pre('save', function(next) {
  console.log('A new book "%s" was inserted', this.title);
  next();
});

// if you register an event listener on the Model class, it doesn't work
// in models/book.js
var Book = new Schema({ ... });
module.exports = mongoose.model('Book', Book);
// in a controller class
var Book = require('path/to/models/book'); // Book is a Model, not a Schema
Book.pre('save', function(next) {
  console.log('A new book "%s" was inserted', this.title);
  next();
});
```

The plugin does the work of finding the Schema back from the Model class. It also allows you to use the standard `on()` method to register event listeners, instead of the custom `pre()` and `post()` Mongoose methods. Lastly, it makes a difference between insert and update persistence operations, while Mongoose only provides a `save` event.

License
-------

MIT License