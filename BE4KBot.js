/** This is a sample code for your bot**/
var witActions = {
    merge(sessionId, witContext, entities, message, cb) {
        // here agenda is one of the entity set in wit 
        var agenda = firstEntityValue(entities, 'agenda');
        if (agenda) {
            witContext.res_date = new Date();
        }
        context.simpledb.roomleveldata.witContext = witContext;
        cb(witContext);
    },
    say(sessionId, witContext, message, cb) {
        context.console.log(message);
        // This will send bot response to end user
        context.sendResponse(message);
        cb();
    },
    error(sessionId, witContext, error) {
        context.console.log(error.message);
        // Pass error to end user.
        context.sendResponse(error.message);
    }
};

// Find specific entity from list of available entities from context.
var firstEntityValue = (entities, entity) => {
    const val = entities && entities[entity] &&
        Array.isArray(entities[entity]) &&
        entities[entity].length > 0 &&
        entities[entity][0].value;
    if (!val) {
        return null;
    }
    return typeof val === 'object' ? val.value : val;
};


/** This is a sample code for your bot**/
function MessageHandler(context, event) {
    var witToken = context.simpledb.botleveldata.config.witToken;
    var witClient = new Wit(witToken, witActions);
    // sessionId Should  be unique for each user. 
    var sessionId = event.contextobj.channeltype + event.contextobj.contextid;
    var witContext = {};
    witClient.runActions(sessionId, event.message, witContext, (e, context1) => {
        if (e) {
            console.log('Oops! Got an error: ' + e);
            return;
        }
        context.console.log('Yay, got Wit.ai response: ' + JSON.stringify(data));
        //context.sendResponse('No keyword found : '+event.message); 
    });
}

/** Functions declared below are required **/
function EventHandler(context, event) {
    if (!context.simpledb.botleveldata.numinstance)
        context.simpledb.botleveldata.numinstance = 0;
    numinstances = parseInt(context.simpledb.botleveldata.numinstance) + 1;
    context.simpledb.botleveldata.numinstance = numinstances;
    context.sendResponse("Thanks for adding me. You are:" + numinstances);
}

function HttpResponseHandler(context, event) {
    // if(event.geturl === "http://ip-api.com/json")
    context.sendResponse(event.getresp);
}

function DbGetHandler(context, event) {
    context.sendResponse("testdbput keyword was last get by:" + event.dbval);
}

function DbPutHandler(context, event) {
    context.sendResponse("testdbput keyword was last put by:" + event.dbval);
}
   					