import { analise } from "../models/DataAnalise.js";
import { data } from "../models/Data.js";

export function DataService(){
    function convertToArray(array){ return JSON.parse(array); }
    function convertToString(array){ return JSON.stringify(array); }
    const self = this;

    this.getData = function(){
        return new kendo.data.DataSource({
            data: this.getOffineData(),
            schema:{
              model: {
                id: "GRUANALI",
                fields: {
                  GRUANALI : { type: "number", editable: false, defaultValue: 0 },
                  DESCGRUANALI : { type: "string", validation: { required: true } },
                  STATUSGRUANALI :{ type: "string", validation: { required: true } },
                  TIPOGRUANALI : { type: "number", validation: { required: true } }
                }
              }
            },
            page: 1,
            pageSize: 10,
            change: function(e){
                const hasChange = this.hasChanges()
                if(hasChange){                    
                    const arrayData = this.data().toJSON();
                    self.setOffineData(arrayData) ;
                }
            }
        });
    };
    this.setOffineData = function(array){ 
        localStorage.setItem("offineData", convertToString(array)); 
    };
    this.getArrayAnalise = function(){
        return analise;
    };
    this.getArrayGruAnalis = function(){
        return data;
    };
    this.getOffineData = function(){
        const item = localStorage.getItem("offineData");
        return convertToArray(item) || [];
    };
}

DataService.$inject = [];