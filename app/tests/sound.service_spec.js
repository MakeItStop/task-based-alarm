var reflect = require("reflect-metadata");
var service = require("../shared/soundService");
var appSettings = require("application-settings");

describe("Tests for /shared/soundService.ts", function() {

  var soundService;
  var applicationSettings;
  beforeEach(function() {

  });
  describe("currentSound variable", function(){
    it("is set to chosen alarm", function(){
      spyOn(appSettings, 'getString').and.returnValue('foghorn');
      soundService = new service.SoundService();
      console.log(soundService.currentSound);
      expect(soundService.currentSound).toBe('foghorn');
    })
    it("is set to random alarm if 'random' option chosen", function(){
      spyOn(Math, 'random').and.returnValue(1);
      spyOn(appSettings, 'getString').and.returnValue('random');
      soundService = new service.SoundService();
      expect(soundService.currentSound).toBe('warning');
    })
  })

});
