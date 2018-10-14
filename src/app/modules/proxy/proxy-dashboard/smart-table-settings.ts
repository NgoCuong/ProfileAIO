export const SETTINGS = {
    columns: {
        id: {
            title: 'ID',
            filter: false
        },
        server: {
            title: 'Server',
            filter: false
        },
        proxy: {
            title: 'Proxy',
            filter: false
        },
        region: {
            title: 'Region',
            filter: false
        },
    },
    hideSubHeader: true,
    actions: {
        add: false,
        edit: false,
        width: '5'
    },
    delete: {
        deleteButtonContent: '<strong>Destroy</strong>',
        confirmDelete: true
    },
    attr: {
        class: 'table table-bordered'
      },
    pager: {
        // display: false
    },
    // selectMode: 'multi',
};
