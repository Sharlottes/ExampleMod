const electricMaceEntity = prov(() => extend(MechUnit, {}));
EntityMapping.nameMap.put("electricMace", electricMaceEntity);
const electricMace = extendContent(UnitType, "electricMace", {});

electricMace.abilities.add(new MoveLightningAbility(20, 16, 1, 0, 3, Pal.surge));
