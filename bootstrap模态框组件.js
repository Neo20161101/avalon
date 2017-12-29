// 组件：通用模态框
avalon.component('Ms-Modal', {
    template: '<div ms-attr="{id:##modal_id}" ms-class="##bs_example_modal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">' +
    '<div ms-class="##modal_document_size" class="modal-dialog" role="document">' +
    '<div class="modal-content">' +
    '<div class="modal-header"><slot name="header" /></div>' +
    '<div class="modal-body"><slot name="content" /></div>' +
    '<div class="modal-footer"><slot name="footer" /></div>' +
    '</div>' +
    '</div>' +
    '</div>',
    defaults: {
        bs_example_modal:"",
        modal_document_size:"",
        modal_id:""

    }
});