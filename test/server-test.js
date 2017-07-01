var assert = require('chai').assert
var app = require('../server')
var request = require('request')
var pry = require('pryjs')
var Food = require('../lib/models/food')


describe('Server', function() {
  before(function(done) {
    this.port = 7878
    this.server = app.listen(this.port, function(error, result) {
      if(error) { return done(error) }
      done()
    })
    this.request = request.defaults({
      baseUrl: 'http://localhost:7878'
    })
  })

  after(function() {
    this.server.close()
  })


  it('exists', function() {
    assert(app)
  })


  describe('GET /', function() {
    it('should return a 200', function(done) {
      this.request.get('/', function(error, response) {
        if(error) { done(error) }

        assert.equal(response.statusCode, 200)
        done()
      })
    })
  })


  describe('GET /api/foods/:id', function() {
    this.timeout(10000000)

    beforeEach(function(done) {
      Food.createFood("banana", 200, true)
      .then(function() { done() })
    })

    afterEach(function(done) {
      Food.emptyFoodsTable().then(function() { done() })
    })


    it('should return a 404 if the resource is not found', function(done) {
      this.request.get('/api/foods/1', function(error, response) {
        if(error) { done(error) }

        assert.equal(response.statusCode, 404)
        done()
      })
    })


    // it('should have the id and message from the resource', function(done) {
    //   var ourRequest = this.request
    //   Secret.findFirst()
    //   .then(function(data){
    //     var id = data.rows[0].id
    //     var message = data.rows[0].message
    //     var created_at = data.rows[0].created_at
    //     ourRequest.get('/api/secrets/' + id, function(error, response){
    //       if (error) { done(error) }
    //       // eval(pry.it)
    //
    //       var parsedSecret = JSON.parse(response.body)
    //
    //       assert.equal(parsedSecret.id, id)
    //       assert.equal(parsedSecret.message, message)
    //       assert.ok(parsedSecret.created_at)
    //       done()
    //     })
    //   })
    // })
  })
})
