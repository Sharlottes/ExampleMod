const impactProjector = new JavaAdapter(ForceProjector, {
  drawPlace(x, y, rotation, valid){
    Draw.color(Vars.player.team().color.cpy().mul(1, 0.75, 0.25, 1));
    Lines.stroke(1);
    Lines.circle(x * Vars.tilesize + this.offset, y * Vars.tilesize + this.offset, this.radius);

    Draw.color(Vars.player.team().color.cpy().mul(1, 0.25, 0.25, 1));
    Lines.stroke(1);
    Lines.circle(x * Vars.tilesize + this.offset, y * Vars.tilesize + this.offset, this.radius + this.phaseRadiusBoost);
    Draw.color();
  }
}, "impact-projector");

impactProjector.consumes.add(new ConsumeLiquidFilter(liquid => liquid.temperature <= 1 && liquid.flammability < 1.3, 0.5)).boost().update(false);

impactProjector.buildType = () => extendContent(ForceProjector.ForceBuild, impactProjector, {
    updateTile(){
        const customConsumer = trait => {
            if(trait.team != this.paramEntity.team && trait.type.absorbable && Mathf.dst(this.paramEntity.x, this.paramEntity.y, trait.x, trait.y) <= this.realRadius()){
                trait.absorb();
                Fx.absorb.at(trait);
                this.paramEntity.hit = 1;
                this.paramEntity.buildup += trait.damage * this.paramEntity.warmup;
            }
        };
        var phaseValid = impactProjector.consumes.get(ConsumeType.item).valid(this);
        this.phaseHeat = Mathf.lerpDelta(this.phaseHeat, Mathf.num(phaseValid), 0.1);
        if(phaseValid && !this.broken && this.timer.get(impactProjector.timerUse, impactProjector.phaseUseTime) && this.efficiency() > 0){
            this.consume();
        }

        this.radscl = Mathf.lerpDelta(this.radscl, this.broken ? 0 : this.warmup, 0.05);

        if(Mathf.chanceDelta(this.buildup / this.shieldHealth * 0.1)){
            Fx.reactorsmoke.at(this.x + Mathf.range(Vars.tilesize / 2), this.y + Mathf.range(Vars.tilesize / 2));
        }

        this.warmup = Mathf.lerpDelta(this.warmup, this.efficiency(), 0.1);

        if(this.buildup > 0){
            var scale = !this.broken ? impactProjector.cooldownNormal : impactProjector.cooldownBrokenBase;
            var cons = impactProjector.consumes.get(ConsumeType.liquid);
            if(cons.valid(this)){
                cons.update(this);
                scale *= (impactProjector.cooldownLiquid * (1 + (this.liquids.current().temperature - 0.4) * 0.9));
            }

            this.buildup -= this.delta() * scale;
        }

        if(this.broken && this.buildup <= 0){
            this.broken = false;
        }

        if(this.buildup >= impactProjector.shieldHealth + impactProjector.phaseShieldBoost && !this.broken){
            this.broken = true;
            this.buildup = impactProjector.shieldHealth;
            Fx.shieldBreak.at(this.x, this.y, this.realRadius(), this.team.color.cpy());
        }

        if(this.hit > 0){
            this.hit -= 1 / 5 * Time.delta;
        }

        var realRadius = this.realRadius();

        if(realRadius > 0 && !this.broken){
            this.paramEntity = this;
            Groups.bullet.intersect(this.x - realRadius, this.y - realRadius, realRadius * 2, realRadius * 2, customConsumer);
        }
    },
    drawShield(){
        if(!this.broken){
            var radius = this.realRadius();

            var flash = 10 * (this.phaseHeat - 0.46);
            flash += flash * Time.delta;

            Draw.color(this.team.color.cpy(), this.team.color.cpy().mul(1, 0.25, 0.25, 1), Mathf.absin(flash, 9, 1));

            Draw.z(Layer.shields);
            if(Core.settings.getBool("animatedshields")){
                Fill.poly(this.x, this.y, 40, radius);
            }else{
                Lines.stroke(1.5);
                Draw.alpha(0.09 + Mathf.clamp(0.08 * this.hit));
                Fill.circle(this.x, this.y, radius);
                Draw.alpha(1);
                Lines.circle(this.x, this.y, radius);
                Draw.reset();
            }
        }
        Draw.reset();
    }
});
