
angular.module('firstApp', []).controller('mainController', function () {
    // bind this to vm (view-model)
    var vm = this;

    vm.message = 'Hey there! It\'s time to kick ass and chew bubblegum!';    
    vm.comics = [
        { name: 'BloodShot', publisher: 'Valiant', year: 2014 },
        { name: 'Ninjak', publisher: 'Valiant', year: 2016 },
        { name: 'Eternal Warrior', publisher: 'Valiant', year: 2015 }
    ];
        
    
    vm.comicData = {};
    vm.addComputer = function(){
        vm.comics.push({
            name : vm.comicData.name,
            publisher: vm.comicData.publisher,
            year : vm.comicData.year
        });       
        vm.comicData = {}
    }
});