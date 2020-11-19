const coredvalut = extendContent(CoreBlock, "core-valut", {
    canReplace(other){
        //YOU CAN REPLACE STORAGEBLOCKS AHYES
        return this.super$canReplace(other) || (other instanceof StorageBlock);
    }
});
