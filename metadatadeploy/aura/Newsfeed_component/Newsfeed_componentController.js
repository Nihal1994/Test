({
	doInit : function(component, event, helper) {
          
                                var action = component.get("c.getnewsfeedrecords"); //Calling Apex class controller 'getinformationrecords' method

        action.setCallback(this, function(response) {
            var state = response.getState(); //Checking response status
            var result = JSON.stringify(response.getReturnValue());
            if (component.isValid() && state === "SUCCESS")
                component.set("v.news", response.getReturnValue());  // Adding values in Aura attribute variable.   
        });
        $A.enqueueAction(action);
                },
    
       
  navigateToNewsFeed:function(component,event, helper){
  // it returns only first value of Id
  var newrec  = event.target.dataset.newid;;

  var sObectEvent = $A.get("e.force:navigateToSObject");
                sObectEvent.setParams({
                    "recordId": newrec,
                    "slideDevName": "detail"
                });
                sObectEvent.fire();
}
})