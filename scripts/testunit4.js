const fx = require("testeffect");
const spawnUnit = Vars.content.getByName(ContentType.unit, "fortress");
const spawnUnit2 = Vars.content.getByName(ContentType.unit, "dagger");
const testUnit4Entity = prov(() => extend(BuilderMinerPayloadUnit, {}));

EntityMapping.nameMap.put("testunit4", testUnit4Entity);



const testUnit4 = extendContent(UnitType, "testunit4", {});
const forceField1 = extendContent(Ability, "ForceFieldAbility", {});
const healField1 = extendContent(Ability, "HealFieldAbility", {});

testUnit4.abilities.add(new HealFieldAbility(3, 2 * 60, 10 * 8));
testUnit4.abilities.add(new ForceFieldAbility(96, 0.5, 550, 2 * 60));
testUnit4.abilities.add(new UnitSpawnAbility(spawnUnit2, 5 * 60, 18, 7));
testUnit4.abilities.add(new UnitSpawnAbility(spawnUnit, 5 * 60, -18, 7));
testUnit4.abilities.add(new UnitSpawnAbility(spawnUnit2, 5 * 60, 18, -7));
testUnit4.abilities.add(new UnitSpawnAbility(spawnUnit, 5 * 60, -18, -7));

forceField1.spawnEffect = fx.mendSpawn;

healField1.healEffect = fx.healIn;