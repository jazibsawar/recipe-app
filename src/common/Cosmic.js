import Cosmic from 'cosmicjs';
var api_url = 'https://api.cosmicjs.com';
var api_version = 'v1';
Cosmic.deleteMedia = function(config, object, callback){
    var endpoint = api_url + '/' + api_version + '/' + config.bucket.slug + '/media/' + object.media_id;
    fetch(endpoint, {
      method: 'delete',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(object)
    })
    .then(function(response){
      if (response.status >= 400) {
        var err = {
          'message': 'There was an error with this request.'
        }
        return callback(err, false);
      }
      return response.json()
    })
    .then(function(response){
      return callback(false, response);
    });
};


export default Cosmic;