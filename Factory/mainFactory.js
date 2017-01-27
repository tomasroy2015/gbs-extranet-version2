/**
 * Created by Tomas on 07-Jul-16.
 */
angular.module("gbsApp").factory("mainFactory", function($location,sessionFactory,ViewType,accountFactory,SessionStore,MenuType) {
    var viewType;
    return{
        SetViewType:function(type){
            $location.search({});
            viewType = type;
            this.SetCurrentMenu(type);
            sessionFactory.RemoveByKey(SessionStore.currentView);
            sessionFactory.SetData(SessionStore.currentView,type);
            var currentUser = sessionFactory.GetObject(SessionStore.userData);
            //alert(type)
            //alert(ViewType.Invoice)
            if(type == ViewType.Dashboard){
                if(currentUser.IsHotelAdmin)
                    $location.path("home-"+sessionFactory.GetData(SessionStore.currentLanguage));
                else
                    $location.path("dashboard-"+sessionFactory.GetData(SessionStore.currentLanguage));
            }else if(type == ViewType.Country){
                $location.path("countries-"+sessionFactory.GetData(SessionStore.currentLanguage));
            }else if(type == ViewType.Region){
                $location.path("region-"+sessionFactory.GetData(SessionStore.currentLanguage));
            }else if(type == ViewType.UserOperation){
                $location.path("useroperation-"+sessionFactory.GetData(SessionStore.currentLanguage));
            }else if(type == ViewType.Parameter){
                $location.path("parameter-"+sessionFactory.GetData(SessionStore.currentLanguage));
            }else if(type == ViewType.Authorization){
                $location.path("authorization-"+sessionFactory.GetData(SessionStore.currentLanguage));
            }else if(type == ViewType.PropertyInformation){
                $location.path("propertyInfo-"+sessionFactory.GetData(SessionStore.currentLanguage));
            }else if(type == ViewType.PropertyFacilities){
                $location.path("propertyFacilities-"+sessionFactory.GetData(SessionStore.currentLanguage));
            }else if(type == ViewType.ChildrenPolicies){
                $location.path("childrenPolicies-"+sessionFactory.GetData(SessionStore.currentLanguage));
            }else if(type == ViewType.CancellationPolicy){
                $location.path("cancelationPolicy-"+sessionFactory.GetData(SessionStore.currentLanguage));
            }else if(type == ViewType.PropertyPolicies){
                $location.path("propertyPolicy-"+sessionFactory.GetData(SessionStore.currentLanguage));
            }else if(type == ViewType.PropertyReviews){
                $location.path("propertyReviews-"+sessionFactory.GetData(SessionStore.currentLanguage));
            }else if(type == ViewType.Statistics){
                $location.path("propertyStatistics-"+sessionFactory.GetData(SessionStore.currentLanguage));
            }else if(type == ViewType.HotelRateOverView){
                $location.path("hotelRateAvailability-"+sessionFactory.GetData(SessionStore.currentLanguage));
            }else if(type == ViewType.RateAndAvailability){
                $location.path("roomRateAvailability-"+sessionFactory.GetData(SessionStore.currentLanguage));
            }else if(type == ViewType.PromotionMenu){
                $location.path("promotions-"+sessionFactory.GetData(SessionStore.currentLanguage));
            }else if(type == ViewType.Reservations){
                $location.path("reservation-"+sessionFactory.GetData(SessionStore.currentLanguage));
            }else if(type == ViewType.Photos){
                $location.path("propertyPhotos-"+sessionFactory.GetData(SessionStore.currentLanguage));
            }
            //BalsTechnology-SK     
            else if (type == ViewType.Invoice) {
                $location.path("invoices-" + sessionFactory.GetData(SessionStore.currentLanguage));
            }
            else if (type == ViewType.MonthlyRevenue) {
                $location.path("monthlyRevenue-" + sessionFactory.GetData(SessionStore.currentLanguage));
            }
            else if (type == ViewType.ReservationStatement) {
                $location.path("reservationStatement-" + sessionFactory.GetData(SessionStore.currentLanguage));
            }
            else if (type == ViewType.Inbox) {
                $location.path("inboxmessages-" + sessionFactory.GetData(SessionStore.currentLanguage));
            }
            //Balstechnology-AJ
            else if (type == ViewType.PropertyRooms) {
                $location.path("room-" + sessionFactory.GetData(SessionStore.currentLanguage));
            }
        },
        SetCurrentMenu:function(type){
            sessionFactory.RemoveByKey(SessionStore.currentMenu);
            if(type > 0 && type < 7){
                sessionFactory.SetData(SessionStore.currentMenu,MenuType.Maintenance);
            }else if(type>13 && type<22){
                sessionFactory.SetData(SessionStore.currentMenu,MenuType.Property);
            }else if(type>21 && type<26){
                sessionFactory.SetData(SessionStore.currentMenu,MenuType.WebsiteContent);
            }else if(type>25 && type<30){
                sessionFactory.SetData(SessionStore.currentMenu,MenuType.RateAvailability);
            }else if(type == 30){
                sessionFactory.SetData(SessionStore.currentMenu,MenuType.PromotionMenu);
            }else if(type == 31){
                sessionFactory.SetData(SessionStore.currentMenu,MenuType.Reservations);
            }
            //BalsTechnology-SK   
            else if (type == 32 || type == 33 || type == 34) {
                sessionFactory.SetData(SessionStore.currentMenu, MenuType.Finance);
            }
            else if (type == 35) {
                sessionFactory.SetData(SessionStore.currentMenu, MenuType.Inbox);
            }
            else{
                sessionFactory.SetData(SessionStore.currentMenu,MenuType.Dashboard);
        }

        },
        GetCurrentMenu:function(){
           return  sessionFactory.GetData(SessionStore.currentMenu);
        },
        GetCurrentView:function(){
            return sessionFactory.GetData(SessionStore.currentView);
        }
    };
});