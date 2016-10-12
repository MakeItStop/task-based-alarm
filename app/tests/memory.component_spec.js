var reflect = require("reflect-metadata");
var component = require("../pages/memory/memory.component");
var appSettings = require("application-settings");
var Tile = require("../shared/tile/tile")

describe("Tests for Memory component", function() {

  var memoryGame;
  beforeEach(function() {
    memoryGame = new component.MemoryPage();

  });

  describe("#headerMessage", function(){
    beforeEach(function() {
      spyOn(memoryGame, '_routeToIndex');
      spyOn(memoryGame, '_alarmOff');
    });

    describe("if task passed", function() {
      it("should return home and switch off alarm", function() {
        memoryGame.taskPassed = true
        memoryGame.onTap();
        expect(memoryGame._routeToIndex).toHaveBeenCalled;
        expect(memoryGame._alarmOff).toHaveBeenCalled;
      });
    });

    describe("if task incomplete", function() {
      it("should not return home or switch off alarm", function() {
        memoryGame.taskPassed = false;
        memoryGame.onTap();
        expect(memoryGame._alarmOff).not.toHaveBeenCalled;
        expect(memoryGame._routeToIndex).not.toHaveBeenCalled;
      });
    });
  });

  describe("grid generation", function() {

    describe("should generate the grid according to difficulty level", function() {
      it("should return a 1x4 grid for difficulty of 2", function() {
        spyOn(appSettings, 'getNumber').and.returnValue(2)
        var newMemoryPage = new component.MemoryPage();
        expect(newMemoryPage._maxTiles).toEqual(4)
        expect(newMemoryPage._maxColumns).toEqual(1)
        expect(newMemoryPage._maxRows).toEqual(4)
        expect(newMemoryPage.displayRows).toEqual('*,*,*,*')
        expect(newMemoryPage.displayColumns).toEqual('*')
      });

      it("should return a 4x6 grid for difficulty of 12", function() {
        spyOn(appSettings, 'getNumber').and.returnValue(12)
        var newMemoryPage = new component.MemoryPage();
        expect(newMemoryPage._maxTiles).toEqual(24)
        expect(newMemoryPage._maxColumns).toEqual(4)
        expect(newMemoryPage._maxRows).toEqual(6)
        expect(newMemoryPage.displayRows).toEqual('*,*,*,*,*,*')
        expect(newMemoryPage.displayColumns).toEqual('*,*,*,*')
      });
    });
  });

  describe("#chooseTile", function() {

    it("first tile selection", function(){
      var tile = jasmine.createSpyObj(Tile, ['id'])
      memoryGame.chooseTile(tile)
      expect(memoryGame.selectedTiles).toContain(tile)
    });

    it("cannot add the same tile more than once", function(){
      var tile = jasmine.createSpyObj(Tile, ['id'])
      memoryGame.chooseTile(tile)
      memoryGame.chooseTile(tile)
      expect(memoryGame.selectedTiles.length).toEqual(1)
    });


    describe("tile matching", function() {

      beforeEach(function(done) {
         done();
      });
      it("second tile matches first tile", function(){
        var tile1 = jasmine.createSpyObj(Tile, ['id'])
        var tile2 = jasmine.createSpyObj(Tile, ['id'])
        tile1.id = "red"
        tile2.id = "red"

        memoryGame.chooseTile(tile1)
        memoryGame.chooseTile(tile2)

        setTimeout(function() {
          expect(memoryGame.selectedTiles).toContain(tile1)
          expect(memoryGame.selectedTiles).toContain(tile2)
          done()
        },600);
      });

      it("second tile does not match first tile", function(){
        var tile1 = jasmine.createSpyObj(Tile, ['id'])
        var tile2 = jasmine.createSpyObj(Tile, ['id'])

        tile1.id = "red"
        tile2.id = "green"

        memoryGame.chooseTile(tile1)
        memoryGame.chooseTile(tile2)

        setTimeout(function() {
          expect(memoryGame.selectedTiles).not.toContain(tile1)
          expect(memoryGame.selectedTiles).not.toContain(tile2)
          done()
        },600);
      });

      it("matching final pair completes task", function() {
        memoryGame._maxTiles = 2
        var tile1 = jasmine.createSpyObj(Tile, ['id'])
        var tile2 = jasmine.createSpyObj(Tile, ['id'])
        tile1.id = "red"
        tile2.id = "red"

        memoryGame.chooseTile(tile1)
        memoryGame.chooseTile(tile2)

        expect(memoryGame.taskPassed).toEqual(true)
      });
    });
  });
})
