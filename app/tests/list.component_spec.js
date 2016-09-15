var reflect = require("reflect-metadata");
var component = require("../pages/list/list.component");
var appSettings = require("application-settings");

describe("Tests for /pages/list/list.component.ts", function() {

  var listComponent;

  describe("selectedTask variable", function(){
    it("is set to chosen task", function(){
      spyOn(appSettings, 'getString').and.returnValue('maths');
      listComponent = new component.ListPage();
      expect(listComponent.selectedTask).toBe('maths');
    })
    it("is set to random alarm if 'random' option chosen", function(){
      spyOn(Math, 'random').and.returnValue(0.4);
      spyOn(appSettings, 'getString').and.returnValue('random');
      listComponent = new component.ListPage();
      expect(listComponent.selectedTask).toBe('slider');
    })
  })
});
