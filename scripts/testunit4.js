//변수 정의

    //어빌리티
const healColor = Color.valueOf("98ffa9");
const healerColor = Color.valueOf("db401c");
const spawnUnit = Vars.content.getByName(ContentType.unit, "fortress");
const spawnUnit2 = Vars.content.getByName(ContentType.unit, "dagger");
const spawnUnit3 = Vars.content.getByName(ContentType.unit, "pulsar");
const UnitSpawn1 = new UnitSpawnAbility(spawnUnit3, 15 * 60, 0, 0);
const healField1 = new HealFieldAbility(50, 2 * 60, 20 * 8);
    //엔티티
const testunit4Entity = prov(() => extend(BuilderMinerPayloadUnit, {}));
EntityMapping.nameMap.put("testunit4", testunit4Entity);
const testunit4 = extendContent(UnitType, "testunit4", {});
    //탄환
const testFragBullet1 = new BombBulletType(15, 24);
const testBullet1 = new MissileBulletType(3, 35);
const testBullet2 = new LightningBulletType();
    //무기
//const testWeapon1 = new Weapon("testmissile1");
//const testWeapon2 = new Weapon("testmissile1");
//const testWeapon3 = new Weapon("testshotgun1");
    //그래픽 효과
const mendSpawn = new Effect (120, e => { //유닛 소환 그래픽 효과
    if(!(e.data instanceof UnitType)) {
        return;
    }
    Draw.color(healColor);
    Draw.alpha(e.fin());

    var scl = 1 + e.fout() * 2;

    var unit = e.data();
    var region = unit.icon(Cicon.full);

    Draw.rect(region, e.x, e.y, region.width * Draw.scl * scl, region.height * Draw.scl * scl, 180);
});
const healIn = new Effect (60, e => { //유닛 치료 그래픽 효과
    Draw.color(e.color);

    e.scaled(8, e2 => {
        Draw.stroke(e2.fout() * 4);
        Lines.circle(e2.x, e2.y, 4 + e2.fin() * 27);
    });

    Draw.stroke(e.fout() * 2);

    Angles.randLenVectors(e.id, 30, 4 + 40 * e.fin(), (x, y) => {
        Draw.lineAngle(e.x + x, e.y + y, Mathf.angle(x, y), e.fin() * 4 + 1);
    });
    Draw.color(Pal.heal);
    Lines.stroke(e.fout() * 2);
    Lines.circle(e.x, e.y, 4 + e.finpow() * 65);

    Draw.color(Pal.heal);
    for(i = 0; i < 4; i++){
        Drawf.tri(e.x, e.y, 6, 100 * e.fout(), i*90);
    };

    Draw.color();
    for(i = 0; i < 4; i++){
        Drawf.tri(e.x, e.y, 3, 35 * e.fout(), i*90);
    };
});



//실행문

    //그래픽 효과
UnitSpawn1.spawnEffect = mendSpawn;
healField1.healEffect = healIn;

    //어빌리티
testunit4.abilities.add(new JavaAdapter(HealFieldAbility, {}, 50, 2 * 60, 20 * 8));
testunit4.abilities.add(new ForceFieldAbility(96, 0.5, 550, 2 * 60));
testunit4.abilities.add(new UnitSpawnAbility(spawnUnit2, 5 * 60, 18, 7));
testunit4.abilities.add(new UnitSpawnAbility(spawnUnit2, 5 * 60, -18, 7));
testunit4.abilities.add(new UnitSpawnAbility(spawnUnit, 5 * 60, 18, -7));
testunit4.abilities.add(new UnitSpawnAbility(spawnUnit, 5 * 60, -18, -7));
testunit4.abilities.add(new UnitSpawnAbility(spawnUnit3, 15 * 60, 0, 0));
//testunit4.weapons.add(testWeapon1);
//testunit4.weapons.add(testWeapon2);
//testunit4.weapons.add(testWeapon3);
    //무기
    /*
testWeapon1.reload = 60;
testWeapon1.shake = 1;
testWeapon1.shots = 2;
testWeapon1.inaccuracy = 5;
testWeapon1.velocityRnd = 0.2;
testWeapon1.x = 5;
testWeapon1.y = 8;
testWeapon1.rotate = true;
testWeapon1.top = true;
testWeapon1.shootSound = Sounds.missile;
testWeapon1.bullet = testBullet1;

testWeapon2.reload = 45;
testWeapon2.shake = 1;
testWeapon2.shots = 2;
testWeapon2.inaccuracy = 5;
testWeapon2.velocityRnd = 0.2;
testWeapon2.x = 3;
testWeapon2.y = 4;
testWeapon2.rotate = true;
testWeapon2.top = true;
testWeapon2.shootSound = Sounds.missile;
testWeapon2.bullet = testBullet1;

testWeapon3.reload = 40;
testWeapon3.shootY = 2.5;
testWeapon3.shake = 2.2;
testWeapon3.shots = 3;
testWeapon3.inaccuracy = 35;
testWeapon3.shotDelay = 0.5;
testWeapon3.spacing = 0;
testWeapon3.recoil = 2.5;
testWeapon3.x = 20;
testWeapon3.y = 0;
testWeapon3.top = true;
testWeapon3.ejectEffect = Fx.none;
testWeapon3.shootSound = Sounds.spark;
testWeapon3.bullet = testBullet2;
*/
    //탄환
testBullet1.drag = -0.003;
testBullet1.homingRange = 20 * 8;
testBullet1.keepVelocity = false;
testBullet1.splashDamageRadius = 2.5 * 8;
testBullet1.splashDamage = 10;
testBullet1.lifetime = 60;
testBullet1.trailColor = Color.valueOf("62ae7f");
testBullet1.backColor = Color.valueOf("62ae7f");
testBullet1.frontColor = healColor;
testBullet1.mixColorFrom = healColor;
testBullet1.mixColorTo = healerColor;
testBullet1.hitColor = healColor;
testBullet1.hitEffect = Fx.healWave;
testBullet1.despawnEffect = Fx.healWave;
testBullet1.shootEffect = Fx.shootHeal;
testBullet1.weaveScale = 6;
testBullet1.weaveMag = 1;
testBullet1.puddles = 8;
testBullet1.puddleRange = 8;
testBullet1.puddleAmount = 10;
testBullet1.puddleLiquid = Liquids.oil;
testBullet1.fragBullets = 3;
testBullet1.fragBullet = testFragBullet1;

testBullet2.damage = 20;
testBullet2.lightningLength = 9;
testBullet2.lightningLengthRand = 7;
testBullet2.shootEffect = Fx.shootHeal;
testBullet2.lightningColor = healColor;
testBullet2.hitColor = healColor;

testFragBullet1.width = 10;
testFragBullet1.height = 14;
testFragBullet1.hitEffect = Fx.explosion;
testFragBullet1.damage = 30;
testFragBullet1.hitColor = healerColor;
testFragBullet1.backColor = healerColor;
testFragBullet1.frontColor = healerColor;
testFragBullet1.speed = 2;
testFragBullet1.lightning = 2;
testFragBullet1.lightningColor = healerColor;
testFragBullet1.lightningLength = 4;
testFragBullet1.incendAmount = 4;
testFragBullet1.incendSpread = 15;
testFragBullet1.incendChance = 1;
//로그 확인

    //어빌리티
print(healColor);
print(spawnUnit);
print(spawnUnit2);
print(spawnUnit3);
print(UnitSpawn1);
print(healField1);
print(healField1.healEffect);
    //엔티티
print(testunit4Entity);
print(testunit4);
    //탄환
print(testFragBullet1);
print(testBullet1);
print(testBullet2);
    //무기
//print(testWeapon1);
//print(testWeapon2);
//print(testWeapon3);
    //그래픽 효과
print(mendSpawn);
print(healIn);
    //유닛
print(testunit4.abilities);
print(testunit4.weapons);
