//변수 정의
    //어빌리티
const healColor = Color.valueOf("98ffa9");
const healerColor = Color.valueOf("db401c");
const spawnUnit = Vars.content.getByName(ContentType.unit, "arkyid");
const spawnUnit2 = Vars.content.getByName(ContentType.unit, "reign");
const spawnUnit3 = Vars.content.getByName(ContentType.unit, "corvus");
const unitSpawn1 = new UnitSpawnAbility(spawnUnit3, 15 * 60, 0, 0);
const healField1 = new RepairFieldAbility(50, 2 * 60, 20 * 8);
    //엔티티
const testunit4Entity = prov(() => extend(AmmoDistributePayloadUnit, {}));
EntityMapping.nameMap.put("testunit4", testunit4Entity);
const testunit4 = extendContent(UnitType, "testunit4", {});
    //탄환
const testFragBullet1 = new BombBulletType(15, 24);
const testFragBullet2 = new BasicBulletType(3, 20, "large-bomb");
const testBullet1 = new MissileBulletType(3, 35);
const testBullet2 = new LightningBulletType();
const testBullet3 = new PointBulletType();
    //무기
const testWeapon1 = new Weapon("testmod-testmissile1");
const testWeapon2 = new Weapon("testmod-testmissile1");
const testWeapon3 = new Weapon("testmod-testshotgun1");
const testWeapon4 = new Weapon("testmod-testpointgun1");
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
unitSpawn1.spawnEffect = mendSpawn;
healField1.healEffect = healIn;

    //어빌리티
testunit4.abilities.add(new JavaAdapter(RepairFieldAbility, {}, 50, 2 * 60, 20 * 8));
testunit4.abilities.add(new ForceFieldAbility(15*8, 0.5, 550, 2 * 60));
testunit4.abilities.add(new UnitSpawnAbility(spawnUnit2, 5 * 60, 18, 7));
testunit4.abilities.add(new UnitSpawnAbility(spawnUnit2, 5 * 60, -18, 7));
testunit4.abilities.add(new UnitSpawnAbility(spawnUnit, 7 * 60, 18, -7));
testunit4.abilities.add(new UnitSpawnAbility(spawnUnit, 7 * 60, -18, -7));
testunit4.abilities.add(new UnitSpawnAbility(spawnUnit3, 10 * 60, 0, 0));
testunit4.weapons.add(testWeapon1);
testunit4.weapons.add(testWeapon2);
testunit4.weapons.add(testWeapon3);
testunit4.weapons.add(testWeapon4);
    //무기

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
testWeapon3.rotate = false;
testWeapon3.top = true;
testWeapon3.ejectEffect = Fx.none;
testWeapon3.shootSound = Sounds.spark;
testWeapon3.bullet = testBullet2;

testWeapon4.mirror = true;
testWeapon4.top = true;
testWeapon4.rotateSpeed = 2.5;
testWeapon4.rotate = true;
testWeapon4.reload = 360;
testWeapon4.recoil = 5;
testWeapon4.shake = 4;
testWeapon4.cooldownTime = 0.009;
testWeapon4.shots = 1;
testWeapon4.shootCone = 2;
testWeapon4.shootSound = Sounds.laser;
testWeapon4.shootStatus = StatusEffects.slow;
testWeapon4.shootStatusDuration = 120;
testWeapon4.firstShotDelay = 80;
testWeapon4.x = 17;
testWeapon4.y = -8;
testWeapon4.bullet = testBullet3;
testWeapon4.alternate = false;

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

testBullet3.trailSpacing = 20;
testBullet3.damage = 1500;
testBullet3.tileDamageMultiplier = 0.75;
testBullet3.speed = 750;
testBullet3.lifetime = 150;
testBullet3.hitShake = 6;
testBullet3.shootEffect = Fx.greenLaserCharge;
testBullet3.hitEffect = Fx.healWave;
testBullet3.hitColor = healColor;
testBullet3.smokeEffect = Fx.smokeCloud;
testBullet3.trailEffect = Fx.heal;
testBullet3.despawnEffect = Fx.greenBomb;
testBullet3.splashDamage = 500;
testBullet3.splashDamageRadius = 16;
testBullet3.fragBullets = 5;
testBullet3.fragLifeMin = 0.3;
testBullet3.fragVelocityMax = 0.5;
testBullet3.fragVelocityMin = 0.15;
testBullet3.fragBullet = testFragBullet2;

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

testFragBullet2.width = 30;
testFragBullet2.height = 30;
testFragBullet2.maxRange = 30;
testFragBullet2.backColor = healColor;
testFragBullet2.despawnShake = 4;
testFragBullet2.collidesAir = true;
testFragBullet2.lifetime = 70;
testFragBullet2.despawnEffect = Fx.greenBomb;
testFragBullet2.hitEffect = Fx.massiveExplosion;
testFragBullet2.keepVelocity = false;
testFragBullet2.spin = 2;
testFragBullet2.shrinkX = 0.7;
testFragBullet2.shrinkY = 0.7;
testFragBullet2.collides = false;
testFragBullet2.splashDamage = 240;
testFragBullet2.splashDamageRadius = 115;
/*

//로그 확인

    //어빌리티
print("HealColor" + " : " + healColor);
print("spawnUnit" + " : " + spawnUnit);
print("spawnUnit2" + " : " + spawnUnit2);
print("spawnUnit3" + " : " + spawnUnit3);
print("UnitSpawn1" + " : " + UnitSpawn1);
print("healField1" + " : " + healField1);
print("healField1.healEffect" + " : " + healField1.healEffect);
    //엔티티
print("testunit4Entity" + " : " + testunit4Entity);
print("testunit4Entity" + " : " + testunit4);
    //탄환
print("testFragBullet1" + " : " + testFragBullet1);
print("testBullet1" + " : " + testBullet1);
print("testBullet2" + " : " + testBullet2);
    //무기
print(testWeapon1);
print(testWeapon2);
print(testWeapon3);
    //그래픽 효과
print("mendSpawn" + " : " + mendSpawn);
print("healIn" + " : " + healIn);
    //유닛
print("testunit4.abilities" + " : " + testunit4.abilities);
print("testunit4.weapons" + " : " + testunit4.weapons);

*/
