Ext.namespace('Ext.ux');

function defaultRowEditFormBuilder(url, data) {
    if("function" == typeof(url))
        url = url(data);

    var form = new Ext.ux.DjangoForm({url:url, callback:function(){}});
    form.on('submitSuccess', function () {
        form.destroy();
    });
    return form;
}

Ext.ux.DjangoGrid = Ext.extend(Ext.ux.AutoGrid, {

    constructStore: function(url, pageSize) {
      return new Ext.data.Store({
          proxy: new Ext.data.HttpProxy({url: url}),
          reader: new Ext.data.JsonReader(),
          remoteSort: true,
          baseParams: {limit: pageSize},
      });
    },

    constructPager: function(store, pageSize) {
      return new Ext.PagingToolbar({
          store: store,
          pageSize: pageSize,
          displayInfo: true,
          emptyMsg: 'Nothing to display'
      });
    },

    constructor: function(config) {
      var store = this.constructStore(config.url, config.pageSize);
      var pager = this.constructPager(store, config.pageSize);

      config = Ext.apply({
          store: store,
          pager: pager,
      }, config);

      config.store.load();

      config = Ext.apply({
          bbar: config.pager,
          selModel: new Ext.grid.RowSelectionModel({singleSelect:true}),
          enableColLock:false,
          loadMask: true,
          autoHeight: true,
          autoWidth: true,
      }, config);

      Ext.ux.DjangoGrid.superclass.constructor.call(this, config);

      pager.on("change", function () { config.selModel.clearSelections(); });
    },

    rowFormUrl: function(rowData /* opt */) {
        if(undefined == rowData)
            rowData = this.getSelected();

        // return url for selected row
        return this.url + '/' + rowData.id + '/edit';
    },

    rowEditForm: function(rowData /* opt */, formBuilder /* opt */) {
        if(undefined == rowData)
            rowData = this.getSelected();
        if(undefined == formBuilder)
            formBuilder = defaultRowEditFormBuilder

        var form = formBuilder(this.rowFormUrl(rowData), rowData);
        form.on('submitSuccess', function() {
            this.store.reload();
        });
        return form;
    },

});
