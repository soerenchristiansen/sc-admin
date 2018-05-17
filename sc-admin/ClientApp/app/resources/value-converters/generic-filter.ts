export class GenericFilterValueConverter {
    toView(array: any[], term: any) {
        if (!term) return array;

        let arrayOut = array.filter(arrayIn => {
            for (let col in arrayIn) {
                if (arrayIn.hasOwnProperty(col)) {
                    let propertyValue = (<any>arrayIn)[col];
                    if (typeof propertyValue === typeof term && propertyValue.toLowerCase().indexOf(term.toLowerCase()) !== -1) {
                        return true;
                    }
                }
            }
            return false;
        });

        return arrayOut;
    }
}