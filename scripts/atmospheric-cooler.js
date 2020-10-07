var n = 0;
const rotateBlock = extend(DrawRotator, {
    draw(entity){
        Draw.rect(entity.block.region, entity.x, entity.y);
        Draw.rect(this.rotator, entity.x, entity.y, entity.totalProgress * 2 * Time.delta);
        n += 2;
        if(n >= 360){
            Time.run(90, () => {});
            var n = 0;
        };
    }
});
const atmosphericCooler = extendContent(GenericCrafter, "atmospheric-cooler", {});
atmosphericCooler.drawer = rotateBlock;