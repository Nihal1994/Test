public class InformationController {
    
    @Auraenabled
    public static List<Information__c> getinformationrecords(){
        List<Information__c> info = [select Id,Name, Description__c from Information__c];
        return info;
    }

}