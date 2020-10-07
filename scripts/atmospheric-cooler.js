
const rotateBlock = extend(DrawRotator, {
    draw(entity){
        Draw.rect(entity.block.region, entity.x, entity.y);
        Draw.rect(this.rotator, entity.x, entity.y, entity.totalProgress * 2 * Time.delta);
    }
});
const atmosphericCooler = extendContent(GenericCrafter, "atmospheric-cooler", {});
atmosphericCooler.drawer = rotateBlock;