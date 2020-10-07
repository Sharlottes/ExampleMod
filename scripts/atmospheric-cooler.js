
const rotateBlock = extend(DrawMixer, {
    draw(entity){
        var rotation = entity.block.rotate ? entity.rotdeg() : 0;

        Draw.rect(this.bottom, entity.x, entity.y, rotation);

        if(entity.liquids.total() > 0.001){
            Draw.color(((GenericCrafter)entity.block).outputLiquid.liquid.color);
            Draw.alpha(entity.liquids.get(((GenericCrafter)entity.block).outputLiquid.liquid) / entity.block.liquidCapacity);
            Draw.rect(this.liquid, entity.x, entity.y, rotation);
            Draw.color();
        }
        Draw.rect(this.top, entity.x, entity.y, rotation);

        Draw.rect(entity.block.region, entity.x, entity.y);
        Draw.rect(this.rotator, entity.x, entity.y, entity.totalProgress * 6);
    }
    load(block){
        var rotator = Core.atlas.find(block.name + "-rotator");
        var liquid = Core.atlas.find(block.name + "-liquid");
        var top = Core.atlas.find(block.name + "-top");
        var bottom = Core.atlas.find(block.name + "-bottom");
    }
    icons(block){
    return new TextureRegion[]{bottom, rotator, top};
    }
});

const atmosphericCooler = extendContent(AttributeSmelter, "atmospheric-cooler", {});
atmosphericCooler.drawer = rotateBlock;