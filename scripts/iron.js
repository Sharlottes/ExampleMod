const irons = new Item("iron", Color.valueOf("b0bac0"));
irons.cost = 2;
irons.hardness = 5;

const irons = extend(Item, {
	init() {
		this.super$init();
		routorio.research(this, "ubuntium-router");
	},

	researchRequirements: () => ItemStack.with(
		Items.silicon, 3000,
		Items.graphite, 7000,
		Items.titanium, 4500),

	color: Color.valueOf("#c3d6c7")
});