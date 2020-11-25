var multiProjector = new JavaAdapter(ForceProjector, {
  servRadius1: 48,
  servRadius2: 48,
  servRadius3: 48,
  drawPlace(x, y, rotation, valid){
    Draw.color(Vars.player.team().color.cpy().mul(1, 0.75, 0.25, 1));
    Lines.stroke(1);
    Lines.circle(x * Vars.tilesize + this.offset, y * Vars.tilesize + this.offset, this.radius);

    Draw.color(Vars.player.team().color.cpy().mul(1, 0.25, 0.25, 1));
    Lines.stroke(1);
    Lines.circle(x * Vars.tilesize + this.offset, y * Vars.tilesize + this.offset, this.radius + this.phaseRadiusBoost);
    Draw.color();
  },
  setBars(){
    this.super$setBars();
    this.bars.add("shield", entity => new Bar("stat.shieldhealth", Pal.sap, () => entity.broken ? 0 : 1 - entity.buildup / (multiProjector.shieldHealth + multiProjector.phaseShieldBoost * entity.phaseHeat)).blink(Color.white));
    this.bars.add("servShield1", entity => new Bar(() => Core.bundle.get("bar.servShield1"), () => Pal.sap, () => entity.servBroken1 ? 0 : 1 - entity.servBuildup1 / (multiProjector.shieldHealth + multiProjector.phaseShieldBoost * entity.phaseHeat)).blink(Color.white));
    this.bars.add("servShield2", entity => new Bar(() => Core.bundle.get("bar.servShield2"), () => Pal.sap, () => entity.servBroken2 ? 0 : 1 - entity.servBuildup2 / (multiProjector.shieldHealth + multiProjector.phaseShieldBoost * entity.phaseHeat)).blink(Color.white));
    this.bars.add("servShield3", entity => new Bar(() => Core.bundle.get("bar.servShield3"), () => Pal.sap, () => entity.servBroken3 ? 0 : 1 - entity.servBuildup3 / (multiProjector.shieldHealth + multiProjector.phaseShieldBoost * entity.phaseHeat)).blink(Color.white));
  }
}, "multi-projector");

multiProjector.consumes.add(new ConsumeLiquidFilter(liquid => liquid.temperature <= 1 && liquid.flammability < 1.3, 0.5)).boost().update(false);

multiProjector.buildType = () => extendContent(ForceProjector.ForceBuild, multiProjector, {
    servX1: 0,
    servY1: 0,
    servHit1: this.hit,
    servBuildup1: this.buildup,
    servBroken1: this.broken,
    servX2: 0,
    servY2: 0,
    servHit2: this.hit,
    servBuildup2: this.buildup,
    servBroken2: this.broken,
    servX3: 0,
    servY3: 0,
    servHit3: this.hit,
    servBuildup3: this.buildup,
    servBroken3: this.broken,
    servRadscl1: this.radscl,
    servRadscl2: this.radscl,
    servRadscl3: this.radscl,
    created(){
        this.super$created();
        this.servHit1 = this.hit;
        this.servBuildup1 = this.buildup;
        this.servBroken1 = this.broken;
        this.servHit2 = this.hit;
        this.servBuildup2 = this.buildup;
        this.servBroken2 = this.broken;
        this.servHit3 = this.hit;
        this.servBuildup3 = this.buildup;
        this.servBroken3 = this.broken;
        this.servRadscl1 = this.radscl;
        this.servRadscl2 = this.radscl;
        this.servRadscl3 = this.radscl;
        for(var i = 0; i < 3; i++){
            Tmp.v1.trns(120 + i * 120, multiProjector.radius);
            if(i == 0){
                this.servX1 = this.x + Tmp.v1.x;
                this.servY1 = this.y + Tmp.v1.y;
            }else if(i == 1){
                this.servX2 = this.x + Tmp.v1.x;
                this.servY2 = this.y + Tmp.v1.y;
            }else if(i == 2){
                this.servX3 = this.x + Tmp.v1.x;
                this.servY3 = this.y + Tmp.v1.y;
            }
        }
    },
    updateTile(){
        for(var i = 0; i < 3; i++){
            Tmp.v1.trns(120 + i * 120, this.realRadius());
            if(i == 0){
                this.servX1 = this.x + Tmp.v1.x;
                this.servY1 = this.y + Tmp.v1.y;
            }else if(i == 1){
                this.servX2 = this.x + Tmp.v1.x;
                this.servY2 = this.y + Tmp.v1.y;
            }else if(i == 2){
                this.servX3 = this.x + Tmp.v1.x;
                this.servY3 = this.y + Tmp.v1.y;
            }
        }
        const customConsumer = trait => {
            if(trait.team != this.paramEntity.team && trait.type.absorbable && Mathf.dst(this.paramEntity.x, this.paramEntity.y, trait.x, trait.y) <= this.realRadius()){
                trait.absorb();
                Fx.absorb.at(trait);
                this.paramEntity.hit = 1;
                this.paramEntity.buildup += trait.damage * this.paramEntity.warmup;
            }
        };
        const servCustomConsumer1 = trait => {
            if(trait.team != this.paramEntity.team && trait.type.absorbable && Mathf.dst(this.servX1, this.servY1, trait.x, trait.y) <= this.servRealRadius1()){
                trait.absorb();
                Fx.absorb.at(trait);
                this.servHit1 = 1;
                this.servBuildup1 += trait.damage * this.paramEntity.warmup;
            }
        };
        const servCustomConsumer2 = trait => {
            if(trait.team != this.paramEntity.team && trait.type.absorbable && Mathf.dst(this.servX2, this.servY2, trait.x, trait.y) <= this.servRealRadius2()){
                trait.absorb();
                Fx.absorb.at(trait);
                this.servHit2 = 1;
                this.servBuildup2 += trait.damage * this.paramEntity.warmup;
            }
        };
        const servCustomConsumer3 = trait => {
            if(trait.team != this.paramEntity.team && trait.type.absorbable && Mathf.dst(this.servX3, this.servY3, trait.x, trait.y) <= this.servRealRadius3()){
                trait.absorb();
                Fx.absorb.at(trait);
                this.servHit3 = 1;
                this.servBuildup3 += trait.damage * this.paramEntity.warmup;
            }
        };


        var phaseValid = false;
        this.phaseHeat = Mathf.lerpDelta(this.phaseHeat, Mathf.num(phaseValid), 0.1);
        if(phaseValid && !this.broken && this.timer.get(multiProjector.timerUse, multiProjector.phaseUseTime) && this.efficiency() > 0){
            this.consume();
        }

        this.radscl = Mathf.lerpDelta(this.radscl, this.broken ? 0 : this.warmup, 0.05);

        if(Mathf.chanceDelta(this.buildup / this.shieldHealth * 0.1)){
            Fx.reactorsmoke.at(this.x + Mathf.range(Vars.tilesize / 2), this.y + Mathf.range(Vars.tilesize / 2));
        }

        this.warmup = Mathf.lerpDelta(this.warmup, this.efficiency(), 0.1);

        if(this.buildup > 0){
            var scale = !this.broken ? multiProjector.cooldownNormal : multiProjector.cooldownBrokenBase;
            var cons = multiProjector.consumes.get(ConsumeType.liquid);
            if(cons.valid(this)){
                cons.update(this);
                scale *= (multiProjector.cooldownLiquid * (1 + (this.liquids.current().temperature - 0.4) * 0.9));
            }

            this.buildup -= this.delta() * scale;
        }

        if(this.broken && this.buildup <= 0){
            this.broken = false;
        }

        if(this.buildup >= multiProjector.shieldHealth + multiProjector.phaseShieldBoost && !this.broken){
            this.broken = true;
            this.buildup = multiProjector.shieldHealth;
            Fx.shieldBreak.at(this.servX1, this.servX2, this.servRealRadius1(), this.team.color.cpy());
        }

        if(this.hit > 0){
            this.hit -= 1 / 5 * Time.delta;
        }

        var realRadius = this.realRadius();

        if(realRadius > 0 && !this.broken){
            this.paramEntity = this;
            Groups.bullet.intersect(this.x - realRadius, this.y - realRadius, realRadius * 2, realRadius * 2, customConsumer);
        }

//---------------------------------------------------------------------------------------------------------------------------------------------------------------
        this.servRadscl1 = Mathf.lerpDelta(this.servRadscl1, this.servBroken1 ? 0 : this.warmup, 0.05);
        if(this.servBuildup1 > 0){
            var servScale1 = !this.servBroken1 ? multiProjector.cooldownNormal : multiProjector.cooldownBrokenBase;
            var servCons1 = multiProjector.consumes.get(ConsumeType.liquid);
            if(servCons1.valid(this)){
                servCons1.update(this);
                servScale1 *= (multiProjector.cooldownLiquid * (1 + (this.liquids.current().temperature - 0.4) * 0.9));
            }

            this.servBuildup1 -= this.delta() * servScale1;
        }

        if(this.servBroken1 && this.servBuildup1 <= 0){
            this.servBroken1 = false;
        }

        if(this.servBuildup1 >= multiProjector.shieldHealth + multiProjector.phaseShieldBoost && !this.servBroken1){
            this.servBroken1 = true;
            this.servBuildup1 = multiProjector.shieldHealth;
            Fx.shieldBreak.at(this.servX2, this.servY1, this.servRealRadius1(), this.team.color.cpy());
        }

        if(this.servHit1 > 0){
            this.servHit1 -= 1 / 5 * Time.delta;
        }

        var servRealRadius1 = this.servRealRadius1();

        if(servRealRadius1 > 0 && !this.servBroken1){
            //this.paramEntity = this;
            Groups.bullet.intersect(this.servX1 - servRealRadius1, this.servY1 - servRealRadius1, servRealRadius1 * 2, servRealRadius1 * 2, servCustomConsumer1);
        }

//---------------------------------------------------------------------------------------------------------------------------------------------------------------
        this.servRadscl2 = Mathf.lerpDelta(this.servRadscl2, this.servBroken2 ? 0 : this.warmup, 0.05);
        if(this.servBuildup2 > 0){
            var servScale2 = !this.servBroken2 ? multiProjector.cooldownNormal : multiProjector.cooldownBrokenBase;
            var servCons2 = multiProjector.consumes.get(ConsumeType.liquid);
            if(servCons2.valid(this)){
                servCons2.update(this);
                servScale2 *= (multiProjector.cooldownLiquid * (1 + (this.liquids.current().temperature - 0.4) * 0.9));
            }

            this.servBuildup2 -= this.delta() * servScale2;
        }

        if(this.servBroken2 && this.servBuildup2 <= 0){
            this.servBroken2 = false;
        }

        if(this.servBuildup2 >= multiProjector.shieldHealth + multiProjector.phaseShieldBoost && !this.servBroken2){
            this.servBroken2 = true;
            this.servBuildup2 = multiProjector.shieldHealth;
            Fx.shieldBreak.at(this.servX2, this.servY2, this.servRealRadius2(), this.team.color.cpy());
        }

        if(this.servHit2 > 0){
            this.servHit2 -= 1 / 5 * Time.delta;
        }

        var servRealRadius2 = this.servRealRadius2();

        if(servRealRadius2 > 0 && !this.servBroken2){
            //this.paramEntity = this;
            Groups.bullet.intersect(this.servX2 - servRealRadius2, this.servY2 - servRealRadius2, servRealRadius2 * 2, servRealRadius2 * 2, servCustomConsumer2);
        }

//---------------------------------------------------------------------------------------------------------------------------------------------------------------
        this.servRadscl3 = Mathf.lerpDelta(this.servRadscl3, this.servBroken3 ? 0 : this.warmup, 0.05);
        if(this.servBuildup3 > 0){
            var servScale3 = !this.servBroken3 ? multiProjector.cooldownNormal : multiProjector.cooldownBrokenBase;
            var servCons3 = multiProjector.consumes.get(ConsumeType.liquid);
            if(servCons3.valid(this)){
                servCons3.update(this);
                servScale3 *= (multiProjector.cooldownLiquid * (1 + (this.liquids.current().temperature - 0.4) * 0.9));
            }

            this.servBuildup3 -= this.delta() * servScale3;
        }

        if(this.servBroken3 && this.servBuildup3 <= 0){
            this.servBroken3 = false;
        }

        if(this.servBuildup3 >= multiProjector.shieldHealth + multiProjector.phaseShieldBoost && !this.servBroken3){
            this.servBroken3 = true;
            this.servBuildup3 = multiProjector.shieldHealth;
            Fx.shieldBreak.at(this.servX3, this.servY3, this.servRealRadius3(), this.team.color.cpy());
        }

        if(this.servHit3 > 0){
            this.servHit3 -= 1 / 5 * Time.delta;
        }

        var servRealRadius3 = this.servRealRadius3();

        if(servRealRadius3 > 0 && !this.servBroken3){
            //this.paramEntity = this;
            Groups.bullet.intersect(this.servX3 - servRealRadius3, this.servY3 - servRealRadius3, servRealRadius3 * 2, servRealRadius3 * 2, servCustomConsumer3);
        }


//---------------------------------------------------------------------------------------------------------------------------------------------------------------

        print(this.servX1);
        print(this.servY1);
        print(multiProjector.servRadius1);
        print(this.servBroken1);
    },
    realRadius(){
        return (multiProjector.radius + this.phaseHeat + multiProjector.phaseRadiusBoost) * this.radscl;
    },
    servRealRadius1(){
        return (multiProjector.servRadius1 + this.phaseHeat + multiProjector.phaseRadiusBoost) * this.servRadscl1;
    },
    servRealRadius2(){
        return (multiProjector.servRadius2 + this.phaseHeat + multiProjector.phaseRadiusBoost) * this.servRadscl2;
    },
    servRealRadius3(){
        return (multiProjector.servRadius3 + this.phaseHeat + multiProjector.phaseRadiusBoost) * this.servRadscl3;
    },
    drawShield(){
        if(!this.broken){
            var radius = this.realRadius();



            Draw.color(Pal.lancerLaser.cpy().lerp(Pal.sapBullet, 0.5), Color.white, Mathf.clamp(this.hit));

            Draw.z(Layer.shields);
            if(Core.settings.getBool("animatedshields")){
                Fill.poly(this.x, this.y, 40, radius);
            }else{
                Lines.stroke(1.5);
                Draw.alpha(0.09 + Mathf.clamp(0.08 * this.hit));
                Fill.circle(this.x, this.y, radius);
                Draw.alpha(1);
                Draw.z(Layer.effect);
                Lines.circle(this.x, this.y, radius);
                Draw.reset();
            }
        }

        if(!this.servBroken1){
            var servRadius1 = this.servRealRadius1();
            Draw.color(Pal.lancerLaser.cpy().lerp(Pal.sapBullet, 0.75), Color.white, Mathf.clamp(this.servHit1));

            Draw.z(Layer.shields);
            if(Core.settings.getBool("animatedshields")){
                Fill.poly(this.servX1, this.servY1, 40, servRadius1);
            }else{
                Lines.stroke(1.5);
                Draw.alpha(0.09 + Mathf.clamp(0.08 * this.servHit1));
                Fill.circle(this.servX1, this.servY1, servRadius1);
                Draw.alpha(1);
                Draw.z(Layer.effect);
                Lines.circle(this.servX1, this.servY1, servRadius1);
                Draw.reset();
            }
        }

        if(!this.servBroken2){
            var servRadius2 = this.servRealRadius2();

            Draw.color(Pal.lancerLaser.cpy().lerp(Pal.sapBullet, 0.75), Color.white, Mathf.clamp(this.servHit2));

            Draw.z(Layer.shields);
            if(Core.settings.getBool("animatedshields")){
                Fill.poly(this.servX2, this.servY2, 40, servRadius2);
            }else{
                Lines.stroke(1.5);
                Draw.alpha(0.09 + Mathf.clamp(0.08 * this.servHit2));
                Fill.circle(this.servX2, this.servY2, servRadius2);
                Draw.alpha(1);
                Draw.z(Layer.effect);
                Lines.circle(this.servX2, this.servY2, servRadius2);
                Draw.reset();
            }
        }

        if(!this.servBroken3){
            var servRadius3 = this.servRealRadius3();

            Draw.color(Pal.lancerLaser.cpy().lerp(Pal.sapBullet, 0.75), Color.white, Mathf.clamp(this.servHit3));

            Draw.z(Layer.shields);
            if(Core.settings.getBool("animatedshields")){
                Fill.poly(this.servX3, this.servY3, 40, servRadius3);
            }else{
                Lines.stroke(1.5);
                Draw.alpha(0.09 + Mathf.clamp(0.08 * this.servHit3));
                Fill.circle(this.servX3, this.servY3, servRadius3);
                Draw.alpha(1);
                Draw.z(Layer.effect);
                Lines.circle(this.servX3, this.servY3, servRadius3);
                Draw.reset();
            }
        }
        Draw.reset();
    }
});
