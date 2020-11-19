const boosteffect = new Effect(50, e => {
    Draw.color(Liquids.cryofluid.color, Color.white.cpy().mul(0.25, 0.25, 1, e.fout()), e.fout() / 6 + Mathf.randomSeedRange(e.id, 0.1));

    Fill.square(e.x, e.y, e.fslope() * 2, 45);
});
const run1 = () => {
    booststatus.opposite(StatusEffects.unmoving);
    booststatus.trans(StatusEffects.burning, ((unit, time, newTime, result) => {
        unit.damagePierce(8);
        Fx.burning.at(unit.x() + Mathf.range(unit.bounds() / 2), unit.y() + Mathf.range(unit.bounds() / 2));
        result.set(this, Math.min(time + newTime, 300));
    }));
    booststatus.trans(StatusEffects.shocked, ((unit, time, newTime, result) => {
        unit.damagePierce(14);
        if(unit.team == Vars.state.rules.waveTeam){
            Events.fire(Trigger.shock);
        }
        result.set(this, time);
    }));
    booststatus.trans(StatusEffects.blasted, ((unit, time, newTime, result) => {
        unit.damagePierce(18);
        result.set(this, time);
    }));
    booststatus.trans(StatusEffects.tarred, ((unit, time, newTime, result) => {
        result.set(this, Math.min(time + newTime / 2, 140))
    }));
    booststatus.trans(StatusEffects.overdrive, ((unit, time, newTime, result) => {
        booststatus.speedMultiplier = 2.5;
        booststatus.damageMultiplier = 2.5;
        booststatus.reloadMultiplier = 2.5;
        result.set(this, time);
    }));
    booststatus.trans(StatusEffects.overclock, ((unit, time, newTime, result) => {
        booststatus.speedMultiplier = 3;
        booststatus.damageMultiplier = 3;
        booststatus.reloadMultiplier = 3;
        result.set(this, time);
    }));
};

const booststatus = new JavaAdapter(StatusEffect, {}, "booststatus");
booststatus.speedMultiplier = 2;
booststatus.reloadMultiplier = 2;
booststatus.damageMultiplier = 2;
booststatus.effectChange = 0.25;
booststatus.effect = boosteffect;

const boostwater = extendContent(Floor, "boostwater", {});

boostwater.status = booststatus;
boostwater.statusDuration = 180;
boostwater.cacheLayer = CacheLayer.water;
boostwater.initblock = run1;

boostwater.variants = 1;
boostwater.liquidDrop = Liquids.water;
boostwater.isLiquid = true;
