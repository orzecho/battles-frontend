export default function() {
this.get('/topics');
this.get('/topics/:id');
this.post('/topics');
this.del('/topics/:id');
this.patch('/topics/:id');
this.get('/tags');
this.get('/tags/:id');
this.post('/tags');
this.del('/tags/:id');
this.patch('/tags/:id');
this.get('/teams');
this.get('/teams/:id');
this.post('/teams');
this.del('/teams/:id');
this.patch('/teams/:id');
this.get('/battles');
this.get('/battles/:id');
this.post('/battles');
this.del('/battles/:id');
this.patch('/battles/:id');
this.get('/projects');
this.get('/projects/:id');
this.post('/projects');
this.del('/projects/:id');
this.patch('/projects/:id');

  // These comments are here to help you get started. Feel free to delete them.

  /*
    Config (with defaults).

    Note: these only affect routes defined *after* them!
  */

  // this.urlPrefix = '';    // make this `http://localhost:8080`, for example, if your API is on a different server
  // this.namespace = '';    // make this `/api`, for example, if your API is namespaced
  // this.timing = 400;      // delay for each request, automatically set to 0 during testing

  /*
    Shorthand cheatsheet:

    this.get('/posts');
    this.post('/posts');
    this.get('/posts/:id');
    this.put('/posts/:id'); // or this.patch
    this.del('/posts/:id');

    http://www.ember-cli-mirage.com/docs/v0.3.x/shorthands/
  */
}
