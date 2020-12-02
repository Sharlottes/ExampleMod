const javelinEntity = prov(() => extend(MechUnit, {}));
EntityMapping.nameMap.put("javelin", javelinEntity);


var minV = 3.6;
var maxV = 6;
var shield;

const javelin = extendContent(UnitType, "javelin", {

});

javelin.speed = 0.11;
javelin.drag = 0.01;
javelin.health = 170;
javelin.engineColor = Color.valueOf("d3ddff");
javelin.abilities.add(new MoveLightningAbility(20, 16, 1, 0, 3, Pal.surge));
