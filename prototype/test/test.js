var assert = require('assert');

var app = require('../js/guild');
var app2 = require('../js/guild-student');

describe('Boolean', function() {
  describe('#Checking if Subject Exists', function() {
    it('check if data is inside database', function() {
        let query = {keys:["1","2","3"]}
        let check = app2.validation(query,"cmsc123");
        // assert.equal(check, true);
        assert.equal(check, false);
    });
  });
});

let guilds_ref = [{id:"cmsc123",name:"cmsc 123"}];

describe('Boolean', function() {  //BTW UNCOMMENT OUT GUILD_REF, IT CAUSES MOCHA TO DIE
  describe('#Adding Subjects', function() {
    it('check if data is inside database', function() {
        let p = app.addSubject_test(guilds_ref,"cmsc123"); //calls the addSubject func
        assert.equal(p, false);  //compares the result, and done
        // assert.equal(p, true); //CMSC11  == TRUE 
    });
  });
});

//note
//Comment out document.getElement (in guild.js) before unit testing since it causes an error