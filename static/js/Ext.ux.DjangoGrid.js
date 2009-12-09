Ext.namespace('Ext.ux');

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
    },
});

