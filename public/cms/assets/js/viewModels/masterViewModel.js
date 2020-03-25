define(['knockout','jquery','sidebarViewModel'], function (ko, $, Sidebar) {
    function MasterViewModel(){
        var self = this;
        self.inited = ko.observable(false);
        self.sidebar = new Sidebar;
        window.requireViewModel = function(module, parent) {
            return function(callback) {
                require([module], function(mod) {
                    if (!parent[module]) {
                        parent[module] = new mod();
                    }
                    if (parent[module].init_page) parent[module].init_page();
                    callback(parent[module]);
                });
            };
        };
        $(document).ready(function(){
            $( "#sidebar__container" ).load( "/cms/pages/sidebar.html" );
           setTimeout(function(){
                self.inited(true);
           },1500);
        });
    }
    return new MasterViewModel();
});
