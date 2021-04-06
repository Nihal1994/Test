({
	 doInit : function(component, event, helper) {
          
                                var action = component.get("c.getinformationrecords"); //Calling Apex class controller 'getinformationrecords' method

        action.setCallback(this, function(response) {
            var state = response.getState(); //Checking response status
            var result = JSON.stringify(response.getReturnValue());
            if (component.isValid() && state === "SUCCESS")
                component.set("v.info", response.getReturnValue());  // Adding values in Aura attribute variable.   
        });
        $A.enqueueAction(action);
                },
    
       
  navigateToInformation:function(component,event, helper){
  // it returns only first value of Id
  var Inforec  = event.target.dataset.infoid;;

  var sObectEvent = $A.get("e.force:navigateToSObject");
                sObectEvent.setParams({
                    "recordId": Inforec,
                    "slideDevName": "detail"
                });
                sObectEvent.fire();
}
		
	
})