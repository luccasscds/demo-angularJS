export function MainCtrl($scope, $rootScope, DataService) {
  function isOfficeData(){
    const arrayData = DataService.getArrayGruAnalis();
    const length = DataService.getOffineData().length;
    if(!length){ DataService.setOffineData(arrayData); }
  }
  function getID(array){
    let big = 0;
    if($scope.grid){
      array.forEach( e => {
        let id = e.GRUANALI;
        if(big < id) big = id;
      })
      return big + 1;
    }

    return 0;
  }
  isOfficeData();

  $scope.dataGruanali = DataService.getData();
  $scope.dataGruanali.fetch();
  $scope.getGridOptions = function () {
    return {
      columns: [{
        field: "GRUANALI",
        title: "ID"
      },{
        field: "DESCGRUANALI",
        title: "Grupo de Análise"
      },{
        field: "STATUSGRUANALI",
        title: "Status"
      },{
        field: "TIPOGRUANALI",
        title: "Tipo"
      },{
        command: "destroy"
      }],
      dataSource: $scope.dataGruanali,
      selectable: true,
      pageable: {
        pageSize: 2
      },
      editable: {
        mode: "popup",
        confirmation: e => `Você tem certeza que deseja apagar ${e.DESCGRUANALI} ?`,
      },
      toolbar: [{ name: "create", text: "Adicionar Novo" }],
      sortable: true,
      change: function(e){
        const dataItem = this.dataItem(this.select())
        const id = dataItem.GRUANALI;
        $rootScope.$broadcast("paramsId", id);

        const eventCollapse = $('#splitter').data("kendoSplitter");
        eventCollapse.expand(".k-pane:last");
      },
      edit: function(e){
        if(e.model.isNew()){
          const datas = e.sender.dataSource.data();
          e.model.GRUANALI = getID(datas);
        }
      },
      //detailTemplate: kendo.template($("#template-analise").html()),
      detailInit: function(e){
        const detailRow = e.detailRow;
        
        detailRow.find(".grid-analises").kendoGrid({
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
            filter: { field: "GRUANALI", operator: "eq", value: e.data.GRUANALI }
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
          ],
        });

      }
    }
  };
  $scope.$on("changeData", (scope, dataGruanali) => {
    $scope.dataGruanali.data(dataGruanali);
  });

}

MainCtrl.$inject = ['$scope', '$rootScope','DataService'];