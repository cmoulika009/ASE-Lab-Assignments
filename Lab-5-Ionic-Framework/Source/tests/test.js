describe('EmployeeIndexCtrl',function() {
    beforeEach(module('directory'));
    
    var $controller;
    
    beforeEach(inject(function(_$controller_){
            $controller=_$controller_;
    }));
    describe('search',function (){
        it('Tests search function of my controller',function() {
            var $scope = {};
            var controller = $controller('EmployeeIndexCtrl', {$scope: $scope });
            var searchkey = '';
            var password = 'secret';
            expect(searchkey).toEqual('');  
          //  expect('hello').toEqual('Rakesh Reddy');
            
                   });
        });
    
    });