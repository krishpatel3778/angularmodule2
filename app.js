(function (){
  angular.module("ShoppingListCheckOff",[])
  .controller("ToBuyController",buyController)
  .controller("AlreadyBoughtController",boughtController)
  .service("ShoppingListCheckOffService",shoppingListService);
  buyController.$inject=["ShoppingListCheckOffService"];
  function buyController(ShoppingListCheckOffService){
    var buy= this;
    buy.itemName="";
    buy.itemQuantity="";
    buy.add=function (){
      ShoppingListCheckOffService.addItem(buy.itemName, buy.itemQuantity);
    }
    buy.removeItem=function (i){
      ShoppingListCheckOffService.removeBuyingItem(i);
    }
    buy.items=ShoppingListCheckOffService.getBuyingList();
    buy.moveToBought= function(i){
      ShoppingListCheckOffService.moveToBought(i);
    }
    buy.showMessage=function (){
      if(buy.items.length==0){
        return true;
      }else{
        return false;
      }
    }
  }
  boughtController.$inject=["ShoppingListCheckOffService"];
  function boughtController(ShoppingListCheckOffService){
    var bought=this;
    bought.items=ShoppingListCheckOffService.getBoughtList();
    bought.showMessage= function (){
      if(bought.items.length==0){
        return true
      }else{
        return false;
      }
    }
    bought.undo=function(i){
      ShoppingListCheckOffService.moveToBuy(i);
    }
  }
  function shoppingListService(){
    var service=this;
    var buyingList=[{name:"cookies", quantity:"10 bags"},{name:"cookies", quantity:"10 bags"}];
    var boughtList=[];
    service.getBuyingList= function (){
      return buyingList;
    }
    service.getBoughtList= function(){
      return boughtList;
    }
    service.moveToBought= function (i){
        boughtList.push(buyingList[i])
        service.removeBuyingItem(i);
    }
    service.moveToBuy= function(i){
      buyingList.push(boughtList[i]);
      service.removeBoughtItem(i);
    }
    service.addItem= function (itemName,itemQuantity){
      var item={
        name: itemName,
        quantity: itemQuantity,
      }
      buyingList.push(item);
    }
    service.removeBuyingItem= function(i){
      buyingList.splice(i,1);
    }
    service.removeBoughtItem= function(i){
      boughtList.splice(i,1);
    }
  }
})();
