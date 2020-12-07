const powerProcessor = extendContent(LogicBlock,"power-processor",{});

try{
  const rtfmUI = require("rtfm/library");
  const Integer = java.lang.Integer;
  powerProcessor.configurable = true;
  powerProcessor.buildType = () => {
    return extendContent(LogicBlock.LogicBuild, powerProcessor, {
      buildConfiguration(table){
        this.super$buildConfiguration(table);
        table.button(Icon.star, () => {
            this.configure(new Integer(1));
            rtfmUI.showPage("$block.mod.title", false);
        }).size(40);
      }
    });
  }
} catch(e) {
  Log.warn("Please install [#00aaff]DeltaNedas/rtfm[] to view OP Walls's manual pages.");
}
