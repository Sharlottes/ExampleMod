const iron = Vars.content.getByName(ContentType.item, iron);
print("iron" + " : " + iron);
print("ironName" + " : " + iron.name);
const ironOre = new OreBlock(iron.name);
print("ironOre" + " : " + ironOre);
//const ironOre = extend(OreBlock, {});
/*
const ironItem = extendContent(Item, "iron", {});
//ironOre.localizedName = ironItem.localizedName;
ironOre.itemDrop = iron;
ironOre.variants = 3;
ironOre.mapColor.set(ironItem.color);

print("ironOre" + " : " + ironOre);
print("ironItem" + " : " + ironItem);
print("iron" + " : " + iron);
print("ironOre.localizedName" + " : " + ironOre.localizedName);
print("ironOre.itemDrop" + " : " + ironOre.itemDrop);
print("ironOre.variants" + " : " + ironOre.variants);
print("ironOre.mapColor" + " : " + ironOre.mapColor);

*/