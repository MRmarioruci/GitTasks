define(['knockout', 'jquery','modal','charCount'], function (ko, $) {
	return new function sidebarViewModel() {
		var self = this;
		self.currentPage = ko.observable('Dashboard');
		self.user_name = ko.observable('');
		self.addRepositoryModal = ko.observable(null);
		self.deleteRepositoryModal = ko.observable(null);

		self.repositories = ko.observableArray([]);
		self.addRepo = function(){
			console.log('adding repo...');
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
				self.addRepositoryModal(null);
				self.getData();
			})
		}
		self.getData = function(){
			_getRepositories()
			.done(function(data){
				var tmp = $.map(data,function(repo){
					return new Repository(repo);
				})
				self.repositories(tmp);
				console.log(self.repositories());
			})
		}
		self.setCurrent = function(id){
			var repos = self.repositories();
			ko.utils.arrayFilter(repos,function(repo){
				if(repo.isCurrent()) repo.isCurrent(false);
				if(id == repo.id) repo.isCurrent(true);
			})
		}
		self.currentRepo = ko.computed(function(){
			var repos = self.repositories();
			var tmp = null;
			ko.utils.arrayFilter(repos,function(repo){
				if(repo.isCurrent()){
					tmp = repo;
				}
			})
			return tmp;
		})
		function Repository(data){
			var repo = this;
			repo.id = data.id;
			repo.name = ko.observable(data.name);
			repo.path = ko.observable(data.path);
			repo.color = ko.observable(data.color);
			repo.isCurrent = ko.observable(false);
			repo.showOptions = ko.observable(false);
			repo.toggleOptions = function(){
				repo.showOptions(!repo.showOptions());
			}
			repo.deleting = ko.observable(false);
			repo._delete = function(){
				self.deleteRepositoryModal(repo);
			}
			repo.deleteMe = function(){
				_deleteRepo(repo.id)
				.done(function(data){
					self.repositories.remove(repo);
					self.deleteRepositoryModal(null);
				})
			}
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
					if (data.code == 1) {
						d.resolve(data.data ? data.data : []);
					} else {
						d.reject();
					}
				}
			})
			return d;
		}
		function _getRepositories(){
			var d = $.Deferred();
			$.post('/getRepositories', {})
			.done(function (data) {
				if (data) {
					if (data.code == 1) {
						d.resolve(data.data ? data.data : []);
					} else {
						d.reject();
					}
				}
			})
			return d;
		}
		function _deleteRepo(id){
			var d = $.Deferred();
			$.post('/deleteRepo', {
				'id': id,
			})
			.done(function (data) {
				if (data) {
					if (data.code == 1) {
						d.resolve(data.data ? data.data : []);
					} else {
						d.reject();
					}
				}
			})
			return d;
		}
		self.getData();
	};
});