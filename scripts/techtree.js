const techtree = extend(TechTree, {
    load(){
        setup();

        root = node(coreShard, () => {

            node(conveyor, () => {

                node(junction, () => {
                    node(router, () => {
                        node(launchPad, () => {
                        });

                        node(distributor);
                        node(sorter, () => {
                            node(invertedSorter);
                            node(overflowGate, () => {
                                node(underflowGate);
                            });
                        });
                        node(container, () => {
                            node(unloader);
                            node(vault, () => {

                            });
                        });

                        node(itemBridge, () => {
                            node(titaniumConveyor, () => {
                                node(phaseConveyor, () => {
                                    node(massDriver, () => {

                                    });
                                });

                                node(payloadConveyor, () => {
                                    node(payloadRouter, () => {

                                    });
                                });

                                node(armoredConveyor, () => {
                                    node(plastaniumConveyor, () => {

                                    });
                                });
                            });
                        });
                    });
                });
            });

            node(coreFoundation, () => {
                node(coreNucleus, () => {

                });
            });

            node(mechanicalDrill, () => {

                node(mechanicalPump, () => {
                    node(conduit, () => {
                        node(liquidJunction, () => {
                            node(liquidRouter, () => {
                                node(liquidTank);

                                node(bridgeConduit);

                                node(pulseConduit, () => {
                                    node(phaseConduit, () => {

                                    });

                                    node(platedConduit, () => {

                                    });
                                });

                                node(rotaryPump, () => {
                                    node(thermalPump, () => {

                                    });
                                });
                            });
                        });
                    });
                });

                node(Items.coal, with(Items.lead, 3000), () => {
                    node(Items.graphite, with(Items.coal, 1000), () => {
                        node(illuminator, () => {
                        });

                        node(graphitePress, () => {
                            node(Items.titanium, with(Items.graphite, 6000, Items.copper, 10000, Items.lead, 10000), () => {
                                node(pneumaticDrill, () => {
                                    node(Items.sporePod, with(Items.coal, 5000, Items.graphite, 5000, Items.lead, 5000), () => {
                                        node(cultivator, () => {

                                        });
                                    });

                                    node(Items.thorium, with(Items.titanium, 10000, Items.lead, 15000, Items.copper, 30000), () => {
                                        node(laserDrill, () => {
                                            node(blastDrill, () => {

                                            });

                                            node(waterExtractor, () => {
                                                node(oilExtractor, () => {

                                                });
                                            });
                                        });
                                    });
                                });
                            });

                            node(Items.pyratite, with(Items.coal, 6000, Items.lead, 10000, Items.sand, 5000), () => {
                                node(pyratiteMixer, () => {
                                    node(Items.blastCompound, with(Items.pyratite, 3000, Items.sporePod, 3000), () => {
                                        node(blastMixer, () => {

                                        });
                                    });
                                });
                            });

                            node(Items.silicon, with(Items.coal, 4000, Items.sand, 4000), () => {
                                node(siliconSmelter, () => {

                                    node(Liquids.oil, with(Items.coal, 8000, Items.pyratite, 6000, Items.sand, 20000), () => {
                                        node(sporePress, () => {
                                            node(coalCentrifuge, () => {
                                                node(multiPress, () => {
                                                    node(siliconCrucible, () => {

                                                    });
                                                });
                                            });

                                            node(Items.plastanium, with(Items.titanium, 10000, Items.silicon, 10000), () => {
                                                node(plastaniumCompressor, () => {
                                                    node(Items.phasefabric, with(Items.thorium, 15000, Items.sand, 30000, Items.silicon, 5000), () => {
                                                        node(phaseWeaver, () => {

                                                        });
                                                    });
                                                });
                                            });
                                        });
                                    });

                                    node(Items.metaglass, with(Items.sand, 6000, Items.lead, 10000), () => {
                                        node(kiln, () => {
                                            node(incinerator, () => {
                                                node(Items.scrap, with(Items.copper, 20000, Items.sand, 10000), () => {
                                                    node(Liquids.slag, with(Items.scrap, 4000), () => {
                                                        node(melter, () => {
                                                            node(Items.surgealloy, with(Items.thorium, 20000, Items.silicon, 30000, Items.lead, 40000), () => {
                                                                node(surgeSmelter, () => {

                                                                });
                                                            });

                                                            node(separator, () => {
                                                                node(pulverizer, () => {
                                                                    node(disassembler, () => {

                                                                    });
                                                                });
                                                            });

                                                            node(Liquids.cryofluid, with(Items.titanium, 8000, Items.metaglass, 5000), () => {
                                                                node(cryofluidMixer, () => {

                                                                });
                                                            });
                                                        });
                                                    });
                                                });
                                            });
                                        });
                                    });

                                    node(microProcessor, () => {
                                        node(switchBlock, () => {
                                            node(message, () => {
                                                node(logicDisplay, () => {
                                                    node(largeLogicDisplay, () => {

                                                    });
                                                });

                                                node(memoryCell, () => {
                                                    node(memoryBank, () => {

                                                    });
                                                });
                                            });

                                            node(logicProcessor, () => {
                                                node(hyperProcessor, () => {

                                                });
                                            });
                                        });
                                    });
                                });
                            });
                        });
                    });


                    node(combustionGenerator, () => {
                        node(powerNode, () => {
                            node(powerNodeLarge, () => {
                                node(diode, () => {
                                    node(surgeTower, () => {

                                    });
                                });
                            });

                            node(battery, () => {
                                node(batteryLarge, () => {

                                });
                            });

                            node(mender, () => {
                                node(mendProjector, () => {
                                    node(forceProjector, () => {
                                        node(overdriveProjector, () => {
                                            node(overdriveDome, () => {

                                            });
                                        });
                                    });

                                    node(repairPoint, () => {

                                    });
                                });
                            });

                            node(steamGenerator, () => {
                                node(thermalGenerator, () => {
                                    node(differentialGenerator, () => {
                                        node(thoriumReactor, Seq.with(new Research(Liquids.cryofluid)), () => {
                                            node(impactReactor, () => {

                                            });

                                            node(rtgGenerator, () => {

                                            });
                                        });
                                    });
                                });
                            });

                            node(solarPanel, () => {
                                node(largeSolarPanel, () => {

                                });
                            });
                        });
                    });
                });
            });

            node(duo, () => {
                node(copperWall, () => {
                    node(copperWallLarge, () => {
                        node(titaniumWall, () => {
                            node(titaniumWallLarge);

                            node(door, () => {
                                node(doorLarge);
                            });
                            node(plastaniumWall, () => {
                                node(plastaniumWallLarge, () => {

                                });
                            });
                            node(thoriumWall, () => {
                                node(thoriumWallLarge);
                                node(surgeWall, () => {
                                    node(surgeWallLarge);
                                    node(phaseWall, () => {
                                        node(phaseWallLarge);
                                    });
                                });
                            });
                        });
                    });
                });

                node(scatter, () => {
                    node(hail, () => {

                        node(salvo, () => {
                            node(swarmer, () => {
                                node(cyclone, () => {
                                    node(spectre, () => {

                                    });
                                });
                            });

                            node(ripple, () => {
                                node(fuse, () => {

                                });
                            });
                        });
                    });
                });

                node(scorch, () => {
                    node(arc, () => {
                        node(wave, () => {
                            node(parallax, () => {
                                node(segment, () => {

                                });
                            });

                            node(tsunami, () => {

                            });
                        });

                        node(lancer, () => {
                            node(foreshadow, () => {
                                node(meltdown, () => {

                                });
                            });

                            node(shockMine, () => {

                            });
                        });
                    });
                });
            });

            node(groundFactory, () => {
                node(commandCenter, () => {

                });

                node(dagger, () => {
                    node(mace, () => {
                        node(fortress, () => {
                            node(scepter, () => {
                                node(reign, () => {

                                });
                            });
                        });
                    });

                    node(nova, () => {
                        node(pulsar, () => {
                            node(quasar, () => {
                                node(vela, () => {
                                    node(corvus, () => {

                                    });
                                });
                            });
                        });
                    });

                    node(crawler, () => {
                        node(atrax, () => {
                            node(spiroct, () => {
                                node(arkyid, () => {
                                    node(toxopid, () => {

                                    });
                                });
                            });
                        });
                    });
                });

                node(airFactory, () => {
                    node(flare, () => {
                        node(horizon, () => {
                            node(zenith, () => {
                                node(antumbra, () => {
                                    node(eclipse, () => {

                                    });
                                });
                            });
                        });

                        node(mono, () => {
                            node(poly, () => {
                                node(mega, () => {
                                    node(quad, () => {
                                        node(oct, () => {

                                        });
                                    });
                                });
                            });
                        });
                    });

                    node(navalFactory, () => {
                        node(risso, () => {
                            node(minke, () => {
                                node(bryde, () => {
                                    node(sei, () => {
                                        node(omura, () => {

                                        });
                                    });
                                });
                            });
                        });
                    });
                });

                node(additiveReconstructor, () => {
                    node(multiplicativeReconstructor, () => {
                        node(exponentialReconstructor, () => {
                            node(tetrativeReconstructor, () => {
                            });
                        });
                    });
                });
            });

            node(groundZero, () => {
                node(frozenForest, Seq.with(
                    new SectorComplete(groundZero),
                    new Research(junction),
                    new Research(router)
                ), () => {
                    node(craters, Seq.with(
                        new SectorComplete(frozenForest),
                        new Research(mender),
                        new Research(combustionGenerator)
                    ), () => {
                        node(ruinousShores, Seq.with(
                            new SectorComplete(craters),
                            new Research(graphitePress),
                            new Research(combustionGenerator),
                            new Research(kiln),
                            new Research(mechanicalPump)
                        ), () => {

                            node(tarFields, Seq.with(
                                new SectorComplete(ruinousShores),
                                new Research(coalCentrifuge),
                                new Research(conduit),
                                new Research(wave)
                            ), () => {
                                node(desolateRift, Seq.with(
                                    new SectorComplete(tarFields),
                                    new Research(thermalGenerator),
                                    new Research(thoriumReactor)
                                ), () => {

                                });
                            });

                            node(saltFlats, Seq.with(
                                new SectorComplete(ruinousShores),
                                new Research(groundFactory),
                                new Research(airFactory),
                                new Research(door),
                                new Research(waterExtractor)
                            ), () => {

                            });
                        });

                        node(overgrowth, Seq.with(
                            new SectorComplete(craters),
                            new SectorComplete(fungalPass),
                            new Research(cultivator),
                            new Research(sporePress),
                            new Research(UnitTypes.mace),
                            new Research(UnitTypes.flare)
                        ), () => {

                        });
                    });

                    node(stainedMountains, Seq.with(
                        new SectorComplete(frozenForest),
                        new Research(pneumaticDrill),
                        new Research(powerNode),
                        new Research(steamGenerator)
                    ), () => {
                        node(fungalPass, Seq.with(
                            new SectorComplete(stainedMountains),
                            new Research(groundFactory),
                            new Research(door),
                            new Research(siliconSmelter)
                        ), () => {
                            node(nuclearComplex, Seq.with(
                                new SectorComplete(fungalPass),
                                new Research(thermalGenerator),
                                new Research(laserDrill)
                            ), () => {

                            });
                        });
                    });
                });
            });
        });
    }
});