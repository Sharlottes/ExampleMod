const impactProjector = new ForceProjector("impact-projector");
impactProjector.consumes.add(new ConsumeLiquidFilter(liquid => liquid.temperature <= 1 && liquid.flammability < 1.3, 0.5)).boost().update(false);
impactProjector.buildType = () => extendContent(ForceProjector.ForceBuild, impactProjector, {
    drawShield(){
        if(!this.broken){
            var radius = this.realRadius();

            var flashThreshold = 0.46;
            var flash = 1 + ((this.phaseHeat - flashThreshold) / (1 - flashThreshold)) * 5.4;
            flash += flash * Time.delta;
            //Draw.color(this.team.color.cpy().mul(1, 1, 1, 0.6), Color.white.cpy(), Mathf.clamp(this.hit));
            Draw.color(this.team.color.cpy().mul(1, 1, 1, 0.8), this.team.color.cpy().mul(1, 0.25, 0.25, 0.5), Mathf.absin(flash, 9, 1));
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
