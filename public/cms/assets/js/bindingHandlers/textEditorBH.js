define(['knockout', 'ckeditor'], function (ko, ClassicEditor) {
    ko.bindingHandlers.textEditor = {
        init: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
            var val = ko.unwrap(valueAccessor());
            var editor = null;
           ClassicEditor
                .create(element, {
                    removePlugins: [],
                    toolbar: ['bold', 'italic', 'bulletedList', 'numberedList', 'blockQuote']
                })
                .then( e => {
                    if(val)e.setData(val);
                    e.model.document.on( 'change:data', (data) => {
                        valueAccessor()( e.getData() );
                    } )
                    editor = e;
                } )
                .catch(error => {
                    console.log(error);
                });

            valueAccessor().subscribe(function (newVal) {
                if (editor) {
                    if(editor.getData()!=newVal) editor.setData(newVal);
                }
            });
        },
        update: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
        }
    };
});
