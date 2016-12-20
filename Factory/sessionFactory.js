/**
 * Created by Tomas on 16-Jul-16.
 */
angular.module("gbsApp").factory("sessionFactory", function($cookies) {
    return{
        SetData:function(key,value){
            $cookies.remove(key);
            $cookies.put(key,value);
        },
        SetObject:function(key,data){
            $cookies.putObject(key, data)
        },
        GetData:function(key){
            return $cookies.get(key);
        },
        GetObject:function(key){
            return $cookies.getObject(key);
        },
        RemoveByKey:function(key){
            $cookies.remove(key);
        },
        Clear:function(){
            var cookies = $cookies.getAll();
            angular.forEach(cookies, function (v, k) {
                $cookies.remove(k);
            });
        }
    };
});