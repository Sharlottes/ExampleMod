const ironOre = extend(OreBlock, {});
//const ironItem = extendContent(Item, "iron", {});
const iron = Vars.content.getByName(ContentType.item, "testmod-iron");

//ironOre.localizedName = ironItem.localizedName;
ironOre.itemDrop = iron;
ironOre.variants = 3;
//ironOre.mapColor.set(ironItem.color);