const electricFlareEntity = prov(() => extend(MechUnit, {}));
EntityMapping.nameMap.put("electricflare", electricFlareEntity);
const electricFlare = extendContent(UnitType, "electricflare", {});

electricMace.abilities.add(new MoveLightningAbility(20, 16, 1, 2, 3, Pal.surge));
