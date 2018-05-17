import { autoinject, bindable, bindingMode } from "aurelia-framework";
import { fireEvent } from "../../common/events";

@autoinject
export class MdChip {
	constructor(private element: Element) { }

	@bindable
	mdClose: boolean | string = false;

	attached() {
		this.mdClose = this.getBooleanFromAttributeValue(this.mdClose);
	}

	close() {
		(<any>this.element.parentElement).removeChild(this.element);
		fireEvent(this.element, "close");
    }
    
    getBooleanFromAttributeValue(value: boolean | string) {
        return (value === true || value === "true");
    }
}
