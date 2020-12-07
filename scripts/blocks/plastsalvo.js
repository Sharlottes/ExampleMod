const plastChargeBegin = new Effect(60, e => {
    Draw.color(e.color);
    Fill.circle(e.x, e.y, e.fin() * 3);

    Draw.color();
    Fill.circle(e.x, e.y, e.fin() * 2);
});
const plastCharge = new Effect(38, e => {
    Draw.color(e.color);

    Angles.randLenVectors(e.id, e.id % 3 + 1, 1 + 20 * e.fout(), e.rotation, 120, (x, y) => Drawf.tri(e.x + x, e.y + y, e.fslope() * 3 + 1, e.fslope() * 3 + 1, Mathf.angle(x, y)));
});
const phaseHit = new Effect(12, e => {
    Draw.color(Items.phaseFabric.color);
    Lines.stroke(2 * e.fout());
    Lines.circle(e.x, e.y, 5 * e.fout());
});

const plastMissile = new JavaAdapter(MissileBulletType, {}, 3.7, 15);
plastMissile.width = 8;
plastMissile.height = 8;
plastMissile.shrinkY = 0;
plastMissile.drag = 0.01;
plastMissile.homingPower = 0.1;
plastMissile.splashDamage = 30;
plastMissile.splashDamageRadius = 4 * 8;
plastMissile.ammoMultiplier = 2;
plastMissile.fragBullet = Bullets.fragPlasticFrag;
plastMissile.fragBullets = 10;
plastMissile.backColor = Pal.plastaniumBack;
plastMissile.frontColor = Pal.plastaniumFront;
plastMissile.trailColor = Pal.plastanium;
plastMissile.hitEffect = Fx.plasticExplosion;
plastMissile.despawnEffect = Fx.plasticExplosion;

const phaseMissile = new JavaAdapter(MissileBulletType, {
    /*
    radscl: 0,
    warmup: 0,
    broken: false,
    buildup: 200,
    shieldHealth: 200,
    hit: 0,
    update(b){ //???: 선생님, 코드가 답이 없습니다. ??: 포기해.
        var ah;
        if(ah != 1){
            ah = 1;
            this.radscl = 0;
            this.warmup = 0;
            this.broken = false;
            this.buildup = 200;
            this.hit = 0;
        }
        this.super$update(b);
        this.radscl = Mathf.lerpDelta(this.radscl, this.broken ? 0 : this.warmup, 0.05);
        this.warmup = Mathf.lerpDelta(this.warmup, 1, 0.1);

        if(this.buildup >= this.shieldHealth && !this.broken){
            this.broken = true;
            this.buildup = this.shieldHealth;
            Fx.shieldBreak.at(b.x, b.y, this.realRadius(), b.team.color);
        }
        if(this.buildup > 0){
            this.buildup -= Time.delta * 0.35;
        }
        if(this.hit > 0){
            this.hit -= 1 / 5 * Time.delta;
        }

        const customConsumer = trait => {
            if(trait.team != b.team && trait.type.absorbable && Mathf.dst(b.x, b.y, trait.x, trait.y) <= this.realRadius()){
                trait.absorb();
                Fx.absorb.at(trait);
                this.hit = 1;
                this.buildup += trait.damage * this.warmup;
            }
        };
        Groups.bullet.intersect(b.x - realRadius, b.y - realRadius, realRadius * 2, realRadius * 2, customConsumer);
    },
    realRadius(){
        return phaseMissile.sRadius * this.radscl;
    },
    draw(b){
        var height = this.height * ((1 - this.shrinkY) + this.shrinkY * b.fout());
        var width = this.width * ((1 - this.shrinkX) + this.shrinkX * b.fout());
        var offset = -90 + (this.spin != 0 ? Mathf.randomSeed(b.id, 360) + b.time * this.spin : 0);

        var mix = Tmp.c1.set(this.mixColorFrom).lerp(this.mixColorTo, b.fin());

        Draw.mixcol(mix, mix.a);

        Draw.color(this.backColor);
        Draw.rect(this.backRegion, b.x, b.y, width, height, b.rotation() + offset);
        Draw.color(this.frontColor);
        Draw.rect(this.frontRegion, b.x, b.y, width, height, b.rotation() + offset);


        var radius = this.realRadius();

        Draw.color(b.team.color, Color.white, Mathf.clamp(this.hit));

        Draw.z(Layer.shields);
        if(Core.settings.getBool("animatedshields")){
            Fill.poly(b.x, b.y, 40, radius);
        }else{
            Lines.stroke(1.5);
            Draw.alpha(0.09 + Mathf.clamp(0.08 * this.hit));
            Fill.circle(b.x, b.y, radius);
            Draw.alpha(1);
            Draw.z(Layer.effect);
            Lines.circle(b.x, b.y, radius);
        }

        Draw.reset();
    }
    */
}, 3.7, 35);
/*
phaseMissile.broken = false;
phaseMissile.shieldHealth = 200;
phaseMissile.sRadius = 1.5 * 8;
*/


phaseMissile.width = 7;
phaseMissile.height = 9;
phaseMissile.shrinkY = 0;
phaseMissile.drag = 0.01;
phaseMissile.homingPower = 0.75;
phaseMissile.splashDamage = 45;
phaseMissile.splashDamageRadius = 4.5 * 8;
phaseMissile.ammoMultiplier = 1;
phaseMissile.backColor = Items.phaseFabric.color;
phaseMissile.frontColor = Items.phaseFabric.color;
phaseMissile.trailColor = Items.phaseFabric.color;
phaseMissile.hitEffect = phaseHit;
phaseMissile.despawnEffect = phaseHit;

const standardSurgeFrag = extend(LightningBulletType, {});
standardSurgeFrag.lightningLength = 3.5 * 8 * 0.2;
standardSurgeFrag.lightningLengthRand = 4;
standardSurgeFrag.damage = 2;

const standardSurge = new BasicBulletType(4.5, 50, "bullet");
standardSurge.width = 6;
standardSurge.height = 17;
standardSurge.shootEffect = Fx.shootBig;
standardSurge.smokeEffect = Fx.shootBigSmoke;
standardSurge.ammoMultiplier = 6;
standardSurge.lifetime = 60;
standardSurge.homingPower = 0.05;
standardSurge.splashDamage = 60;
standardSurge.splashDamageRadius = 3 * 8;
standardSurge.lightning = 3;
standardSurge.lightningLength = 7 * 8 * 0.2;
standardSurge.lightningType = standardSurgeFrag;
standardSurge.fragBullets = 2;
standardSurge.fragBullet = standardSurgeFrag;

const plastSalvo = extendContent(ItemTurret, "plast-salvo", {});

const plastSalvoBuild = () => extendContent(ItemTurret.ItemTurretBuild, plastSalvo, {
    shoot(ammo){

        plastSalvo.tr.trns(this.rotation, plastSalvo.size * Vars.tilesize / 2);
        plastSalvo.chargeBeginEffect.at(this.x + plastSalvo.tr.x, this.y + plastSalvo.tr.y, this.rotation, ((ammo == Bullets.standardCopper || ammo == Bullets.standardDense) || (ammo == Bullets.standardHoming || ammo == Bullets.standardThorium)) ? Pal.bulletYellow : (ammo == Bullets.standardIncendiary ? Pal.lightishOrange : (ammo == plastMissile ? Pal.plastanium : (ammo == phaseMissile ? Items.phaseFabric.color : Pal.surge))));

        for(var i = 0; i < plastSalvo.chargeEffects; i++){
            Time.run(Mathf.random(plastSalvo.chargeMaxDelay), () => {
                if(!this.isValid()) return;
                plastSalvo.tr.trns(this.rotation, plastSalvo.size * Vars.tilesize / 2);
                plastSalvo.chargeEffect.at(this.x + plastSalvo.tr.x, this.y + plastSalvo.tr.y, this.rotation, ((ammo == Bullets.standardCopper || ammo == Bullets.standardDense) || (ammo == Bullets.standardHoming || ammo == Bullets.standardThorium)) ? Pal.bulletYellow : (ammo == Bullets.standardIncendiary ? Pal.lightishOrange : (ammo == plastMissile ? Pal.plastanium : (ammo == phaseMissile ? Items.phaseFabric.color : Pal.surge))));
            });
        }

        this.charging = true;

        for(var i = 0; i < plastSalvo.shots; i++){
            Time.run(plastSalvo.burstSpacing * i, () => {
                Time.run(plastSalvo.chargeTime, () => { //burst charge go brrrrr
                    if(!this.isValid() || !this.hasAmmo()) return;


                    plastSalvo.tr.trns(this.rotation, plastSalvo.size * Vars.tilesize / 2.7, Mathf.range(plastSalvo.xRand));
                    this.bullet(ammo, this.rotation + Mathf.range(plastSalvo.inaccuracy));
                    this.effects();
                    this.useAmmo();
                    this.recoil = plastSalvo.recoilAmount;
                    this.heat = 1;

                    this.charging = false;
                });
            });
        }
    },
    useAmmo(){
        if(this.cheating()) return this.peekAmmo();

        var entry = this.ammo.peek();
        entry.amount -= plastSalvo.ammoPerShot;
        this.ejectEffects();
        if(entry.amount <= 0) this.ammo.pop();
        this.totalAmmo -= plastSalvo.ammoPerShot;
        this.totalAmmo = Math.max(this.totalAmmo, 0);
        return entry.type();
    },
    ejectEffects(){
        if(!this.isValid()) return;

        var scl = (plastSalvo.shots == 2 && plastSalvo.alternate && this.shotCounter % 2 == 1 ? -1 : 1);
        if(this.peekAmmo() != plastMissile){
            Fx.casing2.at(this.x - Angles.trnsx(this.rotation, plastSalvo.ammoEjectBack), this.y - Angles.trnsy(this.rotation, plastSalvo.ammoEjectBack), this.rotation * scl);
        }
    },
    effects(){
        var fshootEffect = plastSalvo.shootEffect == Fx.none ? this.peekAmmo().shootEffect : plastSalvo.shootEffect;
        var fsmokeEffect = plastSalvo.smokeEffect == Fx.none ? this.peekAmmo().smokeEffect : plastSalvo.smokeEffect;
        fshootEffect.at(this.x + plastSalvo.tr.x, this.y + plastSalvo.tr.y, this.rotation);
        fsmokeEffect.at(this.x + plastSalvo.tr.x, this.y + plastSalvo.tr.y, this.rotation);
        if(this.peekAmmo() == plastMissile || this.peekAmmo() == phaseMissile){
            Sounds.missile.at(this.x + plastSalvo.tr.x, this.y + plastSalvo.tr.y, Mathf.random(0.9, 1.1));
        }else{
            Sounds.shootBig.at(this.x + plastSalvo.tr.x, this.y + plastSalvo.tr.y, Mathf.random(0.9, 1.1));
        }

        if(plastSalvo.shootShake > 0){
            Effect.shake(plastSalvo.shootShake, plastSalvo.shootShake, this);
        }

        this.recoil = plastSalvo.recoilAmount;
    }
});
plastSalvo.chargeBeginEffect = plastChargeBegin;
plastSalvo.chargeEffect = plastCharge;
plastSalvo.chargeEffects = 10;
plastSalvo.chargeMaxDelay = 30;
plastSalvo.chargeTime = 30;

plastSalvo.reloadTime = 38;
plastSalvo.restitution = 0.03;
plastSalvo.ammoEjectBack = 3;
plastSalvo.cooldown = 0.03;
plastSalvo.recoilAmount = 3;
plastSalvo.shootShake = 1;
plastSalvo.burstSpacing = 5;
plastSalvo.shots = 4;
plastSalvo.rotateSpeed = 10;
plastSalvo.inaccuracy = 17;
plastSalvo.shootCone = 35;
plastSalvo.ammo(
    Items.copper, Bullets.standardCopper,
    Items.graphite, Bullets.standardDense,
    Items.pyratite, Bullets.standardIncendiary,
    Items.silicon, Bullets.standardHoming,
    Items.thorium, Bullets.standardThorium,
    Items.plastanium, plastMissile,
    Items.phaseFabric, phaseMissile,
    Items.surgeAlloy, standardSurge
);
plastSalvo.buildType = plastSalvoBuild;
