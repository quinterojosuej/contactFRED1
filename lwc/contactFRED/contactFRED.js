import { LightningElement, track } from 'lwc';

import callFREDSeries from '@salesforce/apex/CallFREDAPI.callFREDSeries'; //
import callFREDSeriesObservations from '@salesforce/apex/CallFREDAPI.callFREDSeriesObservations'; //

export default class ContactFRED extends LightningElement {

    @track chooseCategory = 'defaul';
    @track chooseDate = 'defaul';
    @track outputtedValue = '';
    @track outputtedValue2 = '';

    get optionsCategory() {
        return [
            {label: '30 Year FHA Interest', value: 'OBMMIFHA30YF'}, ///OBMMIFHA30YF <-- the actual thing
            {label: '30-Year Fixed Rate Mortgage Average in the United States', value: 'MORTGAGE30US'},
            {label: 'Gross Domestic Product', value: 'GDP'},
        ];
    }

    get optionsDate() {
        return this.outputtedValue.map((val) => {
            return {label: val.date, value: val.value} ;
        })
    }

    handleDateChange(event) {
        console.log(event.detail.value);
        if(event.detail.value !== "."){
            this.outputtedValue2 = event.detail.value
        }
        else{
            this.outputtedValue2 = 'n/a'
        }
    }

    handleCategoryChange(event) {
        this.chooseCategory = event.detail.value;
        console.log(`the category changed: ${this.chooseCategory}`)

        this.outputtedValue = '';
        this.outputtedValue2 = '';

        this.makeRestCallout2();
    }

    // handleTestButton(event) {
    //     this.makeFREDCalloutSeries();
    // }

    async makeRestCallout2() {
        try{
            this.outputtedValue = await callFREDSeriesObservations({ seriesVal: this.chooseCategory });
            this.outputtedValue = JSON.parse(this.outputtedValue).observations;
            console.log(this.outputtedValue);
        }
        catch(e) {
            console.log(`failed error:`)
            console.log(e);
        }
    }

    // async makeFREDCalloutSeries() {
    //     try{
    //         let outputted = await callFREDSeries({seriesVal: "*"});
    //         console.log(`the test call for all series:`)
    //         console.log(JSON.parse(outputted));
    //     }
    //     catch(e){
    //         console.log(`attempt to get all series error:`)
    //         console.log(e);
    //     }
    // }

}

// js library for this: https://github.com/Rleahy22/fredApi

