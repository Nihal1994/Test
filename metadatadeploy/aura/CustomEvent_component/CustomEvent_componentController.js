({
	doInit : function(component, event, helper) {
          
                                var action = component.get("c.getCustomEvents"); //Calling Apex class controller 'getinformationrecords' method

        action.setCallback(this, function(response) {
            var state = response.getState(); //Checking response status
            var result = JSON.stringify(response.getReturnValue());
            if (component.isValid() && state === "SUCCESS")
                component.set("v.event", response.getReturnValue());  // Adding values in Aura attribute variable.   
        });
        $A.enqueueAction(action);
                }
})