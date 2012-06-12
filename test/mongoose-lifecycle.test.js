// mocha tests - run them with 'mocha -R spec'
var should = require('should');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var lifecycleEventsPlugin = require('../index.js');

mongoose.connect('mongodb://localhost/mongoose-lifecycle-test');
mongoose.connection.on('error', function (err) {
  console.error('MongoDB error: ' + err.message);
  console.error('Make sure a mongoDB server is running and accessible by this application')
});

// Setup Schemas for testing.
var PostSchema = new Schema({
  title: String,
  slug:  String
});
PostSchema.plugin(lifecycleEventsPlugin);
var Post = mongoose.model('Post', PostSchema);
Post.remove({}, function () { });

describe('Events', function(){
  
  describe('#beforeSave', function(){
    
    it('should trigger before insert', function(done){
      Post.on('beforeSave', function(post) {
        post.title = 'foo';
      });
      var post = new Post();
      post.should.not.have.property('title');
      post.save(function(err){
        if (err) throw err;
        post.title.should.eql('foo');
        should.not.exist(post._delta());
        Post.removeAllListeners('beforeSave');
        done();
      });
    });

    it('should trigger before update', function(done){
      Post.on('beforeSave', function(post) {
        post.title = 'foo';
      });
      var post = new Post();
      post.should.not.have.property('title');
      post.save(function(err){
        if (err) throw err;
        post.title = '';
        post.slug = 'foo';
        post.save(function(err2) {
          if (err2) throw err2;
          post.title.should.eql('foo');
          should.not.exist(post._delta());
          Post.removeAllListeners('beforeSave');
          done();
        });
      });
    });
    
  });

  describe('#beforeInsert', function(){
    
    it('should trigger before insert', function(done){
      Post.on('beforeInsert', function(post) {
        post.title = 'foo';
      });
      var post = new Post();
      post.should.not.have.property('title');
      post.save(function(err){
        if (err) throw err;
        post.title.should.eql('foo');
        should.not.exist(post._delta());
        Post.removeAllListeners('beforeInsert');
        done();
      });
    });

    it('should not trigger before update', function(done){
      Post.on('beforeInsert', function(post) {
        post.title = 'foo';
      });
      var post = new Post();
      post.should.not.have.property('title');
      post.save(function(err){
        if (err) throw err;
        post.title = '';
        post.slug = 'foo';
        post.save(function(err2) {
          if (err2) throw err2;
          post.title.should.eql('');
          should.not.exist(post._delta());
          Post.removeAllListeners('beforeInsert');
          done();
        });
      });
    });
    
  });

  describe('#beforeUpdate', function(){
    
    it('should not trigger before insert', function(done){
      Post.on('beforeUpdate', function(post) {
        post.title = 'foo';
      });
      var post = new Post();
      post.should.not.have.property('title');
      post.save(function(err){
        if (err) throw err;
        post.should.not.have.property('title');
        should.not.exist(post._delta());
        Post.removeAllListeners('beforeUpdate');
        done();
      });
    });

    it('should trigger before update', function(done){
      Post.on('beforeUpdate', function(post) {
        post.title = 'foo';
      });
      var post = new Post();
      post.should.not.have.property('title');
      post.save(function(err){
        if (err) throw err;
        post.title = '';
        post.slug = 'foo';
        post.save(function(err2) {
          if (err2) throw err2;
          post.title.should.eql('foo');
          should.not.exist(post._delta());
          Post.removeAllListeners('beforeUpdate');
          done();
        });
      });
    });
    
  });

  describe('#afterSave', function(){
    
    it('should trigger after insert', function(done){
      Post.on('afterSave', function(post) {
        post.title = 'foo';
      });
      var post = new Post();
      post.should.not.have.property('title');
      post.save(function(err){
        if (err) throw err;
        post.title.should.eql('foo');
        should.exist(post._delta());
        Post.removeAllListeners('afterSave');
        done();
      });
    });

    it('should trigger after update', function(done){
      Post.on('afterSave', function(post) {
        post.title = 'foo';
      });
      var post = new Post();
      post.should.not.have.property('title');
      post.save(function(err){
        if (err) throw err;
        post.title = '';
        post.slug = 'foo';
        post.save(function(err2) {
          if (err2) throw err2;
          post.title.should.eql('foo');
          should.exist(post._delta());
          Post.removeAllListeners('afterSave');
          done();
        });
      });
    });

  });

  describe('#afterInsert', function(){
    
    it('should trigger after insert', function(done){
      Post.on('afterInsert', function(post) {
        post.title = 'foo';
      });
      var post = new Post();
      post.should.not.have.property('title');
      post.save(function(err){
        if (err) throw err;
        post.title.should.eql('foo');
        should.exist(post._delta());
        Post.removeAllListeners('afterInsert');
        done();
      });
    });

    it('should not trigger after update', function(done){
      Post.on('afterInsert', function(post) {
        post.title = 'foo';
      });
      var post = new Post();
      post.should.not.have.property('title');
      post.save(function(err){
        if (err) throw err;
        post.title = '';
        post.slug = 'foo';
        post.save(function(err2) {
          if (err2) throw err2;
          post.title.should.eql('');
          should.not.exist(post._delta());
          Post.removeAllListeners('afterInsert');
          done();
        });
      });
    });

  });

  describe('#afterUpdate', function(){
    
    it('should not trigger after insert', function(done){
      Post.on('afterUpdate', function(post) {
        post.title = 'foo';
      });
      var post = new Post();
      post.should.not.have.property('title');
      post.save(function(err){
        if (err) throw err;
        post.should.not.have.property('title');
        should.not.exist(post._delta());
        Post.removeAllListeners('afterUpdate');
        done();
      });
    });

    it('should trigger after update', function(done){
      Post.on('afterUpdate', function(post) {
        post.title = 'foo';
      });
      var post = new Post();
      post.should.not.have.property('title');
      post.save(function(err){
        if (err) throw err;
        post.title = '';
        post.slug = 'foo';
        post.save(function(err2) {
          if (err2) throw err2;
          post.title.should.eql('foo');
          should.exist(post._delta());
          Post.removeAllListeners('afterUpdate');
          done();
        });
      });
    });

  });

  describe('#beforeRemove', function(){
    
    it('should trigger on remove', function(done){
      var flag = false;
      Post.on('beforeRemove', function(post) {
        flag = true;
      });
      var post = new Post();
      flag.should.be.false;
      post.save(function(err){
        if (err) throw err;
        flag.should.be.false;
        post.remove(function(err2) {
          if (err2) throw err2;
          flag.should.be.true;
          Post.removeAllListeners('beforeRemove');
          done();
        });
      });
    });

  });

  describe('#afterRemove', function(){
    
    it('should trigger after remove');

  });

});