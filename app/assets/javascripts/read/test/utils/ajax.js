


/**
 * Respond 200 to a request.
 *
 * @param {FakeXMLHttpRequest} req
 * @param {String} res
 */
export function respond200(req, res) {
  req.respondWith({
    status: 200,
    responseText: res,
  });
}


/**
 * Inject a collections fixture.
 *
 * @param {Object} res
 */
export function respondCollections(res) {
  let req = jasmine.Ajax.requests.filter(/collections/)[0];
  respond200(req, JSON.stringify(res));
}
