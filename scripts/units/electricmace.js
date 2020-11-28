const electricMaceEntity = prov(() => extend(MechUnit, {}));
EntityMapping.nameMap.put("testunit4", electricMacerEntity);
const electricMace = extendContent(UnitType, "electricmace", {});

electricMace.abilities.add(new MoveLightningAbility(20, 16, 1, 2.5, 5, Pal.surge));
