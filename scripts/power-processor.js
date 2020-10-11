const rtfmUI = require("rtfm/library");
const powerProcessor = extendContent(LogicBlock,"power-processor",{});
const Integer = java.lang.Integer;
powerProcessor.configurable = true;
powerProcessor.buildType = () => {
  return extendContent(LogicBlock.LogicBuild, powerProcessor, {

    buildConfiguration(table){
        this.super$buildConfiguration(table);
        table.button(Icon.star, () => {
            this.configure(new Integer(1));
            rtfmUI.showPage("$block.mod.title", true);
        }).size(40);
    }
  });
}
