const fx = require("testeffect");
const spawnUnit = Vars.content.getByName(ContentType.unit, "fortress");
const spawnUnit2 = Vars.content.getByName(ContentType.unit, "dagger");


EntityMapping.nameMap.put("testunit4", testunit4Entity);
testunit4.constructor = EntityMapping.map("testunit4");

const testunit4 = extendContent(UnitType, "testunit4", {});
const testunit4Entity = prov(() => extend(BuilderMinerPayloadUnit, {}));



testunit4.abilities.add(new HealFieldAbility(3, 2 * 60, 10 * 8));
testunit4.abilities.add(new ForceFieldAbility(96, 0.5, 550, 2 * 60));
testunit4.abilities.add(new UnitSpawnAbility(spawnUnit2, 5 * 60, 18, 7));
testunit4.abilities.add(new UnitSpawnAbility(spawnUnit, 5 * 60, -18, 7));
testunit4.abilities.add(new UnitSpawnAbility(spawnUnit2, 5 * 60, 18, -7));
testunit4.abilities.add(new UnitSpawnAbility(spawnUnit, 5 * 60, -18, -7));

const forceField1 = extend(ForceFieldAbility, {});
forceField1.spawnEffect = fx.mendSpawn;

const healField1 = extend(HealFieldAbility, {});
healField1.healEffect = fx.healIn;