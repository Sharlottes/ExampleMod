const healColor = Color.valueOf("98ffa9");
const spawnUnit = Vars.content.getByName(ContentType.unit, "fortress");
const spawnUnit2 = Vars.content.getByName(ContentType.unit, "dagger");

const testunit4Entity = prov(() => extend(BuilderMinerPayloadUnit, {}));
EntityMapping.nameMap.put("testunit4", testunit4Entity);

const testunit4 = extendContent(UnitType, "testunit4", {});

testunit4.abilities.add(new JavaAdapter(HealFieldAbility, {}, 3, 2 * 60, 10 * 8));
testunit4.abilities.add(new ForceFieldAbility(96, 0.5, 550, 2 * 60));
testunit4.abilities.add(new UnitSpawnAbility(spawnUnit2, 5 * 60, 18, 7));
testunit4.abilities.add(new UnitSpawnAbility(spawnUnit, 5 * 60, -18, 7));
testunit4.abilities.add(new UnitSpawnAbility(spawnUnit2, 5 * 60, 18, -7));
testunit4.abilities.add(new UnitSpawnAbility(spawnUnit, 5 * 60, -18, -7));

const mendSpawn = new Effect(120, e => {
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

const healIn = new Effect (60, e => {
    Draw.color(e.color);

    e.scaled(8, e2 => {
        Draw.stroke(e2.fout() * 4);
        Lines.circle(e2.x, e2.y, 4 + e2.fin() * 27);
    });

    Draw.stroke(e.fout() * 2);

    Angles.randLenVectors(e.id, 30, 4 + 40 * e.fin(), (x, y) => {
        Draw.lineAngle(e.x + x, e.y + y, Mathf.angle(x, y), e.fin() * 4 + 1);
    });
});

const UnitSpawn1 = new UnitSpawnAbility;
UnitSpawn1.spawnEffect = mendSpawn;

const healField1 = new JavaAdapter(HealFieldAbility);
healField1.healEffect = healIn;