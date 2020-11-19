const rotateBlock = extend(DrawMixer, {
    draw(entity){
        const rotation = entity.block.rotate ? entity.rotdeg() : 0;

        Draw.rect(this.bottom, entity.x, entity.y, rotation);
        /*
        if(entity.liquids.total() > 0.001){
            Draw.color(entity.block.outputLiquid.liquid.color);
            Draw.alpha(entity.liquids.get(entity.block.outputLiquid.liquid) / entity.block.liquidCapacity);
            Draw.rect(this.liquid, entity.x, entity.y, rotation);
            Draw.color();
        }
        */
        Draw.rect(this.rotator, entity.x, entity.y, entity.totalProgress * 6);
        Draw.rect(this.top, entity.x, entity.y, rotation);
    },
    load(block){
        this.rotator = Core.atlas.find(block.name + "-rotator");
        //this.liquid = Core.atlas.find(block.name + "-liquid");
        this.top = Core.atlas.find(block.name + "-top");
        this.bottom = Core.atlas.find(block.name + "-bottom");
    },
    icons(block){
        return [
          this.bottom,
          this.rotator,
          this.top
        ];
    }
});

const atmosphericCooler = extendContent(GenericCrafter, "atmospheric-cooler", {});
atmosphericCooler.drawer = rotateBlock;