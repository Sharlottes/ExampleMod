const activationMatterColor = Color.valueOf("a3ddf5");
const activationMatterWeaver = extendContent(GenericCrafter, "activationmatter-weaver", {});


const weaverOut = new Effect (60, e => { //아이템 생성 그래픽 효과
    Draw.color(activationMatterColor);
    Lines.stroke(e.fout() * 2);
    Lines.circle(e.x, e.y, 7 + e.fin() * 8);

    Angles.randLenVectors(e.id, 20, 4 + 20 * e.fin(), (x, y) => {
        Lines.lineAngle(e.x + x, e.y + y, Mathf.angle(x, y), e.fslope() * 4 + 1);
    });
});


activationMatterWeaver.drawer = new DrawWeave();
activationMatterWeaver.craftEffect = weaverOut;