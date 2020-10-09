const multiCultivator = extendContent(GenericCrafter,"multi-cultivator",{});
const rtfmUI = require("rtfm/library");


multiCultivator.drawer = new DrawAnimation();
multiCultivator.configurable = true;
multiCultivator.buildType = () => {
    return extendContent(GenericCrafter.GenericCrafterBuild, multiCultivator, {
        buildConfiguration(table){
            this.super$buildConfiguration(table);
            table.button(Icon.star, () => {
                this.configure(new Integer(1));
                rtfmUI.showPage("$block.floor", false);
            }).size(40);
        }
    });
}