const testcolor = new Color("98ffa9");

const testeffect = new Effect(10, e => {
    if(!(e.data instanceof UnitType)) {
        return;
    }

    Draw.alpha(e.fin());

    var scl = 1 + e.fout() * 2;

    var unit = e.data();
    var region = unit.icon(Cicon.full);

    Draw.rect(region, e.x, e.y,
        region.width * Draw.scl * scl, region.height * Draw.scl * scl, 180);

});

testeffect.at(0, 0, testcolor);