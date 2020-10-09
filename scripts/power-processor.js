const rtfmUI = require("rtfm/library");
const Integer = java.lang.Integer;
const powerProcessor = extendContent(LogicBlock,"power-processor",{});
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