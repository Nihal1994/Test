public class CustomEventController {
    
     @Auraenabled
    public static List<CustomEvent__c> getCustomEvents(){
        List<CustomEvent__c> eve = [select Id,Name from CustomEvent__c order by CreatedDate asc];
        return eve;
    }

}