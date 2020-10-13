const impactProjector = new ForceProjector("impact-projector");
impactProjector.consumes.add(new ConsumeLiquidFilter(liquid => liquid.temperature <= 1 && liquid.flammability < 1.3, 0.5)).boost().update(false);
impactProjector.buildType = () => extendContent(ForceProjector.ForceBuild, impactProjector, {
    drawShield(){
        if(!impactProjector.broken){
            var radius = realRadius();

            Draw.z(Layer.shields);

            Draw.color(team.color.mul(1, 1, 1, 0.5), Color.white, Mathf.clamp(impactProjector.hit));

            if(Core.settings.getBool("animatedshields")){
                Fill.poly(x, y, 6, radius);
            }else{
                Lines.stroke(1.5);
                Draw.alpha(0.09 + Mathf.clamp(0.08 * impactProjector.hit));
                Fill.poly(x, y, 6, radius);
                Draw.alpha(1);
                Lines.poly(x, y, 6, radius);
                Draw.reset();
            }
        }

        Draw.reset();
    }
});
