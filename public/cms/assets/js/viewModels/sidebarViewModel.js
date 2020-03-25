define(['knockout', 'jquery','modal','charCount'], function (ko, $) {
	return function sidebarViewModel() {
		var self = this;
		self.currentPage = ko.observable('Dashboard');
		self.user_name = ko.observable('');
		self.addRepositoryModal = ko.observable(null);
		self.addRepo = function(){
			self.addRepositoryModal(self);
		}
		self.adding = ko.observable(false);
		self.newColor = ko.observable('#1abc9c');
		self.newName = ko.observable(null).extend({'charCount':{'maxCount':200}});
		self.newPath = ko.observable(null).extend({'charCount':{'maxCount':250}});
		self.repoColors = ["#1abc9c", "#2ecc71", "#3498db", "#9b59b6", "#E94149", "#16a085", "#27ae60", "#2980b9", "#8e44ad", "#2c3e50", "#f1c40f", "#e67e22", "#e74c3c", "#ecf0f1", "#95a5a6", "#f39c12", "#d35400", "#c0392b", "#bdc3c7", "#7f8c8d"];
		self.selectColor = function(color){
			self.newColor(color);
		}
		self.finaliseAddition = function(){
			self.adding(true);
			_addRepo()
			.done(function(data){
				self.update(data);
			})
		}
		self.setCurrentPage = function(page){
			self.currentPage(page);
		}
		function _addRepo(){
			var d = $.Deferred();
			$.post('/addRepo', {
				'name': self.newName(),
				'path': self.newPath(),
				'color': self.newColor(),
			})
			.done(function (data) {
				if (data) {
					if (data.status == 'ok') {
						d.resolve(data.data ? data.data : []);
					} else {
						d.reject();
					}
				}
			})
			return d;
		}
	};
});