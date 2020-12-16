Events.on(ClientLoadEvent, () => { //thx Qmel
    try {
      var fx = Fx.greenLaserCharge ;
      var econ = new Effect.EffectContainer();
      var lt = fx.lifetime;
      var bd = new Dialog("");
      bd.setFillParent(false);
      //bd.addCloseButton();
      bd.clicked(() => {
          bd.hide();
      });

      bd.cont.table(cons(table => {
          var t = extend(Table, {
              draw(){
                  econ.set(Mathf.floorPositive(Mathf.randomSeed(Time.globalTime/lt, 0, 512)), Color.white, Time.globalTime % lt, lt, 0, this.x, this.y,null);
                  fx.renderer.get(econ);
              }
          });
          table.add(t).size(0);
      }));

      const rtfm = require("rtfm/library");
      const rtfmBuild = require("rtfm/build");

      rtfm.addSection("$block.title", {});
      rtfm.addSection("$unit.title", {});
      rtfm.addSection("$item.title", {});
      rtfm.addSection("$liquid.title", {});
      rtfm.addSection("$sector.title", {});
      rtfm.addSection("$planet.title", {});
      rtfm.addSection("$weather.title", {});
      rtfm.addSection("$block.mod.title", {});

      rtfm.addPage(Blocks.router.localizedName, [
          "random go brr",
          () => new Label(prov(() => Mathf.random(0, 10) + ""))
      ], rtfm.pages["$block.mod.title"]);//thx ilya

      rtfm.addPage("s p a c e", {
    		build(page) {
    			page.table.table(cons(t => {
    				t.button("[yellow]egg", Icon.trash, run(() => {
    					print("Execute router 66");
    				})).center().size(500, 40);
            t.labelWrap("no u \n");
            t.labelWrap("but yes");
    			})).size(4000);
    		}
    	}, rtfm.pages["$block.mod.title"]);

      const blockArr = Vars.content.blocks().toArray();
      const unitArr = Vars.content.units().toArray();
      const itemArr = Vars.content.items().toArray();
      const liquidArr = Vars.content.liquids().toArray();
      const sectorArr = Vars.content.sectors().toArray();
      const planetArr = Vars.content.planets().toArray();
      const weatherArr = Vars.content.getBy(ContentType.weather).toArray();

      const scanPage = function(objArr, bundleName){
          const vanilaSection = rtfm.addSection("$vanila.title", {}, rtfm.pages["$"+bundleName+".title"]);
          var once = false;

          for(var selectedContent of objArr){ //thx sk
              try{
                  var isMod = false;
                  var front = selectedContent;
                  if(front == null) break;
                  var starr = new Array();
                  var str = "";
                  var arr = Object.keys(front);
                  arr.sort();

                  for(var i=0; i<arr.length; i++){
                      if(arr[i] === "") continue;

                      try{
                          if((typeof front[arr[i]]) === "function") continue;

                          if(front[arr[i]] instanceof Effect){
                              starr.push(str);
                              starr.push([arr[i] + ": ", front[arr[i]]] + "");
                              str = "";
                          }else{
                              str += arr[i];
                              str += (front[arr[i]] == null)?(": [lightgray]null[]"):(front[arr[i]] instanceof Color)?(": [#" + front[arr[i]] + "]" + front[arr[i]] + "[]"):((typeof front[arr[i]]) === "object")?(": [coral]" + front[arr[i]] + "[]"):((typeof front[arr[i]]) === "number")?(": [sky]" + front[arr[i]] + "[]"):((typeof front[arr[i]]) === "boolean")?(": [stat]" + front[arr[i]] + "[]"):((typeof front[arr[i]]) === "undefined")?(": [darkgray]" + front[arr[i]] + "[]"):((typeof front[arr[i]]) === "string")?(": [green]" + front[arr[i]] + "[]"):(": [accent]" + front[arr[i]] + "[]");

                              if(i < arr.length - 1) str += "\n-";
                          }
                      }catch(ignored){}
                  }
                  starr.push(str);

                  if(selectedContent.minfo.mod != null){
                      isMod = true;
                      if(contentOwner != selectedContent.minfo.mod.meta.displayName) once = false;
                      if(!once){
                          var contentOwner = selectedContent.minfo.mod.meta.displayName;
                          var modSection = rtfm.addSection(selectedContent.minfo.mod.meta.displayName, {}, rtfm.pages["$"+bundleName+".title"]);
                          once = true;
                      }
                  }



                  var centered;

                  var addSection = (table, section, size) => {
                    const text = table.add("[stat]" + section).growX().center().padTop(16).get();
                    text.setAlignment(Align.center);
                    const textwidth = text.prefWidth;

                    /* Underline */
                    table.row();
                    table.image().color(Pal.stat).height(2 + 2 * size)
                      .width(textwidth).center().padBottom(16);
                  };

                  /* Add image in the format {texture[:size]} */
                  var addImage = (table, str) => {
                    const matched = str.match(/^([\w-]+)\s*:\s*(\d+)$/);
                    const name = matched ? matched[1] : str;
                    const region = Core.atlas.find(name);
                    const size = matched ? matched[2] : region.height;

                    const img = table.image(region).left().top()
                      .height(size).width(size * (region.width / region.height));
                    if (centered) {
                      img.center();
                    }
                  };

                  var textfunc = cell => {
                      cell.get().wrap = true;
                      if (centered) {
                          cell.center();
                          cell.get().alignment = Align.center;
                      }
                  };
                  if(isMod && selectedContent.minfo.mod != null){
                      var imagePreview = (objArr == weatherArr) ? "" : "" + ((objArr == itemArr) ? selectedContent.minfo.mod.meta.name + "-item-" : ((objArr == liquidArr) ? selectedContent.minfo.mod.meta.name + "-liquid-" : ((objArr == sectorArr) ? selectedContent.minfo.mod.meta.name + "-zone-" : ((objArr == planetArr) ? "-planet-" : "")))) + selectedContent.name + "";

                      rtfm.addPage(selectedContent.localizedName, {
                    		build(page) {
                          addImage(page.table, imagePreview);
                          addSection(page.table, selectedContent.localizedName, 1);
                          textfunc(page.table.add(""));

                          page.table.table(cons(t => {
                            for(var i = 0; i < starr.length; i++){
                                if(typeof starr[i] === "string") {
                                    t.add(starr[i]);
                                    t.row();
                                }
                                if(typeof starr[i] === "object") {
                                    t.table(cons(t1 => {
                                        t1.add(starr[i][0]+"");
                                        t1.button(starr[i][1]+"", Styles.logict, () => bd.show()).size(25).color(Pal.accent);
                                    }));
                                    t.row();
                                }
                            };
                          })).size(4000);
                        }
                      }, modSection);
                  }else{
                      var imagePreview = (objArr == weatherArr) ? "" : "" + ((objArr == itemArr) ? "item-" : ((objArr == liquidArr) ? "liquid-" : ((objArr == sectorArr) ? "testmod-zone-" : ((objArr == planetArr) ? "testmod-planet-" : "")))) + selectedContent.name + "";
           	          rtfm.addPage(selectedContent.localizedName, {
                    		build(page) {
                          addImage(page.table, imagePreview);
                          addSection(page.table, selectedContent.localizedName, 1);
                          textfunc(page.table.add(str));
                          //textfunc(page.table.add(str));

                          page.table.table(cons(t => {
                            for(var i = 0; i < starr.length; i++){
                                if(typeof starr[i] === "string") {
                                    t.add(starr[i]);
                                    t.row();
                                }
                                if(typeof starr[i] === "object") {
                                    t.table(cons(t1 => {
                                        t1.add(starr[i][0]+"");
                                        t1.button(starr[i][1]+"", Styles.logict, () => bd.show()).size(25).color(Pal.accent);
                                    }));
                                    t.row();
                                }
                            }
                          })).size(4000);
                        }
                      }, vanilaSection);
                  }
              }catch(errorrrr){
                  print(errorrrr);
                  continue;
              }
          }
      }

      scanPage(blockArr, "block");
      scanPage(unitArr, "unit");
      scanPage(itemArr, "item");
      scanPage(liquidArr, "liquid");
      scanPage(planetArr, "planet");
      scanPage(sectorArr, "sector");
      scanPage(weatherArr, "weather");


    } catch (e) {
      Log.warn("Please install [#00aaff]DeltaNedas/rtfm[], [#00aaff]Deltanedas/ui-lib[] to view scan pages.");
      print(e);
      print(e.trace);
    }

});
