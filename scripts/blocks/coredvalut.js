const coredvalut = extendContent(CoreBlock, "coredvalut", {
    canReplace(other){
        return this.super$canReplace(other) || ((other instanceof StorageBlock || other instanceof CoreBlock) && coredvalut.size >= other.size);
    },
    canPlaceOn(tile, team){
        if(tile == null) return false;
        var core = team.core();
        if(core == null || (!Vars.state.rules.infiniteResources && !core.items.has(coredvalut.requirements))) return false;
        return true;
    }
});
