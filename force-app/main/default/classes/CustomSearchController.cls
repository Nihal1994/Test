public class CustomSearchController {
   
    @AuraEnabled
    public static List<SObjectResult> searchRecords(String searchText) {

        Set<String> obNameSet = new Set<String>();
        obNameSet.add('account');
        obNameSet.add('contact');

        
        String fieldStr = '';
        List<String> objNameList = new List<String>();
        List<SObjectResult> SObjectResultList = new List<SObjectResult>();
        Map<String, String> obFieldLabel = new Map<String, String>();
        Integer counter= 0;
        if(searchText.length() < 2){
           return SObjectResultList; 
        }
        
        //
        for(SobjectType objType : schema.getglobaldescribe().values()) {
            if(objType.getdescribe().issearchable() && objType.getdescribe().isAccessible() && (objType.getdescribe().isCustom() || obNameSet.contains(String.valueof(objType).toLowerCase())) ) {
                for(Schema.SObjectField dsr : objType.getdescribe().fields.getMap().values()) {
                    if(dsr.getdescribe().isNameField()) {
                        fieldStr = fieldStr+','+(String.valueof(objType))+'(Id,' + String.valueof(dsr)+')';
                        objNameList.add(String.valueof(objType));
                        obFieldLabel.put(String.valueof(objType), objType.getDescribe().getLabel()+'#'+dsr);
                        break;
                    }
                }
            }
        }
        
        String objName = fieldStr.removeStartIgnoreCase(',');
        List<List <sObject>> sobList =  search.query('find \'' + searchText + '*\' in all fields returning '+objName);
       
        
        for(Integer count = 0; count<objNameList.size(); count++ )
            if(sobList[count].size() > 0)
            	SObjectResultList.add( new SObjectResult( objNameList[count], sobList[count], obFieldLabel.get(objNameList[count]).split('#')[0], obFieldLabel.get(objNameList[count]).split('#')[1]));
        
        return SObjectResultList;
        
    }
    
    public class SObjectResult {
        @AuraEnabled
        public String objName;
        @AuraEnabled
        public String objLabel;
        @AuraEnabled
        public String fieldName;
        @AuraEnabled
        public List<sObject> soList;
        
        public SObJectResult(String objNameTemp, List<sObject> soLisTemp,String objLabelTemp,String fieldNameTemp) {
            objName = objNameTemp;
            soList = soLisTemp;
            objLabel = objLabelTemp;
            fieldName = fieldNameTemp;
        }
    }
}