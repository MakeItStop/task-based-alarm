var reflect = require("reflect-metadata");
var component = require("../pages/settings/settings.component");
var appSettings = require("application-settings");


describe("#selectedIndexChanged()", function() {
  var taskPicker;
  var settingsComponent
  beforeEach(function() {
    settingsComponent = new component.SettingsPage();
    taskPicker = jasmine.createSpyObj('taskPicker', ['selectedIndex']);
    taskPicker.selectedIndex = 1;
  });

  it("is able to save a set task value", function() {
    settingsComponent.selectedIndexChanged(taskPicker);
    expect(appSettings.getString("task")).toEqual("math-game");
  });
});
