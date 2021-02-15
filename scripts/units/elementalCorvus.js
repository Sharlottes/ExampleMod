var defaultColor = Pal.heal;

const elementalCorvus = extend(UnitType, "elemental-corvus", {
    update(unit){
        if(unit.item() != null && unit.itemTime > 0.01){
            defaultColor = unit.item().color;
        }
        this.super$update(unit);
    }
});
//stats
elementalCorvus.mineTier = 1;
elementalCorvus.hitSize = 29;
elementalCorvus.health = 18000;
elementalCorvus.armor = 9;
elementalCorvus.landShake = 1.5;
elementalCorvus.rotateSpeed = 1.5;

elementalCorvus.commandLimit = 8;

elementalCorvus.legCount = 4;
elementalCorvus.legLength = 14;
elementalCorvus.legBaseOffset = 11;
elementalCorvus.legMoveSpace = 1.5;
elementalCorvus.legTrns = 0.58;
elementalCorvus.hovering = true;
elementalCorvus.visualElevation = 0.2;
elementalCorvus.allowLegStep = true;
elementalCorvus.ammoType = AmmoTypes.powerHigh;
elementalCorvus.groundLayer = Layer.legUnit;

elementalCorvus.speed = 0.3;

elementalCorvus.mineTier = 2;
elementalCorvus.mineSpeed = 7;
elementalCorvus.drawShields = false;


const elementalCorvusWeapon = new Weapon("elemental-corvus-weapon");
elementalCorvusWeapon.shootSound = Sounds.laserblast;
elementalCorvusWeapon.chargeSound = Sounds.lasercharge;
elementalCorvusWeapon.soundPitchMin = 1;
elementalCorvusWeapon.top = false;
elementalCorvusWeapon.mirror = false;
elementalCorvusWeapon.shake = 14;
elementalCorvusWeapon.shootY = 5;
elementalCorvusWeapon.x = 0
elementalCorvusWeapon.y = 0;
elementalCorvusWeapon.reload = 350;
elementalCorvusWeapon.recoil = 0;

elementalCorvusWeapon.cooldownTime = 350;

elementalCorvusWeapon.shootStatusDuration = 60 * 2;
elementalCorvusWeapon.shootStatus = StatusEffects.unmoving;
elementalCorvusWeapon.firstShotDelay = Fx.greenLaserCharge.lifetime;

const elementalCorvusWeaponBullet = new LaserBulletType();
elementalCorvusWeaponBullet.length = 460;
elementalCorvusWeaponBullet.damage = 560;
elementalCorvusWeaponBullet.width = 75;

elementalCorvusWeaponBullet.lifetime = 65;

elementalCorvusWeaponBullet.lightningSpacing = 35;
elementalCorvusWeaponBullet.lightningLength = 5;
elementalCorvusWeaponBullet.lightningDelay = 1.1;
elementalCorvusWeaponBullet.lightningLengthRand = 15;
elementalCorvusWeaponBullet.lightningDamage = 50;
elementalCorvusWeaponBullet.lightningAngleRand = 40;
elementalCorvusWeaponBullet.largeHit = true;
elementalCorvusWeaponBullet.lightColor = defaultColor;
elementalCorvusWeaponBullet.lightningColor = defaultColor;

elementalCorvusWeaponBullet.shootEffect = Fx.greenLaserCharge;

elementalCorvusWeaponBullet.healPercent = 25;
elementalCorvusWeaponBullet.collidesTeam = true;

elementalCorvusWeaponBullet.sideAngle = 15;
elementalCorvusWeaponBullet.sideWidth = 0;
elementalCorvusWeaponBullet.sideLength = 0;
elementalCorvusWeaponBullet.colors = [defaultColor.cpy().mul(1, 1, 1, 0.4), defaultColor, Color.white];

elementalCorvusWeapon.bullet = elementalCorvusWeaponBullet;
elementalCorvus.weapons.add(elementalCorvusWeapon);
elementalCorvus.constructor = () => extend(LegsUnit, {});
