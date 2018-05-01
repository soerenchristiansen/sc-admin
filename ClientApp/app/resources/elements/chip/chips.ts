import { autoinject, bindable, bindingMode, customAttribute } from "aurelia-framework";
import { getLogger, Logger } from "aurelia-logging";
import * as $ from 'jquery';
import { fireEvent } from "../../common/events";

@customAttribute("md-chips")
@autoinject
export class MdChips {
	constructor(private element: Element) {
		this.log = getLogger("md-chips");

		this.onChipAdd = this.onChipAdd.bind(this);
		this.onChipDelete = this.onChipDelete.bind(this);
		this.onChipSelect = this.onChipSelect.bind(this);
	}

	log: Logger;

	@bindable
	autocompleteData: any = {};

	@bindable({ defaultBindingMode: bindingMode.twoWay })
	data: any[] = [];
	dataChanged(newValue: any[], oldValue: any[]) {
		this.refresh();

		// I know this is a bit naive..
		if (newValue.length > oldValue.length) {
			const chip = newValue.find(i => oldValue.indexOf(i) !== -1);
			fireEvent(this.element, "change", { source: "dataChanged", operation: "add", target: chip, data: newValue });
		}
		if (newValue.length < oldValue.length) {
			const chip = oldValue.find(i => oldValue.indexOf(i) !== -1);
			fireEvent(this.element, "change", { source: "dataChanged", operation: "delete", target: chip, data: newValue });
		}
	}

	@bindable
	placeholder: string = "";

	@bindable
	secondaryPlaceholder: string = "";

	attached() {
		this.refresh();
		$(this.element).on("chip.add", this.onChipAdd);
		$(this.element).on("chip.delete", this.onChipDelete);
		$(this.element).on("chip.select", this.onChipSelect);
	}

	detached() {
		$(this.element).off("chip.add", this.onChipAdd);
		$(this.element).off("chip.delete", this.onChipDelete);
		$(this.element).off("chip.select", this.onChipSelect);
	}

	refresh() {
		const options = {
			autocompleteOptions: {
				data: this.autocompleteData
			},
			data: this.data,
			placeholder: this.placeholder,
			secondaryPlaceholder: this.secondaryPlaceholder
		};
		(<any>$(this.element)).material_chip(options);
	}

	onChipAdd(e, chip) {
		this.data = (<any>$(this.element)).material_chip("data");
	}

	onChipDelete(e, chip) {
		this.data = (<any>$(this.element)).material_chip("data");
	}

	onChipSelect(e, chip) {
		fireEvent(this.element, "selected", { target: chip });
	}
}
