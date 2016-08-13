import { applyMiddleware, createStore } from "redux";
const reducer = ( initialState=0, action) => {

}

const  logger = ( store ) => (next) => (action) =>{
	console.log("action fired", action);
}

const middleware = applyMiddleware(logger);

const store = createStore(reducer,1, middleware) 

store.subscribe(() => {
	console.log("store change", store.getState())
})

function todoApp(state = initialState,action){
	switch (action.type){
		case SET_VISBILITY_FILTER;
		 return Object.assign({}, state,{
		 	v
		 }) 
	}
}
is