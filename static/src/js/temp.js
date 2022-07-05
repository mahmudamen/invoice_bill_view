
odoo.define('invoice_bill_view.invoice_bill', function (require) {
'use strict';
        var core = require('web.core');
        var ajax = require('web.ajax');
        var qweb = core.qweb;
        var self = this;
            ajax.loadXML('/invoice_bill_view/static/src/xml/view_bill.xml', core.qweb);
});