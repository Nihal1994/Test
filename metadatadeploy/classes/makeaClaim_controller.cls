public with sharing class  makeaClaim_controller  {
    
     @Auraenabled
    public static List<Account> getHousingcompanyrecords(){
        List<Account> acc = [select Id,Name from Account];
        return acc;
    }
    @Auraenabled
     public static List<Policy__c> getPolicyrecords(String Id){
        List<Policy__c> p = [select Id,Name from Policy__c where Account__c=:Id];
         System.debug('policy='+p);
        return p;
    }

    @AuraEnabled

 public static void saveClaim(String name, Date ndate,Date incident,String description,Id policy,Id householdAccount,String Tol)

    {
      Claim__c cl= new Claim__c();
        cl.Name=name;
        cl.Date_of_Incident__c=incident;
        cl.Description_of_Incident__c=description;
        cl.Policy__c=policy;
        cl.Type_of_Loss__c=Tol;
        cl.Notification_Date__c=ndate;
        cl.Account__c=householdAccount;
        Database.insert(cl,true);
    }
    @AuraEnabled 
   public static ListView getListViews(){
       return [SELECT Id, Name FROM ListView WHERE SobjectType = 'Claim__c' LIMIT 1].get(0);
    }
    
    @AuraEnabled
    public static string getRecordtypename(){
        List<RecordType> rec=[select id,name from RecordType where SobjectType = 'Claim__c' limit 1];
            String name = rec[0].name;
            return name;
    }
}