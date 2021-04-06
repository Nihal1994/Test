public class Newsfeedcontroller {

    
    @Auraenabled
    public static List<Newsfeed__c> getnewsfeedrecords(){
        List<Newsfeed__c> info = [select Id,Name,Description__c, PublishedDate__c from Newsfeed__c order by PublishedDate__c desc];
        return info;
    }


}