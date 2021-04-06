public with sharing class ListViewController {
    
     @AuraEnabled 
   public static ListView getListViews(){
       return [SELECT Id, Name FROM ListView WHERE SobjectType = 'Claim__c' LIMIT 1].get(0);
    }
}