/**
 * Created by Tomas on 25-Jun-16.
 */
var gbsApp = angular.module("gbsApp",["ngResource","ngAnimate","ngSanitize","ngTouch", "ngRoute","ui.materialize","blockUI","ngCookies","ui.bootstrap","adminTableDirective","smart-table","ui.bootstrap-slider"]);
gbsApp.config(function($routeProvider,$locationProvider){
    $locationProvider.html5Mode(true);
    $routeProvider.when('/',{templateUrl: 'Views/Accounts/login.html',controller: 'loginController'}).
        when('/login-en',{templateUrl: 'Views/Accounts/login-en.html',controller: 'loginController'}).
        when('/login-fr',{templateUrl: 'Views/Accounts/login-fr.html',controller: 'loginController'}).
        when('/login-ar',{templateUrl: 'Views/Accounts/login-ar.html', controller: 'loginController'}).
        when('/login-de',{templateUrl: 'Views/Accounts/login-de.html',controller: 'loginController'}).
        when('/login-ru',{ templateUrl: 'Views/Accounts/login-ru.html',controller: 'loginController'}).
        when('/login-es', {templateUrl: 'Views/Accounts/login-es.html',controller: 'loginController'}).
        when('/login-gr',{ templateUrl: 'Views/Accounts/login-gr.html', controller: 'loginController'}).
        when('/login-it',{templateUrl: 'Views/Accounts/login-it.html',controller: 'loginController'}).
        when('/login-ja',{ templateUrl: 'Views/Accounts/login-ja.html', controller: 'loginController'}).
        when('/login-zh', {templateUrl: 'Views/Accounts/login-zh.html',controller: 'loginController'}).
        when('/login-pl',{templateUrl: 'Views/Accounts/login-pl.html',controller: 'loginController'}).
        when('/login-pt',{ templateUrl: 'Views/Accounts/login-pt.html',controller: 'loginController'}).
        when('/login-nr', {templateUrl: 'Views/Accounts/login-nr.html',controller: 'loginController'}).
        when('/login-tr',{ templateUrl: 'Views/Accounts/login-tr.html',controller: 'loginController'}).
        when('/ResetPassword', {templateUrl: 'Views/Accounts/forgot_password.html',controller: 'resetPasswordController'}).
        when('/resetPassword-en',{ templateUrl: 'Views/Accounts/forgot_password-en.html', controller: 'resetPasswordController'}).
        when('/resetPassword-fr',{templateUrl: 'Views/Accounts/forgot_password-fr.html',controller: 'resetPasswordController'}).
        when('/resetPassword-ar', {templateUrl: 'Views/Accounts/forgot_password-ar.html',controller: 'resetPasswordController'}).
        when('/resetPassword-de',{templateUrl: 'Views/Accounts/forgot_password-de.html',controller: 'resetPasswordController'}).
        when('/resetPassword-ru', {templateUrl: 'Views/Accounts/forgot_password-ru.html',controller: 'resetPasswordController'}).
        when('/resetPassword-tr', {templateUrl: 'Views/Accounts/forgot_password-tr.html',controller: 'resetPasswordController'}).
        when('/resetPassword-es',{templateUrl: 'Views/Accounts/forgot_password-es.html',controller: 'resetPasswordController'}).
        when('/resetPassword-gr', {templateUrl: 'Views/Accounts/forgot_password-gr.html',controller: 'resetPasswordController'}).
        when('/resetPassword-it',{ templateUrl: 'Views/Accounts/forgot_password-it.html',controller: 'resetPasswordController'}).
        when('/resetPassword-ja', {templateUrl: 'Views/Accounts/forgot_password-ja.html',controller: 'resetPasswordController'}).
        when('/resetPassword-zh',{templateUrl: 'Views/Accounts/forgot_password-zh.html',controller: 'resetPasswordController'}).
        when('/resetPassword-pl', { templateUrl: 'Views/Accounts/forgot_password-pl.html',controller: 'resetPasswordController'}).
        when('/resetPassword-nr',{templateUrl: 'Views/Accounts/forgot_password-nr.html',controller: 'resetPasswordController'}).
        when('/resetPassword-pt',{templateUrl: 'Views/Accounts/forgot_password-pt.html',controller: 'resetPasswordController'}).
        when('/home-en',{templateUrl: 'Views/PropertyHome/home-en.html',controller: 'dashboardController'}).
        when('/dashboard',{templateUrl: 'Views/Home/dashboard.html',controller: 'dashboardController'}).
        when('/dashboard-en',{templateUrl: 'Views/Home/dashboard-en.html',controller: 'dashboardController'}).
        when('/dashboard-ar',{templateUrl: 'Views/Home/dashboard-ar.html',controller: 'dashboardController'}).
        when('/dashboard-es',{templateUrl: 'Views/Home/dashboard-es.html',controller: 'dashboardController'}).
        when('/dashboard-de',{templateUrl: 'Views/Home/dashboard-de.html',controller: 'dashboardController'}).
        when('/dashboard-fr',{templateUrl: 'Views/Home/dashboard-fr.html',controller: 'dashboardController'}).
        when('/dashboard-gr',{templateUrl: 'Views/Home/dashboard-gr.html',controller: 'dashboardController'}).
        when('/dashboard-it',{templateUrl: 'Views/Home/dashboard-it.html',controller: 'dashboardController'}).
        when('/dashboard-ja',{templateUrl: 'Views/Home/dashboard-ja.html',controller: 'dashboardController'}).
        when('/dashboard-nr',{templateUrl: 'Views/Home/dashboard-nr.html',controller: 'dashboardController'}).
        when('/dashboard-pl',{templateUrl: 'Views/Home/dashboard-pl.html',controller: 'dashboardController'}).
        when('/dashboard-ru',{templateUrl: 'Views/Home/dashboard-ru.html',controller: 'dashboardController'}).
        when('/dashboard-pt',{templateUrl: 'Views/Home/dashboard-pt.html',controller: 'dashboardController'}).
        when('/dashboard-tr',{templateUrl: 'Views/Home/dashboard-tr.html',controller: 'dashboardController'}).
        when('/dashboard-zh',{templateUrl: 'Views/Home/dashboard-zh.html',controller: 'dashboardController'}).
        when('/SetPassword-en',{templateUrl: 'Views/ResetPassword/SetPassword-en.html',controller: 'resetPasswordController'}).
        when('/countries-en',{templateUrl:'Views/Maintenance/Countries/countries-en.html',controller:'countriesController'}).
        when('/countries-ar',{templateUrl:'Views/Maintenance/Countries/countries-ar.html',controller:'countriesController'}).
        when('/countries-es',{templateUrl:'Views/Maintenance/Countries/countries-es.html',controller:'countriesController'}).
        when('/countries-de',{templateUrl:'Views/Maintenance/Countries/countries-de.html',controller:'countriesController'}).
        when('/countries-fr',{templateUrl:'Views/Maintenance/Countries/countries-fr.html',controller:'countriesController'}).
        when('/countries-gr',{templateUrl:'Views/Maintenance/Countries/countries-gr.html',controller:'countriesController'}).
        when('/countries-it',{templateUrl:'Views/Maintenance/Countries/countries-it.html',controller:'countriesController'}).
        when('/countries-ja',{templateUrl:'Views/Maintenance/Countries/countries-ja.html',controller:'countriesController'}).
        when('/countries-nr',{templateUrl:'Views/Maintenance/Countries/countries-nr.html',controller:'countriesController'}).
        when('/countries-pl',{templateUrl:'Views/Maintenance/Countries/countries-pl.html',controller:'countriesController'}).
        when('/countries-ru',{templateUrl:'Views/Maintenance/Countries/countries-ru.html',controller:'countriesController'}).
        when('/countries-tr',{templateUrl:'Views/Maintenance/Countries/countries-tr.html',controller:'countriesController'}).
        when('/countries-zh',{templateUrl:'Views/Maintenance/Countries/countries-zh.html',controller:'countriesController'}).
        when('/countries-pt',{templateUrl:'Views/Maintenance/Countries/countries-pt.html',controller:'countriesController'}).
        when('/region-en',{templateUrl:'Views/Maintenance/Region/region-en.html',controller:'regionController'}).
        when('/useroperation-en',{templateUrl:'Views/Maintenance/UserOperation/useroperation-en.html',controller:'userOperationController'}).
        when('/parameter-en',{templateUrl:'Views/Maintenance/Parameters/parameter-en.html',controller:'parameterController'}).
        when('/authorization-en',{templateUrl:'Views/Maintenance/Authorization/authorization-en.html',controller:'authorizationController'}).
        when('/propertyInfo-en',{templateUrl:'Views/PropertyInfo/propertyInfo-en.html',controller:'propertyInformationController'}).
        when('/propertyFacilities-en',{templateUrl:'Views/PropertyFacilities/propertyFacilities-en.html',controller:'propertyFacilitiesController'}).
        when('/childrenPolicies-en',{templateUrl:'Views/Policies/childrenPolicies-en.html',controller:'childrenPoliciesController'}).
        when('/cancelationPolicy-en',{templateUrl:'Views/Policies/cancelationPolicy-en.html',controller:'cancelationPolicyController'}).
        when('/propertyPolicy-en',{templateUrl:'Views/Policies/propertyPolicy-en.html',controller:'propertyPolicyController'}).
        when('/propertyReviews-en',{templateUrl:'Views/Policies/propertyReviews-en.html',controller:'propertyReviewController'}).
        when('/propertyStatistics-en',{templateUrl:'Views/Policies/propertyStatistics-en.html',controller:'propertyStatisticsController'}).
        when('/hotelRateAvailability-en',{templateUrl:'Views/HotelRate&Availability/hotelRateAvailability-en.html',controller:'hotelRateAvailabilityController'}).
        when('/roomRateAvailability-en',{templateUrl:'Views/HotelRate&Availability/roomRateAvailability-en.html',controller:'roomRateAvailabilityController'}).
        when('/promotions-en',{templateUrl:'Views/Promotions/promotions-en.html',controller:'promotionController'}).
        when('/reservation-en',{templateUrl:'Views/Reservation/reservation-en.html',controller:'reservationController'}).
        when('/reservationDetails-en',{templateUrl:'Views/Reservation/reservationDetails-en.html',controller:'reservationDetailsController'}).
        when('/reservationHistory-en',{templateUrl:'Views/Reservation/reservationHistory-en.html',controller:'reservationHistoryController'}).
        when('/propertyPhotos-en',{templateUrl:'Views/PropertyPhotos/propertyPhotos-en.html',controller:'propertyPhotosController'}).
		//Balstechnology-AJ
        when('/room-en', { templateUrl: 'Views/Booking/room.html', controller: 'roomController' }).
        when('/addroom-en', { templateUrl: 'Views/Booking/addroom.html', controller: 'addroomController' }).
        when('/addonservice-en', { templateUrl: 'Views/Services/addonservice-en.html', controller: 'addonserviceController' }).
        when('/surrounding-en', { templateUrl: 'Views/Booking/surrounding.html', controller: 'surroundingController' }).
        when('/propertyCommission-en', { templateUrl: 'Views/Settings/propertyCommission-en.html', controller: 'propertyCommissionController' }).
        //BalsTechnology-SK   
        when('/invoices-en', { templateUrl: 'Views/Maintenance/Invoices/invoices-en.html', controller: 'invoiceController' }).
        when('/invoiceDetails-en', { templateUrl: 'Views/Maintenance/Invoices/invoiceDetails-en.html', controller: 'invoiceDetailsController' }).
        when('/monthlyRevenue-en', { templateUrl: 'Views/Maintenance/Invoices/monthlyRevenue-en.html', controller: 'monthlyRevenueController' }).
        when('/inboxmessages-en', { templateUrl: 'Views/Inbox/inboxmessages-en.html', controller: 'inboxmessagesController' }).
        when('/firmInformation-en', { templateUrl: 'Views/FirmInformation/firmInformation-en.html', controller: 'firmInformationController' }).
        when('/changePassword-en', { templateUrl: 'Views/Settings/changePassword-en.html', controller: 'changePasswordController' }).
        when('/systemSettings-en', { templateUrl: 'Views/Settings/systemSettings-en.html', controller: 'systemSettingsController' }).
        when('/reservationStatement-en', { templateUrl: 'Views/Reservation/reservationStatement-en.html', controller: 'reservationStatementController' });


});
/* Application Constants
 ======================================================*/
gbsApp.constant("appSettings", {
    //API_BASE_URL : 'http://localhost:50622/',
    API_BASE_URL: 'https://api.gbsextranet.com/',
    APPLICATION_VERSION: '1.0.0'

});

/* Notification Constants
 ======================================================*/
gbsApp.constant("Notify", {
    DATA_READY: "dataFactory::dataReady",
    ATTRIBUTE_DATA_READY: "dataFactory::attributeDataReady",
    ATTRIBUTE_WITH_FILTER_DATA_READY: "dataFactory::Attribute with filter data ready",
    SERVICE_AREA_CHANGED: "dataFactory::serviceAreaChanged",
    SERVICE_AREA_QUESTION_CHANGED: "dataFactory::serviceAreaQuestionSelectionChanged",
    LOGIN_SUCCESSFUL: "accountFactory::loginSuccessful",
    LOGIN_UNSUCCESSFUL: "accountFactory::loginUnSuccessful",
    LOGOUT_SUCCESSFUL: "accountFactory::logoutSuccessful",
    SECURITY_GROUPS_DATA_SUCCESSFUL:"authorizationFactory::authorizationDataSuccessfull",
    SECURITY_GROUPRIGHTS_DATA_SUCCESSFUL:"authorizationFactory::authorizationDataSuccessfull",
    EMAIL_SENT_SUCCESSFULLY:"accountFactory::emailSentSuccessful",
    EMAIL_NOT_SENT:"accountFactory::emailNotSent",
    UPDATE_PASSWORD_SUCCESSFULLY:"accountFactory::updatePasswordSuccessfully",
    UPDATE_PASSWORD_NOT_SET:"accountFactory::updatePasswordNotSent",
    PROPERTY_INFORMATION_DATA_SUCCESSFUL:"propertyInformationFactory::propertyInformationData",
    PROPERTY_FACILITY_DATA_SUCCESSFUL:"propertyFacilityFactory::propertyFacilityData",
    UNIT_DATA_PREPARATION_SUCCESSFUL:"dropdownFactory::unitDataPreparation",
    CHILDREN_POLICIES_DATA_SUCCESSFUL:"childrenPolicyFactory::childrenPolicyData",
    CHILD_UNIT_DATA_PREPARATION_SUCCESSFUL:"dropdownFactory::unitDataPreparation",
    CHILDREN_POLICY_SUMMARY_DATA_SUCCESSFUL:"childrenPolicyFactory::childrenPolicySummaryData",
    CHILDREN_POLICIES_DATA_UPDATED_SUCCESSFUL:"childrenPolicyFactory::childrenPolicyUpdatedData",
    PENALTY_RATE_DATA_PREPARATION_SUCCESSFUL:"cancellationPolicyFactory::cancellationPolicyData",
    PROPERTY_CANCELLATION_DATA_PREPARATION_SUCCESSFUL:"cancellationPolicyFactory::cancellationPolicyData",
    PROPERTY_POLICY_DATA_PREPARATION_SUCCESSFUL:"propertyPolicyFactory::propertyPolicyData",
    PROPERTY_POLICY_DATA_UPDATED_SUCCESSFUL:"propertyPolicyFactory::propertyUpdatedPolicyData",
    PRICE_UNIT_DROPDOWN_DATA_SUCCESSFULL:"dropDownFactory::priceUnitData",
    PROPERTY_POLICY_SUMMARY_DATA_PREPARATION_SUCCESSFUL:"summaryPolicyData",
    PROPERTY_REVIEW_DATA_PREPARATION_SUCCESSFUL:"reviewPolicyData",
    PROPERTY_REVIEW_INDIVIDUAL_DATA_PREPARATION_SUCCESSFUL:"reviewIndividualPolicyData",
    PROPERTY_STATISTICS_DAILY_DATA_SUCCESSFUL:"dailyData",
    PROPERTY_STATISTICS_MONTHLY_DATA_SUCCESSFUL:"monthlyData",
    PROPERTY_STATISTICS_YEARLY_DATA_SUCCESSFUL:"yearlyData",
    STATISTICS_YEAR_DROPDOWN_DATA_SUCCESSFULL:"statYears"
});
gbsApp.constant("Part",{
    Hotel:1,
    Transfer:2,
    Tour:3,
    Deal:4,
    Room:5,
    Basket:6,
    CancellationCharge : 7,
    CancellationDayOnArrival : 8
});
gbsApp.constant("LanguageType", {
    English: "en",
    Español:"es",
    Deutsch: "de",
    Français: "fr",
    Português:"pt",
    Ελληνικά:"gr",
    Русский:"ru",
    Italiano:"it",
    Japanese:"ja",
    Chinese:"zh",
    Türkçe:"tr",
    Polski:"pl",
    Arabian: "ar",
    Nederlands:"nr"
});
gbsApp.constant("ChildPolicyType", {
    Children:1,
    ExtraBed:2,
    ExistingBed:3
});
gbsApp.constant("SessionStore",{
    currentLanguage:"currentLanguage",
    currentView:"currentView",
    currentMenu:"currentMenu",
    userData:"userData",
    securityGroups:"securityGroups",
    selectedSecurityGroup:"selectedSecurityGroup",
    securityGroupRights:"securityGroupRights",
    units:"units",
    childrenPolicies:"childrenPolicies",
    allChildrenPolicies:"allChildrenPolicies",
    childUnits:"childUnits",
    ReservationID:"ReservationID"
});
gbsApp.constant("ViewType", {
    //Admin Menus
    Dashboard: 0,
    Country:1,
    Region: 2,
    UserOperation: 3,
    Parameter:4,
    Authorization:5,
    Tables:6,
    DailyStatistics:7,
    FindBestDeals:8,
    Emails:9,
    FirmRequests:10,
    UserMessages: 11,
    Messages:12,
    Reviews:13,

    //HotelAdmin Menus
    PropertyInformation:14,
    ChildrenPolicies:15,
    PropertyPolicies:16,
    PropertyConditions:17,
    CancellationPolicy:18,
    Statistics:19,
    PropertyReviews:20,
    ChannelManager:21,

    PropertyFacilities:22,
    Photos:23,
    PropertyRooms:24,
    PropertyPage: 25,
    Addonservices:40,

    HotelRateOverView:26,
    RateAndAvailability:27,
    Rate:28,
    Availability:29,
    PromotionMenu:30,
    Reservations:31,
	//BalsTechnology-SK   
    Invoice: 32,
    MonthlyRevenue: 33,
    ReservationStatement: 34,
    Inbox: 35,
    FirmInformation: 36,
    ChangePassword: 37,
    PropertyCommission: 38,
    SystemSettings: 39
});
gbsApp.constant("MenuType", {
    Dashboard:0,
    Maintenance: 1,
    Statistics:2,
    Communications: 3,
    Management: 4,
    Reservation:5,
    Property:6,
    Reservations:7,
    RateAvailability:8,
    PromotionMenu:9,
    Finance:10,
    Settings:11,
    WebsiteContent:12,
    ContactUs: 13,
    Inbox: 14
});