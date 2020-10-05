const fx = require("testeffect");
const spawnUnit = Vars.content.getByName(ContentType.unit, "fortress");
const spawnUnit2 = Vars.content.getByName(ContentType.unit, "dagger");



const testunit4 = extendContent(UnitType, "testmod-testunit4", {});
const testunit4Entity = prov(() => extend(BuilderMinerPayloadUnit, {}));

EntityMapping.nameMap.put("testmod-testunit4", testunit4);
EntityMapping.nameMap.put("testmod-testunit4", testunit4Entity);

//testunit4.constructor = () => extend(BuilderMinerPayloadUnit, {});



const forceField1 = extend(ForceFieldAbility, {});
const healField1 = extend(HealFieldAbility, {});

testunit4.abilities.add(new HealFieldAbility(3, 2 * 60, 10 * 8));
testunit4.abilities.add(new ForceFieldAbility(96, 0.5, 550, 2 * 60));
testunit4.abilities.add(new UnitSpawnAbility(spawnUnit2, 5 * 60, 18, 7));
testunit4.abilities.add(new UnitSpawnAbility(spawnUnit, 5 * 60, -18, 7));
testunit4.abilities.add(new UnitSpawnAbility(spawnUnit2, 5 * 60, 18, -7));
testunit4.abilities.add(new UnitSpawnAbility(spawnUnit, 5 * 60, -18, -7));

forceField1.spawnEffect = fx.mendSpawn;
healField1.healEffect = fx.healIn;