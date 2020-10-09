const multiCultivator = extendContent(GenericCrafter,"multi-cultivator",{});
const rtfmUI = require("rtfm/library");
const Integer = java.lang.Integer;

multiCultivator.drawer = new DrawAnimation();
multiCultivator.configurable = true;
multiCultivator.buildType = () => {
    return extendContent(GenericCrafter.GenericCrafterBuild, multiCultivator, {
        buildConfiguration(table){
            this.super$buildConfiguration(table);
            table.button(Icon.star, () => {
                this.configure(new Integer(1));
                rtfmUI.showPage("$block.mod.title", false);
            }).size(40);
        }
    });
}