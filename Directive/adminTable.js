'use strict';

/**
 * @ngdoc directive
 * @name adminTableDirective
 * @description
 * # adminTableDirective
 */

var $templateUrl  = 'adminTable.html';

var $dictionary   = {
    'en': {
        'ROW': 'row',
        'ROWS': 'rows',
        'SHOWING': 'Showing',
        'TOTAL': 'Total',

        'EDIT': 'Edit',
        'DELETE': 'Delete',
        'SAVE': 'Save',
        'CANCEL': 'Cancel',
        'NEW': 'New',
        'FILTER': 'Filter Data',
        'SUBMIT': 'Submit', 
        'APPLY': 'Apply',

        'CHECK_ALL_ROWS': 'Check all rows',
        'CHECK_THIS_ROW': 'Check this row',

        'SORT_BY_ASC': 'Sort By {{label}} ASC',
        'SORT_BY_DESC': 'Sort By {{label}} DESC',

        'GO_TO_PAGE': 'Go to page',
        'CURRENT_PAGE': 'Page',
        'SHOW_NUM_ROWS_PER_PAGE': 'Show {{numRows}} rows per page',

        'ERROR_REQUIRED': '{{label}} is required and must be valid.',
        'ERROR_EMAIL': '{{label}} is not valid email',
        'ERROR_MIN': '{{label}} must be greater than {{min}}',
        'ERROR_MAX': '{{label}} must be smaller than {{max}}',
        'ERROR_MIN_LENGTH': '{{label}} must contain at least {{minlength}} characters',
        'ERROR_MAX_LENGTH': '{{label}} must contain at most {{maxlength}} characters',

        'SELECT': 'Select',
        'SELECT_CONDITION': 'Select condition',
        'SELECT_CONDITION_FIRST': 'Select filter condition first',
        'FILTER_EQUAL': 'Equal',
        'FILTER_LESS': 'Less than',
        'FILTER_MORE': 'More than',
        'FILTER_BETWEEN': 'Between',
        'FILTER_MATCH': 'Match exactly', 
        'FILTER_SEARCH': 'Search like',
        'FILTER_MULTI_SELECT': 'Select multi options',
        'FILTER_SINGLE_SELECT': 'Select only one option',

        'NO_RECORDS_FOUND': 'No records',
        'SELECT_LANGUAGE': 'Select language',

        'VIEW_AS_TABLE': 'Table view',
        'VIEW_AS_GRID': 'Grid view',
        'DRAG_DROP_TO_REORDER': 'Drag and drop to re-order columns',
        'HIDE_COLUMNS': 'Hide columns',
    },
    'hi': {
        'ROW': 'row',
        'ROWS': 'rows',
        'SHOWING': 'Showing',
        'TOTAL': 'Total',

        'EDIT': 'Edit',
        'DELETE': 'Delete',
        'SAVE': 'Save',
        'CANCEL': 'Cancel',
        'NEW': 'New',
        'FILTER': 'Filter Data',
        'SUBMIT': 'Submit', 
        'APPLY': 'Apply',

        'CHECK_ALL_ROWS': 'Check all rows',
        'CHECK_THIS_ROW': 'Check this row',

        'SORT_BY_ASC': 'Sort By {{label}} ASC',
        'SORT_BY_DESC': 'Sort By {{label}} DESC',

        'GO_TO_PAGE': 'Go to page',
        'CURRENT_PAGE': 'Page',
        'SHOW_NUM_ROWS_PER_PAGE': 'Show {{numRows}} rows per page',

        'ERROR_REQUIRED': '{{label}} is required and must be valid.',
        'ERROR_EMAIL': '{{label}} is not valid email',
        'ERROR_MIN': '{{label}} must be greater than {{min}}',
        'ERROR_MAX': '{{label}} must be smaller than {{max}}',
        'ERROR_MIN_LENGTH': '{{label}} must contain at least {{minlength}} characters',
        'ERROR_MAX_LENGTH': '{{label}} must contain at most {{maxlength}} characters',

        'SELECT': 'Select',
        'SELECT_CONDITION': 'Select condition',
        'SELECT_CONDITION_FIRST': 'Select filter condition first',
        'FILTER_EQUAL': 'Equal',
        'FILTER_LESS': 'Less than',
        'FILTER_MORE': 'More than',
        'FILTER_BETWEEN': 'Between',
        'FILTER_MATCH': 'Match exactly', 
        'FILTER_SEARCH': 'Search like',
        'FILTER_MULTI_SELECT': 'Select multi options',
        'FILTER_SINGLE_SELECT': 'Select only one option',

        'NO_RECORDS_FOUND': 'No records',
        'SELECT_LANGUAGE': 'Select language',

        'VIEW_AS_TABLE': 'Table view',
        'VIEW_AS_GRID': 'Grid view',
        'DRAG_DROP_TO_REORDER': 'Drag and drop to re-order columns',
        'HIDE_COLUMNS': 'Hide columns',
    },
    'tr': {
        'ROW': 'row',
        'ROWS': 'rows',
        'SHOWING': 'Showing',
        'TOTAL': 'Total',

        'EDIT': 'Edit',
        'DELETE': 'Delete',
        'SAVE': 'Save',
        'CANCEL': 'Cancel',
        'NEW': 'New',
        'FILTER': 'Filter Data',
        'SUBMIT': 'Submit', 
        'APPLY': 'Apply',

        'CHECK_ALL_ROWS': 'Check all rows',
        'CHECK_THIS_ROW': 'Check this row',

        'SORT_BY_ASC': 'Sort By {{label}} ASC',
        'SORT_BY_DESC': 'Sort By {{label}} DESC',

        'GO_TO_PAGE': 'Go to page',
        'CURRENT_PAGE': 'Page',
        'SHOW_NUM_ROWS_PER_PAGE': 'Show {{numRows}} rows per page',

        'ERROR_REQUIRED': '{{label}} is required and must be valid.',
        'ERROR_EMAIL': '{{label}} is not valid email',
        'ERROR_MIN': '{{label}} must be greater than {{min}}',
        'ERROR_MAX': '{{label}} must be smaller than {{max}}',
        'ERROR_MIN_LENGTH': '{{label}} must contain at least {{minlength}} characters',
        'ERROR_MAX_LENGTH': '{{label}} must contain at most {{maxlength}} characters',

        'SELECT': 'Select',
        'SELECT_CONDITION': 'Select condition',
        'SELECT_CONDITION_FIRST': 'Select filter condition first',
        'FILTER_EQUAL': 'Equal',
        'FILTER_LESS': 'Less than',
        'FILTER_MORE': 'More than',
        'FILTER_BETWEEN': 'Between',
        'FILTER_MATCH': 'Match exactly', 
        'FILTER_SEARCH': 'Search like',
        'FILTER_MULTI_SELECT': 'Select multi options',
        'FILTER_SINGLE_SELECT': 'Select only one option',

        'NO_RECORDS_FOUND': 'No records',
        'SELECT_LANGUAGE': 'Select language',

        'VIEW_AS_TABLE': 'Table view',
        'VIEW_AS_GRID': 'Grid view',
        'DRAG_DROP_TO_REORDER': 'Drag and drop to re-order columns',
        'HIDE_COLUMNS': 'Hide columns',
    },
    'de': {
        'ROW': 'zeile',
        'ROWS': 'zeilen',
        'SHOWING': 'Zeige',
        'TOTAL': 'gesamt',

        'EDIT': 'Bearbeiten',
        'DELETE': 'Löschen',
        'SAVE': 'Speichern',
        'CANCEL': 'Stornieren',
        'NEW': 'Neu',
        'FILTER': 'Filter',
        'SUBMIT': 'Einreichen', 
        'APPLY': 'Anwenden',

        'CHECK_ALL_ROWS': 'Alle auswählen',
        'CHECK_THIS_ROW': 'Auswählen',

        'SORT_BY_ASC': 'Sortieren nach {{label}} ASC',
        'SORT_BY_DESC': 'Sortieren nach {{label}} DESC',

        'GO_TO_PAGE': 'Gehe zu Seite',
        'CURRENT_PAGE': 'Seite',
        'SHOW_NUM_ROWS_PER_PAGE': 'Zeige {{numRows}} Zeilen pro Seite',

        'ERROR_REQUIRED': '{{label}}  ist erforderlich und muss gültig sein',
        'ERROR_EMAIL': '{{label}} ist nicht gültig E-Mail',
        'ERROR_MIN': '{{label}} muss größer als {{min}}',
        'ERROR_MAX': '{{label}} muss kleiner sein als {{max}}',
        'ERROR_MIN_LENGTH': '{{label}} muss mindestens {{minlength}} Zeichen enthalten',
        'ERROR_MAX_LENGTH': '{{label}} darf höchstens {{maxlength}} Zeichen enthalten',

        'SELECT': 'Auswählen',
        'SELECT_CONDITION': 'Auswählen kondition',
        'SELECT_CONDITION_FIRST': 'Auswählen filter kSondition',
        'FILTER_EQUAL': 'Gleich',
        'FILTER_LESS': 'Weniger als',
        'FILTER_MORE': 'Mehr als',
        'FILTER_BETWEEN': 'Zwischen',
        'FILTER_MATCH': 'Genau übereinstimmen', 
        'FILTER_SEARCH': 'Suche wie',
        'FILTER_MULTI_SELECT': 'Wählen vielen optionen',
        'FILTER_SINGLE_SELECT': 'Wählen Sie nur eine option',

        'NO_RECORDS_FOUND': 'Keine Datensätze gefunden',
        'SELECT_LANGUAGE': 'Wählen Sie die Sprache',

        'VIEW_AS_TABLE': 'Table view',
        'VIEW_AS_GRID': 'Grid view',
        'DRAG_DROP_TO_REORDER': 'Ziehen und Ablegen neu anordnen',
        'HIDE_COLUMNS': 'verbergen spalten',
    },
    'es': {
        'ROW': 'row',
        'ROWS': 'rows',
        'SHOWING': 'Showing',
        'TOTAL': 'Total',

        'EDIT': 'Edit',
        'DELETE': 'Delete',
        'SAVE': 'Save',
        'CANCEL': 'Cancel',
        'NEW': 'New',
        'FILTER': 'Filter Data',
        'SUBMIT': 'Submit', 
        'APPLY': 'Apply',

        'CHECK_ALL_ROWS': 'Check all rows',
        'CHECK_THIS_ROW': 'Check this row',

        'SORT_BY_ASC': 'Sort By {{label}} ASC',
        'SORT_BY_DESC': 'Sort By {{label}} DESC',

        'GO_TO_PAGE': 'Go to page',
        'CURRENT_PAGE': 'Page',
        'SHOW_NUM_ROWS_PER_PAGE': 'Show {{numRows}} rows per page',

        'ERROR_REQUIRED': '{{label}} is required and must be valid.',
        'ERROR_EMAIL': '{{label}} is not valid email',
        'ERROR_MIN': '{{label}} must be greater than {{min}}',
        'ERROR_MAX': '{{label}} must be smaller than {{max}}',
        'ERROR_MIN_LENGTH': '{{label}} must contain at least {{minlength}} characters',
        'ERROR_MAX_LENGTH': '{{label}} must contain at most {{maxlength}} characters',

        'SELECT': 'Select',
        'SELECT_CONDITION': 'Select condition',
        'SELECT_CONDITION_FIRST': 'Select filter condition first',
        'FILTER_EQUAL': 'Equal',
        'FILTER_LESS': 'Less than',
        'FILTER_MORE': 'More than',
        'FILTER_BETWEEN': 'Between',
        'FILTER_MATCH': 'Match exactly', 
        'FILTER_SEARCH': 'Search like',
        'FILTER_MULTI_SELECT': 'Select multi options',
        'FILTER_SINGLE_SELECT': 'Select only one option',

        'NO_RECORDS_FOUND': 'No records',
        'SELECT_LANGUAGE': 'Select language',

        'VIEW_AS_TABLE': 'Table view',
        'VIEW_AS_GRID': 'Grid view',
        'DRAG_DROP_TO_REORDER': 'Drag and drop to re-order columns',
        'HIDE_COLUMNS': 'Hide columns',
    },
    'it': {
        'ROW': 'righe',
        'ROWS': 'righe',
        'SHOWING': 'Si sta visualizzando',
        'TOTAL': 'Totale',

        'EDIT': 'Modifica',
        'DELETE': 'Elimina',
        'SAVE': 'Salva',
        'CANCEL': 'Annulla',
        'NEW': 'Nuovo',
        'FILTER': 'Filtra dati',
        'SUBMIT': 'Conferma',
        'APPLY': 'Applica',

        'CHECK_ALL_ROWS': 'Seleziona tutto',
        'CHECK_THIS_ROW': 'Seleziona',

        'SORT_BY_ASC': 'Ordina per {{label}} ASC',
        'SORT_BY_DESC': 'Ordina per {{label}} DESC',

        'GO_TO_PAGE': 'Vai alla pagina',
        'CURRENT_PAGE': 'Pagina',
        'SHOW_NUM_ROWS_PER_PAGE': 'Mostra {{numRows}} righe per pagina',

        'ERROR_REQUIRED': '{{label}} è obbligatorio e deve essere valido',
        'ERROR_EMAIL': '{{label}} non è un indirizzo email valido',
        'ERROR_MIN': '{{label}} deve essere maggiore di {{min}}',
        'ERROR_MAX': '{{label}} deve essere inferiore di {{max}}',
        'ERROR_MIN_LENGTH': '{{label}} deve contenere almeno {{minlength}} caratteri',
        'ERROR_MAX_LENGTH': '{{label}} deve contenere al massimo {{maxlength}} caratteri',

        'SELECT': 'Seleziona',
        'SELECT_CONDITION': 'Seleziona condizione',
        'SELECT_CONDITION_FIRST': 'Selezionare prima la condizione di filtro',
        'FILTER_EQUAL': 'Pari a',
        'FILTER_LESS': 'Meno di',
        'FILTER_MORE': 'Più di',
        'FILTER_BETWEEN': 'Tra',
        'FILTER_MATCH': 'Corrisponde esattamente', 
        'FILTER_SEARCH': 'Ricerca come',
        'FILTER_MULTI_SELECT': 'Seleziona più opzioni',
        'FILTER_SINGLE_SELECT': 'Selezionare una sola opzione',

        'NO_RECORDS_FOUND': 'Nessun record trovato',
        'SELECT_LANGUAGE': 'Seleziona lingua',

        'VIEW_AS_TABLE': 'Vista a tabella',
        'VIEW_AS_GRID': 'Vista a griglia',
        'DRAG_DROP_TO_REORDER': 'Trascina e rilascia per riordinare le colonne',
        'HIDE_COLUMNS': 'Nascondi colonne',
    },
    'fr': {
        'ROW': 'ligne',
        'ROWS': 'lignes',
        'SHOWING': 'Affichage',
        'TOTAL': 'Total',

        'EDIT': 'Modifier',
        'DELETE': 'Effacer',
        'SAVE': 'Conserver',
        'CANCEL': 'Annuler',
        'NEW': 'Nouvelle',
        'FILTER': 'Filtrer données',
        'SUBMIT': 'Soumettre', 
        'APPLY': 'Appliquer',

        'CHECK_ALL_ROWS': 'Tout cocher',
        'CHECK_THIS_ROW': 'Cocher cette ligne',

        'SORT_BY_ASC': 'Reordonner By {{label}} ASC',
        'SORT_BY_DESC': 'Reordonner By {{label}} DESC',

        'GO_TO_PAGE': 'Aller à la page',
        'CURRENT_PAGE': 'Page',
        'SHOW_NUM_ROWS_PER_PAGE': 'Affichage {{numRows}} lignes à la page',

        'ERROR_REQUIRED': '{{label}} est obligatoire et doit être valide',
        'ERROR_EMAIL': '{{label}} n&#8217;est pas valid email',
        'ERROR_MIN': '{{label}} doit être supérieur à {{min}}',
        'ERROR_MAX': '{{label}} doit être inférieure à {{max}}',
        'ERROR_MIN_LENGTH': '{{label}} doit contenir au moins {{minlength}} caractères',
        'ERROR_MAX_LENGTH': '{{label}} doit contenir au plus {{maxlength}} caractères',

        'SELECT': 'Sélectionner',
        'SELECT_CONDITION': 'Sélectionner condition',
        'SELECT_CONDITION_FIRST': 'Sélectionner filter condition first',
        'FILTER_EQUAL': 'Égal',
        'FILTER_LESS': 'Moins que',
        'FILTER_MORE': 'Plus que',
        'FILTER_BETWEEN': 'Entre',
        'FILTER_MATCH': 'Correspondre Exactement', 
        'FILTER_SEARCH': 'Recherche comme',
        'FILTER_MULTI_SELECT': 'Sélectionner multi options',
        'FILTER_SINGLE_SELECT': 'Sélectionner only one option',

        'NO_RECORDS_FOUND': 'Accune ligne',
        'SELECT_LANGUAGE': 'Sélectionner une language',

        'VIEW_AS_TABLE': 'Mode Table',
        'VIEW_AS_GRID': 'Mode Grille',
        'DRAG_DROP_TO_REORDER': 'Glisser-déposer pour reordonner des colonnes',
        'HIDE_COLUMNS': 'Masquer colonnes',
    },
    'vi': {
        'ROW': 'dòng',
        'ROWS': 'dòng',
        'SHOWING': 'Hiển thị',
        'TOTAL': 'Tổng cộng',

        'EDIT': 'Chỉnh sửa',
        'DELETE': 'Xoá',
        'SAVE': 'Lưu lại',
        'CANCEL': 'Huỷ bỏ',
        'NEW': 'Thêm mới',
        'FILTER': 'Lọc kết quả',
        'SUBMIT': 'Gửi biểu mẫu', 
        'APPLY': 'Áp dụng',

        'CHECK_ALL_ROWS': 'Chọn tất cả',
        'CHECK_THIS_ROW': 'Chọn dòng này',

        'SORT_BY_ASC': 'Sắp xếp thep {{label}} tăng dần',
        'SORT_BY_DESC': 'Sắp xếp theo {{label}} giảm dần',

        'GO_TO_PAGE': 'Đi đến trang',
        'CURRENT_PAGE': 'Trang',
        'SHOW_NUM_ROWS_PER_PAGE': 'Hiển thị {{numRows}} dòng 1 trang',

        'ERROR_REQUIRED': '{{label}} là bắt buộc và phải hợp lệ',
        'ERROR_EMAIL': '{{label}} không phải là email hợp lệ',
        'ERROR_MIN': '{{label}} phải lớn hơn {{min}}',
        'ERROR_MAX': '{{label}} phải nhỏ hơn {{max}}',
        'ERROR_MIN_LENGTH': '{{label}} phải chứa ít nhất {{minlength}} kí tự',
        'ERROR_MAX_LENGTH': '{{label}} chỉ được chứa nhiều nhất {{maxlength}} kí tự',

        'SELECT': 'Lựa chọn',
        'SELECT_CONDITION': 'Lựa chọn điều kiện',
        'SELECT_CONDITION_FIRST': 'Lựa chọn điều kiện lọc trước',
        'FILTER_EQUAL': 'Bằng',
        'FILTER_LESS': 'Nhỏ hơn',
        'FILTER_MORE': 'Lớn hơn',
        'FILTER_BETWEEN': 'Ở giữa',
        'FILTER_MATCH': 'Tìm kiếm chính xác', 
        'FILTER_SEARCH': 'Tìm kiếm gần giống',
        'FILTER_MULTI_SELECT': 'Lựa chọn nhiều phương án',
        'FILTER_SINGLE_SELECT': 'Lựa chọn duy nhất 1 phương án',

        'NO_RECORDS_FOUND': 'Không có kết quả hiển thị',
        'SELECT_LANGUAGE': 'Lựa chọn ngôn ngữ',

        'VIEW_AS_TABLE': 'Chế độ xem dạng danh sách',
        'VIEW_AS_GRID': 'Chế độ xem dạng lưới',
        'DRAG_DROP_TO_REORDER': 'Kéo và thả để sắp xếp lại các cột',
        'HIDE_COLUMNS': 'Ẩn Cột',
    },
    'th': {
        'ROW': '',
        'ROWS': '',
        'SHOWING': 'แสดง',
        'TOTAL': 'จากทั้งหมด',

        'EDIT': 'แก้ไข',
        'DELETE': 'ลบ',
        'SAVE': 'บันทึก',
        'CANCEL': 'ยกเลิก',
        'NEW': 'ใหม่',
        'FILTER': 'กรองข้อมูล',
        'SUBMIT': 'ยืนยัน', 
        'APPLY': 'ปรับปรุง',

        'CHECK_ALL_ROWS': 'เลือกทุกรายการ',
        'CHECK_THIS_ROW': 'เลือกเฉพาะรายการนี้',

        'SORT_BY_ASC': 'จัดเรียง {{label}} จากน้อยไปมาก',
        'SORT_BY_DESC': 'จัดเรียง {{label}} จากมากไปน้อย',

        'GO_TO_PAGE': 'ไปที่หน้า',
        'CURRENT_PAGE': 'หน้าปัจจุบัน',
        'SHOW_NUM_ROWS_PER_PAGE': 'แสดง {{numRows}} รายการต่อหน้า',

        'ERROR_REQUIRED': '{{label}} ต้องมีการระบุข้อมูลและถูกต้อง',
        'ERROR_EMAIL': '{{label}} ไม่ใช่รูปแบบที่ถูกต้อง',
        'ERROR_MIN': '{{label}} ต้องน้อยกว่า {{min}}',
        'ERROR_MAX': '{{label}} ต้องมากกว่า {{max}}',
        'ERROR_MIN_LENGTH': '{{label}} ต้องมีจำนวนไม่น้อยกว่า {{minlength}} ตัวอักษร',
        'ERROR_MAX_LENGTH': '{{label}} ต้องมีจำนวนไม่เกิน {{maxlength}} ตัวอักษร',

        'SELECT': 'เลือก',
        'SELECT_CONDITION': 'ระบุเงื่อนไข',
        'SELECT_CONDITION_FIRST': 'กรุณาระบุเงื่อนไขก่อน',
        'FILTER_EQUAL': 'เท่ากับ',
        'FILTER_LESS': 'น้อยกว่า',
        'FILTER_MORE': 'มากกว่า',
        'FILTER_BETWEEN': 'ระหว่าง',
        'FILTER_MATCH': 'ตรงกับ', 
        'FILTER_SEARCH': 'ใกล้เคียงกับ',
        'FILTER_MULTI_SELECT': 'เลือกหลายเงื่อนไข',
        'FILTER_SINGLE_SELECT': 'เลือกเงื่อนไขเดียว',

        'NO_RECORDS_FOUND': 'ไม่พบข้อมูล',
        'SELECT_LANGUAGE': 'เลือกภาษา',

        'VIEW_AS_TABLE': 'แบบตาราง',
        'VIEW_AS_GRID': 'แบบกริด',
        'DRAG_DROP_TO_REORDER': 'ลากและวางเพื่อจัดลำดับคอลัมน์',
        'HIDE_COLUMNS': 'ซ่อนคอลัมน์',
    },
};
angular.module('adminTableDirective', [])
    .factory('translatorService', ['$interpolate', function($interpolate) {
        var currentLanguage = 'en';
        var dictionary = $.extend(true, {}, $dictionary);
        return {
            setCurrentLanguage: function(newCurrentLanguage) {
                currentLanguage = newCurrentLanguage;
            },   
            getCurrentLanguage: function() {
                return currentLanguage;
            },   
            translator: function(phraseKey, params) {
                if(params === null || $.isEmptyObject(params)) {
                    return dictionary[currentLanguage][phraseKey];
                } else {
                    return $interpolate(dictionary[currentLanguage][phraseKey])(params);
                }
            }   
        };
    }])
    .filter('translator', ['translatorService', function(translatorService) {
        return function(phraseKey, params) {
            return translatorService.translator(phraseKey, params);
        };
    }])
    .directive('dropDownMenuCheckList', function(){
        return {
            restrict: 'C',
            link: function(scope, element){
                element.on('click', function(e){
                    e.stopPropagation();
                });
            },
        };
    })
    .directive('adminTableDrag', ['$rootScope', '$parse', function ($rootScope, $parse) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                scope.value = attrs.adminTableDrag;
                //  return;
                var offset,_centerAnchor=false,_mx,_my,_tx,_ty,_mrx,_mry;
                var _hasTouch = ('ontouchstart' in document.documentElement);
                var _pressEvents = 'touchstart mousedown';
                var _moveEvents = 'touchmove mousemove';
                var _releaseEvents = 'touchend mouseup';

                var $document = $(document);
                var $window = $(window);
                var _data = null;

                var _dragEnabled = false;

                var _pressTimer = null;

                var onDragSuccessCallback = $parse(attrs.adminTableDragSuccess) || null;

                var initialize = function () {
                    element.attr('draggable', 'false'); // prevent native drag
                    toggleListeners(true);
                };

                var toggleListeners = function (enable) {
                    // remove listeners

                    if (!enable) {
                        return;
                    }
                    // add listeners.

                    scope.$on('$destroy', onDestroy);
                    //attrs.$observe("adminTableDrag", onEnableChange);
                    scope.$watch(attrs.adminTableDrag, onEnableChange);
                    //attrs.$observe('ngCenterAnchor', onCenterAnchor);
                    scope.$watch(attrs.ngCenterAnchor, onCenterAnchor);
                    scope.$watch(attrs.adminTableDragData, onDragDataChange);
                    element.on(_pressEvents, onpress);
                    if(! _hasTouch){
                        element.on('mousedown', function(){ return false;}); // prevent native drag
                    }
                };
                var onDestroy = function (enable) {
                    toggleListeners(false);
                };
                var onDragDataChange = function (newVal, oldVal) {
                    _data = newVal;
                };
                var onEnableChange = function (newVal, oldVal) {
                    _dragEnabled = (newVal);
                };
                var onCenterAnchor = function (newVal, oldVal) {
                    if(angular.isDefined(newVal))
                    { 
                        _centerAnchor = (newVal || 'true');
                    }
                };
                /*
                 * When the element is clicked start the drag behaviour
                 * On touch devices as a small delay so as not to prevent native window scrolling
                 */
                var onpress = function(evt) {
                    if(! _dragEnabled) {
                        return;
                    }

                    if(_hasTouch){
                        cancelPress();
                        _pressTimer = setTimeout(function(){
                            cancelPress();
                            onlongpress(evt);
                        },100);
                        $document.on(_moveEvents, cancelPress);
                        $document.on(_releaseEvents, cancelPress);
                    }else{
                        onlongpress(evt);
                    }
                };
                var cancelPress = function() {
                    clearTimeout(_pressTimer);
                    $document.off(_moveEvents, cancelPress);
                    $document.off(_releaseEvents, cancelPress);
                };
                var onlongpress = function(evt) {
                    if(! _dragEnabled) {
                        return;
                    }
                    evt.preventDefault();
                    offset = element.offset();
                    element.centerX = (element.width()/2);
                    element.centerY = (element.height()/2);
                    element.addClass('dragging');
                    _mx = (evt.pageX || evt.originalEvent.touches[0].pageX);
                    _my = (evt.pageY || evt.originalEvent.touches[0].pageY);
                    _mrx = _mx - offset.left;
                    _mry = _my - offset.top;

                    if (_centerAnchor) {
                        _tx = _mx - element.centerX - $window.scrollLeft();
                        _ty = _my - element.centerY - $window.scrollTop();    
                    } else {
                        _tx = offset.left - $window.scrollLeft();
                        _ty = offset.top - $window.scrollTop();    
                    }
                  
                    moveElement(_tx, _ty);
                    $document.on(_moveEvents, onmove);
                    $document.on(_releaseEvents, onrelease);
                    $rootScope.$broadcast('draggable:start', {x:_mx, y:_my, tx:_tx, ty:_ty, element:element, data:_data});

                };
                var onmove = function(evt) {
                    if(! _dragEnabled) {
                        return;
                    }
                    evt.preventDefault();

                    _mx = (evt.pageX || evt.originalEvent.touches[0].pageX);
                    _my = (evt.pageY || evt.originalEvent.touches[0].pageY);

                    if (_centerAnchor) {
                        _tx = _mx - element.centerX - $window.scrollLeft();
                        _ty = _my - element.centerY - $window.scrollTop();
                    } else {
                        _tx = _mx - _mrx - $window.scrollLeft();
                        _ty = _my - _mry - $window.scrollTop();
                    }

                    moveElement(_tx, _ty);

                    $rootScope.$broadcast('draggable:move', {x:_mx, y:_my, tx:_tx, ty:_ty, element:element, data:_data});

                };
                var onrelease = function(evt) {
                    if(! _dragEnabled) {
                        return;
                    }
                    evt.preventDefault();
                    $rootScope.$broadcast('draggable:end', {x:_mx, y:_my, tx:_tx, ty:_ty, element:element, data:_data, callback:onDragComplete});
                    element.removeClass('dragging');
                    reset();
                    $document.off(_moveEvents, onmove);
                    $document.off(_releaseEvents, onrelease);

                };
                var onDragComplete = function(evt) {

                    if(! onDragSuccessCallback) {
                        return;
                    }
                    scope.$apply(function () {
                        onDragSuccessCallback(scope, {$data: _data, $event: evt});
                    });
                };
                var reset = function() {
                    element.css({left:'',top:'', position:'', 'z-index':'', margin: ''});
                };
                var moveElement = function(x,y) {
                    element.css({left:x,top:y, position:'fixed', 'z-index':99999, margin: '0'});
                };
                initialize();
            }
        };
    }])
    .directive('adminTableDrop', ['$parse', '$timeout', function ($parse, $timeout) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                scope.value = attrs.adminTableDrop;

                var _dropEnabled=false;

                var onDropCallback = $parse(attrs.adminTableDropSuccess);// || function(){};
                var initialize = function () {
                    toggleListeners(true);
                };


                var toggleListeners = function (enable) {
                  // remove listeners

                    if (!enable) {
                        return;
                    }
                    // add listeners.
                    attrs.$observe('adminTableDrop', onEnableChange);
                    scope.$on('$destroy', onDestroy);
                    //scope.$watch(attrs.uiDraggable, onDraggableChange);
                    scope.$on('draggable:start', onDragStart);
                    scope.$on('draggable:move', onDragMove);
                    scope.$on('draggable:end', onDragEnd);
                };
                var onDestroy = function (enable) {
                    toggleListeners(false);
                };
                var onEnableChange = function (newVal, oldVal) {
                    _dropEnabled=scope.$eval(newVal);
                };
                var onDragStart = function(evt, obj) {
                    if(! _dropEnabled){
                        return;
                    }
                    isTouching(obj.x,obj.y,obj.element);
                };
                var onDragMove = function(evt, obj) {
                    if(! _dropEnabled){
                        return;
                    }
                    isTouching(obj.x,obj.y,obj.element);
                };
                var onDragEnd = function(evt, obj) {
                    if(! _dropEnabled){
                        return;
                    }
                    if(isTouching(obj.x,obj.y,obj.element)){
                        // call the adminTableDraggable element callback
                        if(obj.callback){
                            obj.callback(evt);
                        }

                        // call the adminTableDrop element callback
                        //   scope.$apply(function () {
                        //       onDropCallback(scope, {$data: obj.data, $event: evt});
                        //   });
                        $timeout(function(){
                            onDropCallback(scope, {$data: obj.data, $event: evt});
                        });
                    }
                    updateDragStyles(false, obj.element);
                };
                var isTouching = function(mouseX, mouseY, dragElement) {
                    var touching= hitTest(mouseX, mouseY);
                    updateDragStyles(touching, dragElement);
                    return touching;
                };
                var updateDragStyles = function(touching, dragElement) {
                    if(touching){
                        element.addClass('drag-enter');
                        dragElement.addClass('drag-over');
                    }else{
                        element.removeClass('drag-enter');
                        dragElement.removeClass('drag-over');
                    }
                };
                var hitTest = function(x, y) {
                    var bounds = element.offset();
                    bounds.right = bounds.left + element.outerWidth();
                    bounds.bottom = bounds.top + element.outerHeight();
                    return  (   x >= bounds.left
                            && x <= bounds.right
                            && y <= bounds.bottom
                            && y >= bounds.top);
                };
                initialize();
            }
        };
    }])
    .directive('timestamp', function(){
        return {
            restrict: 'A',
            scope: {
                timestamp: '=', //timestamp attribute, a number.
            },
            link: function postLink(scope, element){
                var date = new Date(scope.timestamp*1000);
                element.text(('0' + date.getDate()).slice(-2) + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + date.getFullYear());
                element.removeAttr('timestamp');
            }
        };
    })
    .directive('shortenText', function(){
        return {
            restrict: 'A',
            scope: {
                shortenText: '=',
            },
            link: function postLink(scope, element){
                var text =  scope.shortenText;
                element.attr('title', text);
                element.text(text.substring(0,100)+'...');
                element.removeAttr('shorten-text');
            }
        };
    })
    .directive('formDynamicName', [ '$compile', function($compile){
        return {
            restrict:   'A',
            terminal:   true,
            priority:   1001,
            link:   function(scope,element,attrs){
                element.attr('name', scope.$eval(attrs.formDynamicName));
                element.removeAttr('form-dynamic-name');
                $compile(element)(scope);
            }
        };
    }])
    .directive('datepickerInit', ['$compile', function($compile){
        return {
            restrict: 'A',
            require:  '^ngModel',
            priority:   1002,
            link:   function(scope, element, attrs){
                var date  = new Date(scope.$eval(attrs.datepickerInit) * 1000);
                var dateStingFormat   = ('0' + date.getDate()).slice(-2) + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + date.getFullYear();
                element.attr('ng-init', element.attr('ng-model') + ' = ' + '\'' + dateStingFormat + '\'');
                element.removeAttr('datepicker-init');
                $compile(element)(scope);
            }
        };
    }])
    .directive('fileModel', ['$parse', function ($parse) {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                var modelSetter = $parse(attrs.fileModel).assign;
                element.bind('change', function(){
                    scope.$apply(function(){
                        if (attrs.fileChange) {
                            scope.$eval(attrs.fileChange);
                        }
                        modelSetter(scope, element[0].files[0]);
                    });
                });
            }
        };
    }])
    .directive('autoExpandTextarea', function() {
        return {
            restrict: 'A',
            link: function( scope , element ) {
                element.css('resize', 'none');
                element.bind('keyup keydown keypress change', function(e) {
                    while($(this).outerHeight() < this.scrollHeight + parseFloat($(this).css('borderTopWidth')) + parseFloat($(this).css('borderBottomWidth'))) {
                        $(this).height($(this).height()+1);
                    }
                });
            }
        };
    })
    .directive('adminTable', function () {
        return {
            templateUrl: $templateUrl,
            restrict: 'E',
            scope: {
                config: '=', // config object of this directive
            },
            controller: ['$scope','$http','$routeParams','$location','$window','$route','translatorService',function($scope, $http, $routeParams, $location, $window, $route, translatorService){
                //Config default objects
                $scope.adminTableId    =   $scope.$id;
                $scope.supportedLanguagesArray  = ['en', 'fr', 'vi', 'it', 'de', 'th'];
                $scope.supportedLanguages = [
                    {
                        slug: 'en',
                        label: 'English',
                    },{
                        slug: 'fr',
                        label: 'French'
                    },{
                        slug: 'vi',
                        label: 'Vietnamese',
                    },{
                        slug: 'it',
                        label: 'Italian',
                    },
                    {
                        slug: 'th',
                        label: 'Thailandese',
                    },
                    {
                        slug: 'de',
                        label: 'German',
                    },
                ];
                if ($window.localStorage.lang && $scope.supportedLanguagesArray.indexOf($window.localStorage.lang) > -1) {
                    translatorService.setCurrentLanguage($window.localStorage.lang);
                    $scope.currentLanguage  = $window.localStorage.lang;
                }
                $scope.config.rowsPerPageOptions   = (angular.isArray($scope.config.rowsPerPageOptions))  ? $scope.config.rowsPerPageOptions   :   [5,15,30,40,50];
                $scope.config.maxPagesLoops        = ($scope.config.maxPagesLoops) ? parseInt($scope.config.maxPagesLoops) :   5;
                $scope.config.baseApiUrl           = ($scope.config.baseApiUrl) ? $scope.config.baseApiUrl   :   '';
                $scope.modeView = ($window.localStorage.modeview) ? $window.localStorage.modeview : 'table';
                $scope.errors   = [];
                //End Config default objects
                $scope.onReorderColsCompleted = function(dstIndex, srcObj, evt){
                    var dstObj = $scope.config.cols[dstIndex];
                    var srcIndex = $scope.config.cols.indexOf(srcObj);
                    $scope.config.cols[dstIndex] = srcObj;
                    $scope.config.cols[srcIndex] = dstObj;
                    var   $colsOrderList  = {};
                    $colsOrderList.fetchDataUrl   = $scope.checkAbsUrl($scope.config.apiRequestLink);
                    $colsOrderList.cols   = {};
                    for (var i = 0; i < $scope.config.cols.length; i++) {
                        $colsOrderList.cols[$scope.config.cols[i].model]  = i;
                    }
                    $window.localStorage.setItem('colsOrderList', JSON.stringify($colsOrderList));
                };
                $scope.setLanguage  = function($lang){
                    if ($scope.supportedLanguagesArray.indexOf($lang) > -1) {
                        translatorService.setCurrentLanguage($lang);
                        $scope.currentLanguage  = $lang;
                        $window.localStorage.setItem('lang', $lang);
                    }
                };
                $scope.setModeView  = function($mode){
                    $mode   = ($mode === 'grid') ? 'grid' : 'table';
                    $scope.modeView   = $mode;
                    $window.localStorage.setItem('modeview', $mode);
                };  
                $scope.checkAbsUrl   = function($url){
                    var r   = new RegExp('^(?:[a-z]+:)?//', 'i');
                    if (r.test($url)) {
                        return $url;
                    } else{
                        return $scope.config.baseApiUrl + $url;
                    }
                };
                //Check the advance filter with type == select.
                $scope.initFilterConfig =   function(){
                    for (var i = 0; i < $scope.config.advanceFilter.length; i++) {
                        if ($scope.config.advanceFilter[i].type === 'select') {
                            if ($scope.config.advanceFilter[i].apiRequestLink) {
                                (function(i){
                                    $http({
                                        url:    $scope.checkAbsUrl($scope.config.advanceFilter[i].apiRequestLink), 
                                        method:   'POST'
                                    })
                                    .success(function(results){
                                        if (results.error) {
                                            $scope.errors.push('500 Internal Server Error ' + $scope.config.advanceFilter[i].label + ': ' + results.message);
                                        } else {
                                            $scope.config.advanceFilter[i].options   = results.data.rows;
                                            $scope.config.advanceFilter[i].toggleSelection  = function(opt){
                                                if (!angular.isArray($scope.config.advanceFilter[i].value)) {
                                                    $scope.config.advanceFilter[i].value   = [];
                                                }
                                                var idx = $scope.config.advanceFilter[i].value.indexOf(opt);
                                                if (idx > -1) {
                                                    $scope.config.advanceFilter[i].value.splice(idx, 1);
                                                } else{
                                                    $scope.config.advanceFilter[i].value.push(opt);
                                                }
                                            };
                                        }                     
                                    })
                                    .error(function(results){
                                        if (results.message) {
                                            $scope.errors.push('500 Internal Server Error ' + $scope.config.advanceFilter[i].label + ': ' + results.message);
                                        } else{
                                            $scope.errors.push('500 Internal Server Error ' + $scope.config.advanceFilter[i].label);
                                        }                
                                    });
                                })(i);
                            } else {
                                var $k = i;
                                $scope.config.advanceFilter[$k].toggleSelection  = function(opt){
                                    if (!angular.isArray($scope.config.advanceFilter[$k].value)) {
                                        $scope.config.advanceFilter[$k].value   = [];
                                    }
                                    var idx = $scope.config.advanceFilter[$k].value.indexOf(opt);
                                    if (idx > -1) {
                                        $scope.config.advanceFilter[$k].value.splice(idx, 1);
                                    } else{
                                        $scope.config.advanceFilter[$k].value.push(opt);
                                    }
                                };
                            }
                        } else if($scope.config.advanceFilter[i].type === 'selectCascade'){
                            $scope.config.advanceFilter[i].condition    =   'match';
                            if ($scope.config.advanceFilter[i].selectors.length > 0) {
                                if ($scope.config.advanceFilter[i].selectors[0].apiRequestLink) {
                                    (function(i){
                                        var $httpConfig     =   {
                                            url:    $scope.checkAbsUrl($scope.config.advanceFilter[i].selectors[0].apiRequestLink)
                                        };
                                        if ($scope.config.advanceFilter[i].selectors[0].requestType === 'GET') {
                                            $httpConfig.method  =   'GET';
                                            $httpConfig.params   =   {};
                                        } else{
                                            $httpConfig.method  =   'POST';
                                        }
                                        $http($httpConfig)
                                        .success(function(results){                  
                                            if (results.error) {
                                                $scope.errors.push('500 Internal Server Error ' + $scope.config.advanceFilter[i].label + ': ' + results.message);
                                            } else {
                                                $scope.config.advanceFilter[i].selectors[0].options   = results.data.rows;
                                            }
                                        })
                                        .error(function(results){
                                            if (results.message) {
                                                $scope.errors.push('500 Internal Server Error ' + $scope.config.advanceFilter[i].label + ': ' + results.message);
                                            } else{
                                                $scope.errors.push('500 Internal Server Error ' + $scope.config.advanceFilter[i].label);
                                            }
                                        });
                                    })(i);
                                }
                            }
                        }
                    }
                };
                    
                $scope.refreshFilterFormCascadeSelectors  =   function($selectors, $parentIndex, $slugRequest, $filter){
                    var $childIndex     =   $parentIndex+1;
                    for (var i = $childIndex; i < $selectors.length; i++) {
                        $selectors[i].selectedValue =   '';
                    }
                    if ($childIndex < $selectors.length) {
                        delete $filter.value;
                        var $httpConfig     =   {
                            url:    $scope.checkAbsUrl($selectors[$childIndex].apiRequestLink)
                        };
                        if ($selectors[$childIndex].requestType === 'GET') {
                            $httpConfig.method  =   'GET';
                            $httpConfig.params   =   {};
                            $httpConfig.params[$selectors[$childIndex]['parentSlugRequest']] = $selectors[$parentIndex].selectedValue;
                        } else{
                            $httpConfig.method  =   'POST';
                            $httpConfig.data    =   $selectors[$childIndex]['parentSlugRequest'] + '=' + $selectors[$parentIndex].selectedValue;
                        }
                        $http($httpConfig)
                        .success(function(results){
                            $selectors[$childIndex].options   = results.data.rows;
                        })
                        .error(function(results){
                            $scope.errors.push('Opps! 500 server error!');
                        });
                    } else {
                        $filter.value   =   $selectors[$parentIndex].selectedValue;
                    }
                };

                $scope.clearEditFormCascadeSelectors    =   function($cols){
                    for (var i = 0; i < $cols.length; i++) {
                        if ($cols[i].editForm && $cols[i].editForm.type === 'selectCascade') {
                            for (var j = 0; j < $cols[i].editForm.selectors.length; j++) {
                                delete $cols[i].editForm.selectors[j].selectedValue;
                            }
                        }
                    }
                };

                $scope.refreshEditFormCascadeSelectors  =   function($selectors, $parentIndex, $editSlugRequest, $row){
                    var $childIndex     =   $parentIndex+1;
                    for (var i = $childIndex; i < $selectors.length; i++) {
                        $selectors[i].selectedValue =   '';
                    }
                    if ($childIndex < $selectors.length) {
                        delete $row.editForm[$editSlugRequest];
                        delete $row.checkEditForm[$editSlugRequest];
                        var $httpConfig     =   {
                            url:    $scope.checkAbsUrl($selectors[$childIndex].apiRequestLink)
                        };
                        if ($selectors[$childIndex].requestType === 'GET') {
                            $httpConfig.method  =   'GET';
                            $httpConfig.params   =   {};
                            $httpConfig.params[$selectors[$childIndex]['parentSlugRequest']] = $selectors[$parentIndex].selectedValue;
                        } else{
                            $httpConfig.method  =   'POST';
                            $httpConfig.data    =   $selectors[$childIndex]['parentSlugRequest'] + '=' + $selectors[$parentIndex].selectedValue;
                        }
                        $http($httpConfig)
                        .success(function(results){ 
                            $selectors[$childIndex].options   = results.data.rows;
                        })
                        .error(function(results){
                            $scope.errors.push('Opps! 500 server error!');
                        });
                    } else {
                        $row.editForm[$editSlugRequest]   =   $selectors[$parentIndex].selectedValue;
                        $row.checkEditForm[$editSlugRequest]=true;
                    }
                };

                //End check the advance filter
                //Check the editForm with type == select
                $scope.initColsConfig   =   function(){
                    if ($window.localStorage.colsOrderList) {
                        try {
                            var $colsOrderList  = JSON.parse($window.localStorage.colsOrderList);
                            if ($colsOrderList.fetchDataUrl === $scope.checkAbsUrl($scope.config.apiRequestLink)) {
                                var $tempCols   = {};
                                for (var i = 0; i < $scope.config.cols.length; i++) {
                                    $tempCols[$scope.config.cols[i].model]  = $scope.config.cols[i];
                                }
                                angular.forEach($colsOrderList.cols, function(colIndex, colModel) {
                                    $scope.config.cols[colIndex]  = $tempCols[colModel];
                                });
                            }
                        }
                        catch(err) {
                            $window.localStorage.removeItem('colsOrderList');
                        }
                    }
                    for (var a = 0; a < $scope.config.cols.length; a++) {
                        if ($scope.config.cols[a].editForm) {
                            if ($scope.config.cols[a].editForm.type === 'select') {
                                if ($scope.config.cols[a].editForm.apiRequestLink) {
                                    (function(a){
                                        $http({
                                            url:    $scope.checkAbsUrl($scope.config.cols[a].editForm.apiRequestLink), 
                                            method:   'POST'
                                        })
                                        .success(function(results){
                                            if (results.error) {
                                                $scope.errors.push('500 Internal Server Error ' + $scope.config.cols[a].label + ': ' + results.message);
                                            } else {
                                                $scope.config.cols[a].editForm.options   = results.data.rows;
                                            }                
                                        })
                                        .error(function(results){
                                            if (results.message) {
                                                $scope.errors.push('500 Internal Server Error ' + $scope.config.cols[a].label + ': ' + results.message);
                                            } else{
                                                $scope.errors.push('500 Internal Server Error ' + $scope.config.cols[a].label);
                                            }
                                        });
                                    })(a);
                                }
                            }
                        }
                    }

                    for (var $k = 0; $k < $scope.config.cols.length; $k++) {
                        if ($scope.config.cols[$k].editForm 
                            && $scope.config.cols[$k].editForm.type === 'selectCascade'
                            && $scope.config.cols[$k].editForm.selectors
                            && $scope.config.cols[$k].editForm.selectors.length > 0
                            && $scope.config.cols[$k].editForm.selectors[0].apiRequestLink) {
                            (function($k){
                                var $httpConfig     =   {
                                    url:    $scope.checkAbsUrl($scope.config.cols[$k].editForm.selectors[0].apiRequestLink)
                                };
                                if ($scope.config.cols[$k].editForm.selectors[0].requestType === 'GET') {
                                    $httpConfig.method  =   'GET';
                                    $httpConfig.params   =   {};
                                } else{
                                    $httpConfig.method  =   'POST';
                                }
                                $http($httpConfig)
                                .success(function(results){                  
                                    if (results.error) {
                                        $scope.errors.push('500 Internal Server Error ' + $scope.config.cols[$k].label + ': ' + results.message);
                                    } else {
                                        $scope.config.cols[$k].editForm.selectors[0].options   = results.data.rows;
                                    }
                                })
                                .error(function(results){
                                    if (results.message) {
                                        $scope.errors.push('500 Internal Server Error ' + $scope.config.cols[$k].label + ': ' + results.message);
                                    } else{
                                        $scope.errors.push('500 Internal Server Error ' + $scope.config.cols[$k].label);
                                    }
                                });
                            })($k);
                        }
                    }
                };
                    
                
                //cascadeSelector form
                $scope.refreshAddFormCascadeSelectors  =   function($selectors, $parentIndex, $addFormSlugRequest){
                    var $childIndex     =   $parentIndex+1;
                    for (var i = $childIndex; i < $selectors.length; i++) {
                        $selectors[i].selectedValue =   '';
                    }
                    if ($childIndex < $selectors.length) {
                        delete $scope.config.actions.add.data[$addFormSlugRequest];
                        var $httpConfig     =   {
                            url:    $scope.checkAbsUrl($selectors[$childIndex].apiRequestLink)
                        };
                        if ($selectors[$childIndex].requestType === 'GET') {
                            $httpConfig.method  =   'GET';
                            $httpConfig.params   =   {};
                            $httpConfig.params[$selectors[$childIndex]['parentSlugRequest']] = $selectors[$parentIndex].selectedValue;
                        } else{
                            $httpConfig.method  =   'POST';
                            $httpConfig.data    =   $selectors[$childIndex]['parentSlugRequest'] + '=' + $selectors[$parentIndex].selectedValue;
                        }
                        $http($httpConfig)
                        .success(function(results){ 
                            $selectors[$childIndex].options   = results.data.rows;
                        })
                        .error(function(results){
                            $scope.errors.push('Opps! 500 server error!');
                        });
                    } else {
                        $scope.config.actions.add.data[$addFormSlugRequest]   =   $selectors[$parentIndex].selectedValue;
                    }
                };
                //cascadeSelector form.

                //End check the edit form
                //Check the add form with type == select.
                $scope.initAddFormConfig     =   function(){
                    if ($scope.config.actions && $scope.config.actions.add && $scope.config.actions.add.form && $scope.config.actions.add.form.fields) {
                        for (var $a = 0; $a < $scope.config.actions.add.form.fields.length; $a++) {
                            if ($scope.config.actions.add.form.fields[$a].type === 'select' && $scope.config.actions.add.form.fields[$a].apiRequestLink) {
                                (function($a){
                                    $http({
                                    url:    $scope.checkAbsUrl($scope.config.actions.add.form.fields[$a].apiRequestLink), 
                                    method:   'POST'
                                    })
                                    .success(function(results){                  
                                        if (results.error) {
                                            $scope.errors.push('500 Internal Server Error ' + $scope.config.actions.add.form.fields[$a].label + ': ' + results.message);
                                        } else {
                                            $scope.config.actions.add.form.fields[$a].options   = results.data.rows;
                                        }
                                    })
                                    .error(function(results){
                                        if (results.message) {
                                            $scope.errors.push('500 Internal Server Error ' + $scope.config.actions.add.form.fields[$a].label + ': ' + results.message);
                                        } else{
                                            $scope.errors.push('500 Internal Server Error ' + $scope.config.actions.add.form.fields[$a].label);
                                        }
                                    });
                                })($a);
                            } 
                            else if($scope.config.actions.add.form.fields[$a].type === 'selectCascade'
                                    && $scope.config.actions.add.form.fields[$a].selectors.length > 0
                                    && $scope.config.actions.add.form.fields[$a].selectors[0].apiRequestLink) {
                                (function($a){
                                    var $httpConfig     =   {
                                        url:    $scope.checkAbsUrl($scope.config.actions.add.form.fields[$a].selectors[0].apiRequestLink)
                                    };
                                    if ($scope.config.actions.add.form.fields[$a].selectors[0].requestType === 'GET') {
                                        $httpConfig.method  =   'GET';
                                        $httpConfig.params   =   {};
                                    } else{
                                        $httpConfig.method  =   'POST';
                                    }
                                    $http($httpConfig)
                                    .success(function(results){                  
                                        if (results.error) {
                                            $scope.errors.push('500 Internal Server Error ' + $scope.config.actions.add.form.fields[$a].label + ': ' + results.message);
                                        } else {
                                            $scope.config.actions.add.form.fields[$a].selectors[0].options   = results.data.rows;
                                        }
                                    })
                                    .error(function(results){
                                        if (results.message) {
                                            $scope.errors.push('500 Internal Server Error ' + $scope.config.actions.add.form.fields[$a].label + ': ' + results.message);
                                        } else{
                                            $scope.errors.push('500 Internal Server Error ' + $scope.config.actions.add.form.fields[$a].label);
                                        }
                                    });
                                })($a);
                            }
                        }
                    }  
                };    
                //End check the add form
                $scope.allRowChecked = false;   //Variable true if all rows were checked.
                $scope.checkedRows  = [];       //An array stores ids of checked rows.
                /*
                    Pagination function
                    $totalRows: the totalRows of the table
                    $curPage: Current page display
                    $perPage: Number of rows displayed on a page
                    return the object of paging includes: Prev, pages, Next 
                */
                $scope.pagination =   function($totalRows, $curPage, $perPage){
                    var $maxPagesLoops   = $scope.config.maxPagesLoops;  // Display 5 pages on the screen.
                    var $totalPages  = Math.ceil($totalRows/$perPage); //Calculate the total pages
                    var $start      = (Math.ceil($curPage/$maxPagesLoops) - 1) * $maxPagesLoops + 1;
                    var $prev       = ($start > $maxPagesLoops) ? ($start - 1) : 0;  
                    var $end;
                    if ($totalPages < $maxPagesLoops) {
                        $end  = $totalPages;
                    } else{
                        $end  = (($start + $maxPagesLoops - 1) > $totalPages) ? $totalPages : ($start + $maxPagesLoops - 1);
                    }
                    var $next   = ($end < $totalPages) ? ($end + 1) : 0;
                    var $paging = {};
                    $paging.first = 1;
                    $paging.prev  = $prev;
                    $paging.pages = []; 
                    for (var i = $start; i < ($end + 1); i++) {
                        $paging.pages.push(i);
                    }
                    $paging.next  = $next;
                    $paging.current = $curPage;
                    $paging.last  = $totalPages;
                    return $paging; //The returned paging object.
                };
                /*
                    setOrder function
                    $orderBy: the row to be sorted by.
                    $order: ASC or DESC
                    result: Reload this page. 
                */
                $scope.setOrder   = function($orderBy, $order){    
                    if ($scope.requestData.order.orderBy !== $orderBy || $scope.requestData.order.order !== $order) {
                        $location.search('orderBy', $orderBy);
                        $location.search('order', $order);
                        $location.search('page', 1);
                    } else {
                        return;
                    } 
                };
                /*
                    setLimitLength function
                    $length: the rows per page: 10 20 50.
                    result: Reload this page. 
                */
                $scope.setLimitLength   = function($length){
                    $location.search('length', $length);
                    $location.search('page', 1);
                };
                /*
                    setPage function
                    $page: the page number to go.
                    result: Reload this page. 
                */
                $scope.setPage  =   function($page){
                    $location.search('page', $page);
                };
                /*
                    checkAllRow function
                    Checked all rows, and storing the ids into the array $scope.checkedRows.
                */
                $scope.checkAllRow  = function(){
                    $scope.allRowChecked  = !$scope.allRowChecked;
                    if (!$scope.allRowChecked) {
                        for (var i = 0; i < $scope.rows.length; i++) {
                            $scope.rows[i].checked  = false;
                        }
                        $scope.checkedRows  = [];
                    } else{
                        $scope.checkedRows  = [];
                        for (var j = 0; j < $scope.rows.length; j++) {
                            $scope.rows[j].checked  = true;
                            $scope.checkedRows.push($scope.rows[j].id);
                        }
                    }
                };
                /*
                  checkOneRow function
                  $row: passing the row as param, so we can find it's id to push into the checkedRows array.
                  if all rows checked, the variable allRowChecked will be set to true.
                  result: Reload this page. 
                */
                $scope.checkOneRow  = function($row){
                    //$row.checked  = !$row.checked;
                    if ($row.checked) {
                        $scope.checkedRows.push($row[$scope.config.rowIdModel]);
                    } else{
                        for (var i = 0; i < $scope.checkedRows.length; i++) {
                            if ($scope.checkedRows[i] === $row[$scope.config.rowIdModel]) {
                                $scope.checkedRows.splice(i, 1);
                                break;
                            }
                        }
                    }
                    if ($scope.checkedRows.length === $scope.rowsPerPage) {
                        $scope.allRowChecked  = true;
                    } else{
                        $scope.allRowChecked  = false;
                    }
                };
                /*
                  applyFilter function
                  apply the filter actions of user. 
                  Passing the filter param to url
                  reload the page
                */
                $scope.applyFilter  = function(){
                    var filterItems   = [];
                    for (var i = 0; i < $scope.config.advanceFilter.length; i++) {
                        if ($scope.config.advanceFilter[i].value !== false 
                            && $scope.config.advanceFilter[i].value !== null 
                            && $scope.config.advanceFilter[i].condition) {
                            var $j  = i;
                            var $selectorsValues    =   [];
                            if ($scope.config.advanceFilter[$j].type === 'timestamp') {
                                if ($scope.config.advanceFilter[$j].condition === 'between') {
                                    $scope.config.advanceFilter[$j].value.more   = new Date($scope.config.advanceFilter[$j].value.more).getTime() / 1000;
                                    $scope.config.advanceFilter[$j].value.less   = new Date($scope.config.advanceFilter[$j].value.less).getTime() / 1000;
                                } else{
                                    $scope.config.advanceFilter[$j].value   = new Date($scope.config.advanceFilter[$j].value).getTime() / 1000;
                                }
                            } else if($scope.config.advanceFilter[$j].type === 'selectCascade'){
                                for (var a = 0; a < $scope.config.advanceFilter[$j].selectors.length; a++) {
                                    $selectorsValues.push($scope.config.advanceFilter[$j].selectors[a].selectedValue);
                                }
                            }
                            filterItems.push({
                                label: $scope.config.advanceFilter[$j].label,
                                model: $scope.config.advanceFilter[$j].model,
                                condition: $scope.config.advanceFilter[$j].condition,
                                value: $scope.config.advanceFilter[$j].value,
                                slugRequest: $scope.config.advanceFilter[$j].slugRequest,
                                selectorsValues: $selectorsValues,
                            });
                        }
                    }
                    $location.search('filter', JSON.stringify(filterItems));
                };
                /*
                  fetchData function
                  This function call api to fetch the rows data.
                  It will use all the params from url to fetch exactly which data we want.
                  reload the page
                */
                $scope.fetchData  = function(){
                    $scope.showLoading();
                    $scope.rowsPerPage  =   ($routeParams.length) ? parseInt($routeParams.length) : $scope.config.rowsPerPageOptions[0];
                    $scope.rowsPerPage  =   ($scope.rowsPerPage < 1) ? $scope.config.rowsPerPageOptions[0] : $scope.rowsPerPage; 
                    $scope.currentPage  =   ($routeParams.page) ? parseInt($routeParams.page) : 1;
                    $scope.currentPage  =   ($scope.currentPage < 1) ? 1 : $scope.currentPage;
                    $scope.requestData  =   {
                                                where: {},
                                                order: {
                                                    orderBy: ($routeParams.orderBy) ? $routeParams.orderBy : $scope.config.rowIdModel,
                                                    order: ($routeParams.order) ? $routeParams.order : 'DESC',
                                                },
                                                limit: {
                                                    offset: ($scope.currentPage - 1)*$scope.rowsPerPage,
                                                    page: $scope.currentPage,
                                                    length: $scope.rowsPerPage,
                                                },
                                            };

                    if ($scope.config.advanceFilter) {
                        if ($routeParams.filter) {
                            try {
                                var $filterItems  = JSON.parse($routeParams.filter);
                                $scope.filterItems = $filterItems;
                                if ($filterItems.length > 0) {
                                    for (var i = 0; i < $scope.config.advanceFilter.length; i++) {
                                        for (var j = 0; j < $filterItems.length; j++) {
                                            if ($filterItems[j].slugRequest === $scope.config.advanceFilter[i].slugRequest) {
                                                $scope.config.advanceFilter[i].condition  = $filterItems[j].condition;
                                                if ($scope.config.advanceFilter[i].type === 'timestamp') {
                                                    if ($filterItems[j].condition === 'between') {
                                                        $scope.config.advanceFilter[i].value  = {};
                                                        var date1 = new Date($filterItems[j].value.less*1000);
                                                        $scope.config.advanceFilter[i].value.less  = date1;
                                                        var date2 = new Date($filterItems[j].value.more*1000);
                                                        $scope.config.advanceFilter[i].value.more  = date2;
                                                    } else{
                                                        var date = new Date($filterItems[j].value*1000);
                                                        $scope.config.advanceFilter[i].value  = date;
                                                    }
                                                } else if($scope.config.advanceFilter[i].type === 'selectCascade' && $filterItems[j].selectorsValues.length > 0){
                                                    var $selectorsValues    =   $filterItems[j].selectorsValues;
                                                    for (var $z = 0; $z < $scope.config.advanceFilter[i].selectors.length; $z++) {
                                                        if (typeof $selectorsValues[$z] !== 'object') {
                                                            $scope.config.advanceFilter[i].selectors[$z].selectedValue  =   $selectorsValues[$z];
                                                        $scope.refreshFilterFormCascadeSelectors($scope.config.advanceFilter[i].selectors, $z, $scope.config.advanceFilter[i].slugRequest, $scope.config.advanceFilter[i]);
                                                        }
                                                    }
                                                } else{
                                                    $scope.config.advanceFilter[i].value  = $filterItems[j].value;
                                                }
                                                $scope.config.advanceFilter[i].activated   =   true;
                                                $scope.config.isCollapsedFilter  = true;
                                                switch($filterItems[j].condition) {
                                                    case 'match':
                                                        $scope.requestData.where[$filterItems[j].slugRequest + '_equal']  = $filterItems[j].value;
                                                        break;
                                                    case 'like':
                                                        $scope.requestData.where[$filterItems[j].slugRequest + '_like']  = $filterItems[j].value;
                                                        break;
                                                    case 'less':
                                                        $scope.requestData.where[$filterItems[j].slugRequest + '_less_than']  = $filterItems[j].value;
                                                        break;
                                                    case 'more':
                                                        $scope.requestData.where[$filterItems[j].slugRequest + '_more_than']  = $filterItems[j].value;
                                                        break;
                                                    case 'equal':
                                                        $scope.requestData.where[$filterItems[j].slugRequest + '_equal']  = $filterItems[j].value;
                                                        break;
                                                    case 'between':
                                                        if ($filterItems[j].value.less) {
                                                            $scope.requestData.where[$filterItems[j].slugRequest + '_less_than']  = $filterItems[j].value.less;
                                                        }
                                                        if ($filterItems[j].value.more) {
                                                            $scope.requestData.where[$filterItems[j].slugRequest + '_more_than']  = $filterItems[j].value.more;
                                                        }
                                                    break;
                                                    case 'singleSelect':
                                                        $scope.requestData.where[$filterItems[j].slugRequest + '_equal']  = $filterItems[j].value;
                                                        break;
                                                    case 'multipleSelect': 
                                                        $scope.requestData.where[$filterItems[j].slugRequest + '_in']  = $filterItems[j].value;
                                                        break;
                                                    default:
                                                        continue;
                                                }
                                                break;
                                            }
                                        }
                                    }
                                } else{
                                    $scope.config.isCollapsedFilter  = false;
                                    $location.search('filter', null);
                                }
                            } catch (e) {
                                $scope.config.isCollapsedFilter  = false;
                                $location.search('filter', null);
                            }
                        }
                    }
                    //data:     'where='+JSON.stringify($scope.requestData.where)+'&order='+JSON.stringify($scope.requestData.order)+'&limit='+JSON.stringify($scope.requestData.limit),
                   var dataParam = {
                         Order:$scope.requestData.order.order,
                         OrderBy:$scope.requestData.order.orderBy,
                         Length:$scope.requestData.limit.length,
                         Offset:$scope.requestData.limit.offset,
                         Page:$scope.requestData.limit.page,
                         Culture:$scope.config.Culture,
                         Filters:$scope.filterItems
                    };
                    $http({
                        url:      $scope.checkAbsUrl($scope.config.apiRequestLink), 
                        method:   'POST',
                        data:     dataParam
                    })
                    .success(function(results){
                        if (results.error) {
                            $scope.errors.push('500 Internal Server Error: '+results.message);
                        } else{

                            angular.forEach($scope.config.cols, function($colVal, $colKey) {
                                if ($colVal.type === 'json') {
                                    angular.forEach(results, function($rowVal, $rowKey){
                                        results[$rowKey]['__jsonSubmitConfig__'] = angular.copy($colVal.jsonSubmitConfig);
                                        angular.forEach($colVal.attachData, function($attachDataVal, $attachDataKey){
                                            results[$rowKey]['__jsonSubmitConfig__']['data'][$attachDataVal['slugRequest']]   =   angular.copy($rowVal[$attachDataVal['model']]);
                                        });
                                    });
                                }
                            });

                            $scope.rows           =   results.data.rows;
                            $scope.totalRows      =   results.data.totalRows;
                            $scope.paging         =   $scope.pagination($scope.totalRows, $scope.currentPage, $scope.rowsPerPage);
                        } 
                        $scope.hideLoading();           
                    })
                    .error(function(results){
                        if (results.message) {
                            $scope.errors.push('500 Internal Server Error: '+results.message);
                        } else{
                            $scope.errors.push('500 Internal Server Error: ');
                        }
                        $scope.hideLoading();
                    });
                    $window.scrollTo(0,0);
                };
                $scope.editRow  = function(row){
                    if ($window.confirm('Are you sure want to edit this row?')) {
                        $scope.showLoading();
//                        var fd = new FormData();
//                        angular.forEach(row.editForm, function(value, key) {
//                            if (row.checkEditForm[key] && value !== false) {
//                                if(typeof row.editForm[key] === 'object'){
//                                    var $timestamp  = new Date(row.editForm[key]).getTime() / 1000;
//                                    if ($timestamp) {
//                                        value = $timestamp;
//                                    }
//                                }     `
//                                if (value !== false && value !== row[key]) {
//                                    fd.append(key, value);
//                                }
//                            }
//                        });
//                        fd.append('id', row[$scope.config.rowIdModel]);
//                        $http.post($scope.checkAbsUrl($scope.config.actions.edit.apiRequestLink), fd, {
//                            transformRequest: angular.identity
//                        })
                        row.editForm.ID = row.ID;
                        if(row.editForm.editImage) {
                            $http({
                                method: 'POST',
                                url: $scope.checkAbsUrl($scope.config.actions.edit.apiRequestLink),
                                headers: { 'Content-Type': undefined },

                                transformRequest: function (data) {
                                    var formData = new FormData();
                                    formData.append("model", angular.toJson(data.model));
                                    formData.append("file", data.file);
                                    return formData;
                                },
                                data: { model: row.editForm, file: row.editForm.editImage }
                            })
                                .success(function (results) {
//                            if (results.error) {
//                                $scope.errors.push('Edit row id = ' + row[$scope.config.rowIdModel] + ': ' + results.message);
//                            } else{
                                    Materialize.toast("Data edited successfully.", 4000, 'green');
                                    $route.reload();
                                    //}
                                    $scope.hideLoading();
                                })
                                .error(function (results) {
//                            if (results.message) {
//                                $scope.errors.push('Edit row id = ' + row[$scope.config.rowIdModel] + ': ' + results.message);
//                            } else{
//                                $scope.errors.push('Edit row id = ' + row[$scope.config.rowIdModel]);
//                            }
                                    $scope.errors.push(results.Message);
                                    $scope.hideLoading();
                                });

                        }else {
                            $http({
                                url: $scope.checkAbsUrl($scope.config.actions.edit.apiRequestLink),
                                method: 'POST',
                                data: row.editForm
                            }).success(function (results) {
//                            if (results.error) {
//                                $scope.errors.push('Edit row id = ' + row[$scope.config.rowIdModel] + ': ' + results.message);
//                            } else{
                                Materialize.toast("Data edited successfully.", 4000, 'green');
                                $route.reload();
                                //}
                                $scope.hideLoading();
                            })
                                .error(function (results) {
//                            if (results.message) {
//                                $scope.errors.push('Edit row id = ' + row[$scope.config.rowIdModel] + ': ' + results.message);
//                            } else{
//                                $scope.errors.push('Edit row id = ' + row[$scope.config.rowIdModel]);
//                            }
                                    $scope.errors.push(results.Message);
                                    $scope.hideLoading();
                                });
                        }
                    }
                };
                $scope.deleteRow  = function(row){
                    if ($window.confirm('Are you sure want to delete this row?')) {
                        $scope.showLoading();
                        var $idx  = row.ID;
                        $http({
                            url:    $scope.checkAbsUrl($scope.config.actions.delete.apiRequestLink), 
                            method:   'POST',
                            data:   row
                        })
                        .success(function(results){
                            Materialize.toast('Deleted successfully for ID : '+row.ID,4000,'green');
                            $route.reload();
                            $scope.hideLoading();       
                        })
                        .error(function(results){
                            $scope.errors.push(results.Message);
                            $scope.hideLoading();
                        });
                    }
                };
                $scope.addNewRow  = function(){
                    if ($window.confirm('Are you sure to add new data?')) {
                        $scope.showLoading();
                        
                        /*var fd = new FormData();
                        angular.forEach($scope.config.actions.add.data, function(value, key) {
                            fd.append(key, value);
                        });
                        $http.post($scope.checkAbsUrl($scope.config.actions.add.apiRequestLink), fd, {
                            transformRequest: angular.identity
                        })*/

//                        $http({
//                            url:    $scope.checkAbsUrl($scope.config.actions.add.apiRequestLink),
//                            method:   'POST',
//                            data:   $scope.config.actions.add.data
//                        })

                        var isImageUpload = $scope.config.actions.add.data.selectedImage;
                        if(isImageUpload){
                            PostWithImage();
                        }else{
                            PostExceptImage();
                        }
                    }
                };
                function PostWithImage(){
                    $http({
                        method: 'POST',
                        url: $scope.checkAbsUrl($scope.config.actions.add.apiRequestLink),
                        headers: { 'Content-Type': undefined },

                        transformRequest: function (data) {
                            var formData = new FormData();
                            formData.append("model", angular.toJson(data.model));
                            formData.append("file", data.file);
                            return formData;
                        },
                        data: { model: $scope.config.actions.add.data, file: $scope.config.actions.add.data.selectedImage }
                    })
                        .success(function(results){
                            Materialize.toast('New data added successfully.',4000,'green');
                            $route.reload();
                            $scope.hideLoading();
                        })
                        .error(function(results){
                            $scope.errors.push( results.Message);
                            $scope.hideLoading();
                        });
                }
                function PostExceptImage(){
                        $http({
                            url:    $scope.checkAbsUrl($scope.config.actions.add.apiRequestLink),
                            method:   'POST',
                            data:   $scope.config.actions.add.data
                        })
                        .success(function(results){
                            Materialize.toast('New data added successfully.',4000,'green');
                            $route.reload();
                            $scope.hideLoading();
                        })
                        .error(function(results){
                            $scope.errors.push( results.Message);
                            $scope.hideLoading();
                        });
                }
                $scope.deleteRows   = function(){
                    if ($window.confirm('Are you sure want to delete these '+$scope.checkedRows.length+' rows?')) {
                        $scope.showLoading();
                        var  t = $scope.config.actions.delete.model+'='+JSON.stringify($scope.checkedRows);
                        $http({
                            url:    $scope.checkAbsUrl($scope.config.actions.deleteRows.apiRequestLink),
                            method:   'POST',
                            data: $scope.checkedRows
                        })
                        .success(function(results){
//                            if (results.error) {
//                                $scope.errors.push('DELETE rows ids = ' + JSON.stringify($scope.checkedRows) + ': ' + results.message);
//                            } else{
//                                $route.reload();
//                            }
                            Materialize.toast('Selected data Deleted successfully.',4000,'green');
                            $route.reload();
                            $scope.hideLoading();
                        })
                        .error(function(results){
//                            if (results.message) {
//                                $scope.errors.push('DELETE rows ids = ' + JSON.stringify($scope.checkedRows) + ': ' + results.message);
//                            } else{
//                                $scope.errors.push('DELETE rows ids = ' + JSON.stringify($scope.checkedRows));
//                            }
                                $scope.errors.push(results.Message);
                            $scope.hideLoading();
                        });
                    }
                };
                $scope.exportTable    =   function($type){
                    var $htmlId     =   '#admin-table-export-' + $scope.adminTableId;
                    $($htmlId).show();
                    switch($type) {
                        case 'json':
                            $($htmlId).tableExport({type:'json',escape:'false'});
                            break;
                        case 'xml':
                            $($htmlId).tableExport({type:'xml',escape:'false'});
                            break;
                        case 'sql':
                            $($htmlId).tableExport({type:'sql',escape:'false'});
                            break;
                        case 'csv':
                            $($htmlId).tableExport({type:'csv',escape:'false'});
                            break;
                        case 'txt':
                            $($htmlId).tableExport({type:'txt',escape:'false'});
                            break;
                        case 'excel':
                            $($htmlId).tableExport({type:'excel',escape:'false'});
                            break;
                        case 'pdf':
                            $($htmlId).tableExport({type:'pdf',pdfFontSize:'10',escape:'false'});
                            break;
                        default:
                            break;
                    }
                    $($htmlId).hide();
                    return;
                };
                $scope.hideLoading  = function(){
                    $('.admin-table-loading-spinner').remove();
                };
                $scope.showLoading  = function(){
                    var $spinner   = angular.element("<div class='admin-table-loading-spinner'><div class='loading-spinner'></div></div>");
                    $('.admin-table-body-wrapper').append($spinner);
                };
                $scope.fetchData();
                $scope.initColsConfig();
                $scope.initFilterConfig();
                $scope.initAddFormConfig();
            }],
        };
    });