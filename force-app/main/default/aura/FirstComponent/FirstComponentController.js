({
	fireGlobal: function (cmp, event, helper) {
        var createRecordEvent = $A.get("e.force:createRecord");
        createRecordEvent.setParams({
            "entityApiName": "Claim__c"
        });
        createRecordEvent.fire();
        
    /*var actionAPI = cmp.find("quickActionAPI");

    var args = { actionName: "Newclaimrecord" };
    actionAPI.invokeAction(args);*/
}, 
    closeModal:function(component,event,helper){    
        var cmpTarget = component.find('Modalbox');
        var cmpBack = component.find('Modalbackdrop');
        $A.util.removeClass(cmpBack,'slds-backdrop--open');
        $A.util.removeClass(cmpTarget, 'slds-fade-in-open'); 
    },
    
   

    openmodal: function(component,event,helper) {
        var cmpTarget = component.find('Modalbox');
        var cmpBack = component.find('Modalbackdrop');
        $A.util.addClass(cmpTarget, 'slds-fade-in-open');
        $A.util.addClass(cmpBack, 'slds-backdrop--open'); 
    },
    gotoList : function (component, event, helper) {
    var action = component.get("c.getListViews");
    action.setCallback(this, function(response){
        var state = response.getState();
        console.log('clicked');
        if (state === "SUCCESS") {
            var listviews = response.getReturnValue();
            var navEvent = $A.get("e.force:navigateToList");
            navEvent.setParams({
                "listViewId": listviews.Id,
                "listViewName": null,
                "scope": "Claim__c"
            });
            navEvent.fire();
        }
    });
    $A.enqueueAction(action);
},
    doInit : function(component, event, helper) {
       
      //component.find("select2").set("v.disabled", true);
      
      var action = component.get("c.getHousingcompanyrecords"); //Calling Apex class controller 'getHousingcompanyrecords' method
      
        action.setCallback(this, function(response) {
            var state = response.getState(); //Checking response status
            var result = JSON.stringify(response.getReturnValue());
            
            if (component.isValid() && state === "SUCCESS")
               component.set("v.acc", response.getReturnValue());  // Adding values in Aura attribute variable.   
        });
        //component.find("select2").set("v.disabled",true);
        
        $A.enqueueAction(action);
                },
    
    onChange:function(component,event, helper){
        var selectedValue=component.find("select").get("v.value"); 
        if(selectedValue=="none"){ 
            component.set("v.isDisabled",true);
            
        }
        else{
            component.set("v.isDisabled",false);
        }
        
        console.log(component.get("v.selectedValue"));
        console.log(component.find("select").get("v.selectedValue"));
        
        console.log(component.get("v.isDisabled"));
        console.log(selectedValue);
        component.set("v.type2", selectedValue);
        console.log(component.get("v.type2"));
        var action = component.get("c.getPolicyrecords");
        action.setParams({Id :selectedValue});
        action.setCallback(this, function(response) {
            var state = response.getState(); //Checking response status
            var result = JSON.stringify(response.getReturnValue());
            console.log(result);
            
            if (component.isValid() && state === "SUCCESS")
               component.set("v.pol", response.getReturnValue());  // Adding values in Aura attribute variable.   
        });
        
        
        $A.enqueueAction(action);
                },
    
    redirect: function (){
            var url = window.location.href; 
            var value = url.substr(0,url.lastIndexOf('/') + 1);
            window.history.back();
            return false;

    },
        onChange2:function(component,event, helper){
             var selectedOptionValue = event.getParam("value");
            console.log("selectedOptionValue="+selectedOptionValue);
             component.set("v.type", selectedOptionValue);
            console.log(component.get("v.type"));
},
          onChange1:function(component,event, helper){
              console.log("test");
              console.log("Hello");
            var selectedOptionValue = component.get("v.selectedVal");
             //var selectedOptionValue2 = component.get("v.selectedVal"); 
              console.log("selectedOptionValue="+selectedOptionValue);
             component.set("v.type1", selectedOptionValue);
              console.log(component.get("v.type1"));
          },
    gotoClaimpage:function(component,event, helper){
        console.log("test");
    var name=component.get("v.name");
    var ndate=component.get("v.NotificationDate");
    var policy=component.get("v.type1");
    var incidate=component.get("v.DateofIncident");
    var description=component.get("v.Description");
    var tol=component.get("v.type");
    var acc=component.get("v.type2");
        console.log("account="+acc);
    
        
    
     var action = component.get("c.saveClaim");
        console.log("Hello");
         action.setParams({
           name : name, 
           ndate : ndate,
           incident : incidate,
           description:description,
           policy:policy,
           householdAccount:acc,
           Tol:tol
    
            }); 
        console.log("Hello");
        console.log("name="+name);
        console.log("ndate="+ndate);
        console.log("incident="+incidate);
        console.log("description="+description);
        console.log("tol="+tol);
        console.log("acc="+acc);
        console.log("policy="+policy);
          action.setCallback(this,function(response){
              console.log("Hello");
          var state = response.getState();
          if(state === "SUCCESS")
         {
             console.log("Hello");
             //helper.showToast('Success !', 'Record Inserted Successfully', 'success');
             var action2 = component.get("c.getListViews");
            action2.setCallback(this, function(response){
            var state2 = response.getState();
            console.log('clicked');
             if (state2 === "SUCCESS") {
                 console.log("Hello");
                    var listviews = response.getReturnValue();
                    var navEvent = $A.get("e.force:navigateToList");
                    navEvent.setParams({
                "listViewId": listviews.Id,
                "listViewName": null,
                "scope": "Claim__c"
            });
            navEvent.fire();
        }
    });
    $A.enqueueAction(action2);
         }else if(state == "ERROR"){
                        var errors = response.getError();                       
                            //component.set("v.showErrors",true);
                            //component.set("v.errorMessage",errors[0].message);
                           console.log("error="+errors[0].message);
                    }
         });
           $A.enqueueAction(action);
       
   
    }
})