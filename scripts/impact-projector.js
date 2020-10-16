const impactProjector = new ForceProjector("impact-projector");
impactProjector.consumes.add(new ConsumeLiquidFilter(liquid => liquid.temperature <= 1 && liquid.flammability < 1.3, 0.5)).boost().update(false);
const customConsumer = trait => {
    if(trait.team != paramEntity.team && trait.type.absorbable && Intersector.isInsideHexagon(this.paramEntity.x, this.paramEntity.y, this.paramEntity.realRadius() * 2, trait.x(), trait.y())){
        trait.absorb();
        Fx.absorb.at(trait);
        this.paramEntity.hit = 1;
        this.paramEntity.buildup += trait.damage() * this.paramEntity.warmup;
    }
};

impactProjector.buildType = () => extendContent(ForceProjector.ForceBuild, impactProjector, {
    updateTile(){
        var phaseValid = this.consumes.get(ConsumeType.item).valid(ForceBuild);

        this.phaseHeat = Mathf.lerpDelta(this.phaseHeat, Mathf.num(phaseValid), 0.1);

        if(phaseValid && !this.broken && timer(this.timerUse, this.phaseUseTime) && BuildingComp.efficiency() > 0){
            BuildingComp.consume();
        }

        this.radscl = Mathf.lerpDelta(this.radscl, this.broken ? 0 : this.warmup, 0.05);

        if(Mathf.chanceDelta(this.buildup / this.breakage * 0.1)){
            Fx.reactorsmoke.at(this.x + Mathf.range(this.tilesize / 2), this.y + Mathf.range(this.tilesize / 2));
        }

        this.warmup = Mathf.lerpDelta(this.warmup, BuildingComp.efficiency(), 0.1);

        if(this.buildup > 0){
            var scale = !this.broken ? this.cooldownNormal : this.cooldownBrokenBase;
            var cons = this.consumes.get(ConsumeType.liquid);
            if(cons.valid(this)){
                cons.update(this);
                scale *= (this.cooldownLiquid * (1 + (liquids.current().heatCapacity - 0.4) * 0.9));
            }

            this.buildup -= BuildingComp.delta() * scale;
        }

        if(this.broken && this.buildup <= 0){
            this.broken = false;
        }

        if(this.buildup >= this.breakage + this.phaseShieldBoost && !this.broken){
            this.broken = true;
            this.buildup = this.breakage;
            Fx.shieldBreak.at(this.x, this.y, this.realRadius(), this.team.color.cpy());
        }

        if(this.hit > 0){
            this.hit -= 1 / 5 * Time.delta;
        }

        var realRadius = this.realRadius();

        if(realRadius > 0 && !this.broken){
            this.paramEntity = ForceBuild;
            Groups.bullet.intersect(this.x - realRadius, this.y - realRadius, realRadius * 2, realRadius * 2, customConsumer);
        }
    },
    drawShield(){
        if(!this.broken){
            var radius = this.realRadius();
            var flashThreshold = 0.46;
            var flash = 1 + ((this.phaseHeat - flashThreshold) / (1 - flashThreshold)) * 5.4;
            flash += flash * Time.delta;
            //Draw.color(this.team.color.cpy().mul(1, 1, 1, 0.6), Color.white.cpy(), Mathf.clamp(this.hit));
            Draw.color(this.team.color.cpy(), this.team.color.cpy().mul(1, 0.25, 0.25, 1), Mathf.absin(flash, 9, 1));
            Draw.alpha(0.6);
            Draw.z(Layer.shields);
            if(Core.settings.getBool("animatedshields")){
                Fill.poly(this.x, this.y, 6, radius);
            }else{
                Lines.stroke(1.5);
                Draw.alpha(0.09 + Mathf.clamp(0.08 * this.hit));
                Fill.poly(this.x, this.y, 6, radius);
                Draw.alpha(1);
                Lines.poly(this.x, this.y, 6, radius);
                Draw.reset();
            }
        }
        Draw.reset();
    }
});
