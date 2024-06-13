import { IValidateValues } from "../helpers/types.helper";

class AppValidator{
    public error: string | null = null;
    public validateValues: IValidateValues;

    constructor(validateValues: IValidateValues) {
        this.validateValues = validateValues;
    }

    private isRequired(value: any): boolean {
        return value.length ? true : false;
    }

    private isMinLength(value: any, length: number): boolean {
        return value >= length ? true : false;
    }

    public validate<T extends Record<string, any>>(reqObject: T) {
        const reqObjectKeys = Object.keys(reqObject);
        reqObjectKeys.forEach((key: string) => {
            let value = reqObject[key];
            if(this.validateValues.hasOwnProperty(key)) {
                if(this.validateValues[key].required && !this.isRequired(value)) {
                    this.error = this.validateValues[key].required?.[1] as string;
                }else if(this.validateValues[key].minLength && !this.isMinLength(value, this.validateValues[key].minLength![0])){
                    this.error = this.validateValues[key].minLength?.[1] as string;
                }
            }
        })
    }    
}
  
export default AppValidator;
