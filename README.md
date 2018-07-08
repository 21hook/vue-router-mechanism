# Vue Routers
> Design Patterns in Vue Routers

## Key Concepts
class inheritance, factory method pattern, delegation, 
history stack, path-route direct-address table, lifecycle hooks

## Mechanisms
Define a history inheritance to represent different types of histories;
Implement access/mutate methods of a hash/html5 by composing the methods 
of a window location history;
Encapsulate the creation of different types of histories into the constructor of
the VueRouter class;
Implement a match method to match a location produced by users with the location where
the component lies. Create a path & route direct-address table, which is used to 
match the location in the <router-link> component. 

## Table of Contents
1. [History inheritance](#demo1-history-inheritancesource)
2. [History delegation](#demo2-history-delegation-source)
3. [VueRouter-factory method pattern](#demo3-vuerouter-factory-method-pattern-source)
4. [Location matching](#demo4-location-matchingsource)
5. [Router lifecycle hooks](#demo5-router-lifecycle-hooks-source)

## Demo1: History inheritance([Source](https://github.com/21hook/vue-router-mechanism/tree/master/demo1/history))
Some sample SPA routes:
```
http://www.mysite.com/home#/header 
http://www.mysite.com/home/header  
<http://www.myste.com/home#/header>
```
All three types of histories hash a current page url, called base url (datatype)
The first one defines as a hash url with a base url,
the second one defines as a html5 url with a base one,
the last one defines as a abstract url with a base one, which is used in Node.js 
env to stimulate the location histories.


So, the class hierarchies of the location histories is:
```
                History
        ╱           |           ╲
AbstractHistory   HTML5History  HashHistory
```
## Demo2: History delegation: ([Source](https://github.com/21hook/vue-router-mechanism/tree/master/demo2/history))
The concrete classes of History class create an agent to manipulate the window location(the client).
Firs of all, initialize the window location in the constructor of the concrete classes - HashHistory or Html5History;
Then, add some stack operations to manipulate the history stack.

## Demo3: VueRouter-factory method pattern: ([Source](https://github.com/21hook/vue-router-mechanism/tree/master/demo3))
Use a factory method pattern to create VueRouter class, which encapsulates the creation of concrete History classes
for the client.

## Demo4: Location matching([Source](https://github.com/21hook/vue-router-mechanism/tree/master/demo4))
There are two input sources to mutate the active location history:
1. click the <router-link> component, which is linked to a new location;
2. the prev/next button to get the location in the location history stack

If the <router-link> component is clicked, push the location to the history stack, & transition to a new page. 
In detail, If the target location matches the location in the path-route direct-address table 
defined by users, then return the component & render it in the new page.
If the prev/next button is clicked, the handler of the popstate event is triggered. It gets a location history from 
the history stack. Again, it transitions to a new page.

## Demo5 Router lifecycle hooks: ([Source](https://github.com/21hook/vue-router-mechanism/tree/master/demo5/history))
Expose onReady interface to receive success or error callback to be called when the router is navigated.
A lifecycle hook is just that exposing a callback to be called when some state transition in the object is achieved.

## Router architecture
1. Init the matcher instance & bind the popState event
```       install the plugin                    setup the popstate  
     Vue --------------------> VueRouter ------------------------------>  HashHistory/Html5History 
     
                                                                                    |
                                             History <-------------------------------
                                                       transition to a new location 
     
```
2. Call the push method of a history object to push a new location

```                 push the current location into the history stack
    <router-link> ---------------------------------------------------> HashHistory/Html5History 
         
                                                                                    |
                                             History <-------------------------------
                                                       transition to a new location 
```

## License
MIT

## References
[1] 
[2]
[3]
