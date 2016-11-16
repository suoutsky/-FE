(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * 羊左.js
 * @yzDoc
 * 作者:刘瑶
 * 核心功能:任务序列,promise,数据缓存,请求归并,依赖注入,模板管理,事件总线
 */
(function (window, document, undefined) {
    'use strict';

    var yangzuo = window.yangzuo || (window.yangzuo = {});
    /**
     * 基础重置
     */
    var NODE_TYPE_ELEMENT = 1;

    var isArray = Array.isArray;
    var slice = [].slice;

    var toString = Object.prototype.toString;
    var Zepto = !!window["Zepto"]? window["Zepto"]:window["$"];
    if(!Zepto) throw "羊左.js需要依赖Zepto或者jQuery";

    function minErr(error) {
        console.log(error);
        throw error;
    }

    var element = Zepto;

    /**
     * 依赖注入服务
     */
    /**
     * 服务池
     */
    var factoryCache = {};
    var instanceCache = {};
    var INSTANTIATING = {};
    var path = [];

    var instanceInjector = createInternalInjector(instanceCache,BeanFactory);
    instanceCache.$injector = instanceInjector;
    var instanceCache = {
        $injector : instanceInjector;
    };

    function BeanFactory(serviceName) {
        if(!(serviceName in factoryCache)) minErr("依赖的服务:"+serviceName+"不存在");
        var factory = factoryCache[serviceName];
        var instance = Object.create(factory.prototype);
        var returnedValue = instanceInjector.invoke(factory, instance);
        return isObject(returnedValue) || isFunction(returnedValue) ? returnedValue : instance;
    }

    function annotate(fn) {
        var $inject;
        if (typeof fn === 'function') {
            if (!($inject = fn.$inject)) {
                $inject = [];
            }
        }else{
            $inject = [];
        }
        forEach($inject,function (item) {
            if(!isString(item)) minErr("$inject中的注解必须为字符串");
        });
        return $inject;
    }


    function createInternalInjector(cache, factory) {     // 绑定要做的 任务名

        function getService(serviceName) {
            if (cache.hasOwnProperty(serviceName)) {     // 去做任务 时看新任务单   已接任务单上是否 有任务名
                if (cache[serviceName] === INSTANTIATING) {
                    minErr("服务:"+serviceName+"创建时存在循环依赖");
                }
                return cache[serviceName];           // 有的话  使用新任务单上的  （新）
            } else {
                try {
                    path.unshift(serviceName);      // 如果没有  执行任务上新加服务名
                    cache[serviceName] = INSTANTIATING;
                    return cache[serviceName] = factory(serviceName);
                } catch (err) {
                    if (cache[serviceName] === INSTANTIATING) {
                        delete cache[serviceName];               //万一不小心 则  删除缓存中的 服务
                    }
                    throw err;
                } finally {
                    path.shift();   //开始执行任务单上任务 划掉第一个 任务
                }
            }
        }

        function invoke(fn, self, params) {
            if(!isFunction(fn)) minErr("invoke的对象必须为函数");
            var args = [],$inject = annotate(fn),length, i,key;

            for (i = 0, length = $inject.length; i < length; i++) {
                key = $inject[i];
                args.push(getService(key));
            }
            if(isArray(params)){
                forEach(params,function (param) {
                    args.push(param);
                })
            }else{
                args.push(params);
            }
            return fn.apply(self, args);
        }

        return {
            invoke: invoke,
            get: getService,
            annotate: annotate,
            has: function(name) {
                return factoryCache.hasOwnProperty(name) || cache.hasOwnProperty(name);
            }
        };
    }

    /**
     * 注入式调用
     * @name yangzuo.injectExecute
     * @param fn
     * @param params 业务参数
     * @param obj this指向
     * fn.$inject = ["service1","service2"]
     * fn(service1,service2,params)
     */
    function injectExecute(fn,params,obj){
        if(!isFunction(fn)) throw "fn必须为函数";
        return instanceInjector.invoke(fn,obj,params);
    }

    /**
     * @name yangzuo.service
     * 注册服务,如果注册的服务需要依赖其他服务,请在factory方法对象上增加属性$inject
     * 如:function Factory(s1,s2){}
     *   Factory.$inject = ["si","s2"]
     * 为了精简,服务池中的服务都是单例的,在注册时调用
     * @param serviceName
     * @param factory
     */
    function service(serviceName,factory){
        if(!isString(serviceName)) throw "服务名必须为字符串";
        if(!factory) throw "服务工厂不能为空";
        if(instanceInjector.has(serviceName)) throw serviceName+"重复注册";
        factoryCache[serviceName] = factory;
    }

    service("$browser",$BrowserService);
    $BrowserService.$inject = [];
    function $BrowserService(){
        var self = this,
            setTimeout = window.setTimeout,
            clearTimeout = window.clearTimeout,
            pendingDeferIds = {};

        self.isMock = false;

        var outstandingRequestCount = 0;
        var outstandingRequestCallbacks = [];

        function completeOutstandingRequest(fn) {
            try {
                fn.apply(null, sliceArgs(arguments, 1));
            } finally {
                outstandingRequestCount--;
                if (outstandingRequestCount === 0) {
                    while (outstandingRequestCallbacks.length) {
                        outstandingRequestCallbacks.pop()();
                    }
                }
            }
        }

        self.defer = function(fn, delay) {
            var timeoutId;
            outstandingRequestCount++;
            timeoutId = setTimeout(function() {
                delete pendingDeferIds[timeoutId];
                completeOutstandingRequest(fn);
            }, delay || 0);
            pendingDeferIds[timeoutId] = true;
            return timeoutId;
        };

        self.defer.cancel = function(deferId) {
            if (pendingDeferIds[deferId]) {
                delete pendingDeferIds[deferId];
                clearTimeout(deferId);
                completeOutstandingRequest(noop);
                return true;
            }
            return false;
        };
    }


    /**
     * 数据缓存服务
     */
    service("$cacheFactory",$cacheFactory);
    $cacheFactory.$inject = [];
    function $cacheFactory(){
        var caches = createMap();

        return {
            getCache:getCache
        };

        function getCache(cacheId) {
            if(cacheId in caches){
                return caches[cacheId];
            }else{
                return caches[cacheId] = new $Cache(cacheId,caches);
            }
        }
    }

    function $Cache(cacheId,caches){
        this.state = {size:0,cacheId:cacheId};
        this.data = {};
        this.caches = caches;
    }

    $Cache.prototype = {
        info: function() {
            return this.state;
        },
        destroy: function() {
            this.data = null;
            var cacheId = this.state.cacheId;
            this.state = null;
            delete this.caches[cacheId];
        },
        removeAll: function() {
            this.data = {};
            this.state.size = 0;
        },
        remove: function(key) {
            delete this.data[key];
            this.state.size--;
        },
        put: function(key, value) {
            if (isUndefined(value)) return;
            if (this.state.size > Number.MAX_VALUE-1){
                throw "缓存溢出";
            }
            if (!(key in this.data)) this.state.size++;
            this.data[key] = value;
            return value;
        },
        get: function(key) {
            return this.data[key];
        },
        has:function(key){
            return (key in this.data);
        }
    };



    //模板缓存服务
    service("$templateCache",$templateCache);
    $templateCache.$inject = ["$cacheFactory"];
    function $templateCache($cacheFactory){
        this.templateCache = $cacheFactory.getCache("$$templateCache");
        this.compile();//收罗页面的模板
    }

    $templateCache.prototype = {
        get:function(tid){
            if(this.templateCache.has(tid)){
                return this.templateCache.get(tid);
            }else{
                minErr("模板:"+tid+" 加载失败");
            }
        },
        removeAll: function() {
            this.templateCache.removeAll();
        },
        remove: function(tid) {
            this.templateCache.remove(tid);
        },
        has:function(tid){
            return this.templateCache.has(tid);
        },
        put:function(tid,html){
            this.templateCache.put(tid,html);
        },
        compile:function(){//当只有一个模板的时候会不会出问题
            var templates = element("script[type='text/html']");
            if(isArrayLike(templates)){
                forEach(templates,function(dom){
                    var $dom = element(dom);
                    var tid = $dom.attr("id");
                    if(!tid) return;
                    var html = $dom.html();
                    this.put(tid,html);
                },this);
            }
            templates.remove();
        }
    };

    service("$templateRequest",$templateRequest);
    $templateRequest.$inject = ["$templateCache","$q","$cacheFactory","$http"];
    function $templateRequest($templateCache,$q,$cacheFactory,$http){
        var templateHttpResultCache = $cacheFactory.getCache("$$templateHttpResultCache");

        function getTemplateForTemplateCache(url,tid){
            if(!!tid && !$templateCache.has(tid)) throw tid+"对应的模板为空";
            if(!!tid) return $templateCache.get(tid);

            if($templateCache.has(url)){
                return $templateCache.get(url);
            }else{
                throw url+"对应的模板为空";
            }
        }

        function loadTemplate(url,tid){
            if($templateCache.has(url) || !!tid && $templateCache.has(tid)){
                return $q.when(getTemplateForTemplateCache(url,tid));
            }
            var tpromise = $q.defer();
            if(templateHttpResultCache.has(url)){
                templateHttpResultCache.get(url).then(function () {
                    tpromise.resolve(getTemplateForTemplateCache(url,tid));
                },function(e){
                    tpromise.reject(e)
                })
            }else{
                templateHttpResultCache.put(url,tpromise.promise);
                $http.get(url).then(function(template){
                    $templateCache.put(url,template);
                    element("body").append('<div id="Template_Box" style="display: none;"></div>');
                    element("#Template_Box").html(template);
                    $templateCache.compile();
                    element("#Template_Box").remove();
                    tpromise.resolve(getTemplateForTemplateCache(url,tid));
                },function (e) {
                    tpromise.reject(e);
                });
            }
            return tpromise.promise;
        }
        return {
            loadTemplate:loadTemplate
        };
    }


    /**
     * 任务队列
     */
    service("$taskQueue",$taskQueue);
    $taskQueue.$inject=["$cacheFactory"];
    function $taskQueue($cacheFactory){
        var teskCache = $cacheFactory.getCache("$$taskFnMap");

        function registTask(teskId,teskFn){
            if(teskCache.has(teskId)){
                throw "任务"+teskId+"已经存在";
            }
            teskCache.put(teskId,teskFn);
        }
        /**
         * @yzDoc yangzuo.executeTaskQueue
         * [{teskId: 任务Id,resolve:fn,beforeFn:fn,afterFn:fn},...]
         * fn 是给 注册的任务注入参数用的,比如 有任务为teskFn(p1,p2,p3),那么 fn 返回result[]
         * @param {Array} teskList
         * @param {Function} beforeFn 队列前置函数.
         * @param {Function} afterFn 队列后置函数.
         */
        function executeTaskQueue(teskList,beforeFn,afterFn){
            if(!isArray(teskList)) minErr("队列参数必须为数组");
            var queue = new $$taskQueue();
            forEach(teskList,function(taskParams,index){
                if(!("id" in taskParams)) throw "任务队列中的对象必须存在Id";
                if(!teskCache.has(taskParams.id)) throw "任务:"+taskParams.id+"没有注册";
                var task = new $$task(teskCache.get(taskParams.id),queue,index);
                if(!!taskParams.resolve) task.setResolve(taskParams.resolve,taskParams.params);
                queue.pushTask(task);
            });
            !!beforeFn && queue.before(beforeFn);
            !!afterFn && queue.after(afterFn);
            queue.init();
            queue.run();
        }

        return {
            registTask:registTask,
            executeTaskQueue:executeTaskQueue
        }
    }

    function $$taskQueue(){
        this.taskList = [];
        this.currIndex = 0;
        this.prepareMap = createMap();
        this.beforeFn = null;
        this.afterFn = null;
    }
    $$taskQueue.prototype = {
        init:function(){
            //after整合到任务队列
            if(!!this.afterFn && isFunction(this.afterFn)){
                var after = new $$task(this.afterFn,this,this.taskList.length);
                this.taskList.push(after);
            }
        },
        run:function(){
            if(!!this.beforeFn && isFunction(this.beforeFn)) injectExecute(this.beforeFn);
            this.taskList.length>0 && this.taskList[0].call();
        },
        pushTask:function (task) {
            if(!(task instanceof $$task)){
                return;
            }
            this.taskList.push(task);
        },
        before:function (fn) {
            if(!isFunction(fn)) minErr("队列前置函数类型异常");
            this.beforeFn = fn;
        },
        after:function(fn){
            if(!isFunction(fn)) minErr("队列后置函数类型异常");
            this.afterFn = fn;
        },
        call:function(index){//当任务内部进入就绪状态时,告知队列可以调用
            this.prepareMap[index] = true;//标记该任务为就绪状态
            if(index!==this.currIndex){
                return;
            }
            if(!(index in this.prepareMap)){
                return;
            }
            this.taskList[index].run();
        },
        callNext:function () {
            this.currIndex++;
            if(this.currIndex>=this.taskList.length){
                return;
            }
            this.taskList[this.currIndex].call();
        }
    };

    function $$task(teskFn,$taskQueue,index){

        this.teskFn = teskFn;

        this.$taskQueue = $taskQueue;
        this.index = index;

        if(!isFunction(teskFn)) throw "任务的teskFn必须为函数";

        this.prs = null;
        this.data = null;
        this.error = false;
    }

    $$task.prototype = {
        setResolve:function(resolve,params){//执行数据准备
            this.prs = injectExecute(resolve,params);
            if(!isPromiseLike(this.prs)) throw "队列的resolve必须返回promiss对象";
            var _this = this;
            this.prs.then(function(result){
                _this.data = result;
                _this.$taskQueue.call(_this.index);//数据加载完成,告诉队列进行任务调用
            },function(e){
                console.log(e);
                _this.error = true;
                _this.data = [];
                _this.$taskQueue.call(_this.index);//当出现异常,放弃当前的任务,直接执行下一个任务
            })
        },
        call:function(){//队列发起重新调用指令
            if(!!this.prs && !this.data){//当数据未准备完成时,暂停当前的调用
                return;
            }
            this.$taskQueue.call(this.index);
        },
        run:function(){
            if(!this.error){
                try{
                    injectExecute(this.teskFn,this.data,this.teskFn);
                }catch(e){
                    console.log(e);
                }
            }
            this.$taskQueue.callNext();//当任务执行完成之后,通知队列调用下一个任务
        }
    };

    var taskQueue = instanceInjector.get("$taskQueue");

    /**
     * 事件总线,用于封闭代码之间的通信
     */
    service("$eventBus",$eventBus);
    $eventBus.$inject=["$cacheFactory","$browser"];
    function $eventBus($cacheFactory,$browser){
        var cache = $cacheFactory.getCache("$$eventMap");
        var singleEventName = {};

        function on(eventName,callback,isSingle){
            if(!isString(eventName)) throw "事件名称必须为字符串";
            if(!isFunction(callback)) throw "callback必须为函数";
            if(eventName in singleEventName) throw "事件"+eventName+"为单一监听事件,不能重复监听";
            if(isSingle){
                singleEventName[eventName] = true;
                cache.put(eventName,[callback]);
            }else{
                if(!cache.has(eventName)){
                    cache.put(eventName,[]);
                }
                cache.get(eventName).push(callback);
            }
        }

        function singleOn(eventName,callback){
            on(eventName,callback,true);
        }

        function post(eventName, event, obj) {
            if(!cache.has(eventName)) return;
            forEach(cache.get(eventName),function(callback){
                var _this = this;
                $browser.defer(function (){
                    try{
                        injectExecute(callback,event,_this);
                    }catch(e){
                        console.log(e);
                    }
                });
            },obj);
        }

        return {
            on:on,
            singleOn:singleOn,
            post:post
        }
    }
    var eventBus = instanceInjector.get("$eventBus");

    /**
     * 在这里你可以看到yangzuo所有的工具API
     * @param yangzuo
     */
    function publishExternalAPI(yangzuo) {
        extend(yangzuo, {
            'isString': isString,
            'isUndefined': isUndefined,
            'isFunction': isFunction,
            'isObject': isObject,
            'isNumber': isNumber,
            'element': Zepto,
            'extend': extend,
            'equals': equals,
            'noop': noop,
            'forEach': forEach,
            'bind': bind,
            'toJson': toJson,
            'fromJson': fromJson,
            'isElement': isElement,
            'isArray': isArray,
            'isDate': isDate,
            'lowercase': lowercase,
            'uppercase': uppercase,
            'injectExecute':injectExecute,
            'service':service,
            'post': bind(eventBus,eventBus.post),
            'on':bind(eventBus,eventBus.on),
            'singleOn':bind(eventBus,eventBus.singleOn),
            'registTask':bind(taskQueue,taskQueue.registTask),
            'executeTaskQueue':bind(taskQueue,taskQueue.executeTaskQueue)
        });
    }

    publishExternalAPI(yangzuo);

})(window, document);

},{}]},{},[1]);
