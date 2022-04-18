export function DetailGrunaliseCtrl($scope, $rootScope, DataService) {
    $scope.dataGruanali = DataService.getData();
    $scope.dataGruanali.fetch();
    $scope.data;
    
    $scope.getGridOptions = function () {
        return {
            dataSource: {
                data: DataService.getArrayAnalise(),
                schema:{
                    model: {
                        id: "ROWID",
                        fields: {
                        DESCANALI : { type: "string"},
                        MINIMO : { type: "string"},
                        MAXIMO : { type: "string"},
                        ABREVIACAO : { type: "string"},
                        NCOPIATEMP : { type: "number"},
                        PRECOANA : { type: "string"},
                        TIPORELAC : { type: "string"},
                        CONSTIPOANALI : { type: "number"}
                        }
                    }
                },
                filter : {field: "GRUANALI", operator: "eq", value: 0}
            },
            noRecords: {
                template: "Não tem dados no momento."
            },
            sortable: true,
            scrollable: false,
            columnMenu: {
                componentType: "modern",
            },
            columns: [
                { field: "ROWID", title:"ID" },
                { field: "DESCANALI", title:"Descrição" },
                { field: "MINIMO", title:"Minimo" },
                { field: "MAXIMO", title:"Maximo" },
                { field: "ABREVIACAO", title: "Abreviação" },
                { field: "NCOPIATEMP", title: "NCOPIATEMP" },
                { field: "PRECOANA", title: "PRECOANA" },
                { field: "TIPORELAC", title: "Tipo" },
                { field: "CONSTIPOANALI", title: "CONSTIPOANALI" }
            ]
        }
    };
    $scope.save = function(){
        const dataGruanali = $scope.dataGruanali.data();
        DataService.setOffineData(dataGruanali);
        $rootScope.$broadcast("changeData", dataGruanali);
    };
    $scope.$on("paramsId", (scope, id) => {
        $scope.$apply(()=>{
            $scope.data = $scope.dataGruanali.get(id);
            $scope.gridAnali.dataSource.filter({ field: "GRUANALI", operator: "eq", value: id })
        })
    });
}

DetailGrunaliseCtrl.$inject = ['$scope', '$rootScope', 'DataService'];