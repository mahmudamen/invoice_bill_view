odoo.define('dashboard', function (require) {
    "use strict";
    var screens = require('base_accounting_kit.AccountingDashboard.AccountingDashboard');
    screens.include({
             init: function(parent, options) {
            // call super in a easy way
            this._super(parent, options);
            },
            events: {
            'click #invoice_bill_this_month': 'onclick_invoice_bill_this_month',
            'click #invoice_bill_this_year': 'onclick_invoice_bill_this_year',
            },
            onclick_toggle_two: function (ev) {

            this.onclick_invoice_bill_this_year(ev);
            this.onclick_invoice_bill_this_month(ev);

        },
            onclick_invoice_this_year: function (ev) {
            ev.preventDefault();
            var selected = $('.btn.btn-tool.selected');
            var data = $(selected[0]).data();
            var posted = false;
            var self = this;
            if ($('#toggle-two')[0].checked == true) {
                posted = "posted"
            }

            rpc.query({
                model: "account.move",
                method: "get_currency",
            }).then(function (result) {
                currency = result;
            })

            rpc.query({
                model: "account.move",
                method: "get_total_invoice_current_year",
                args: [posted],
            })
                .then(function (result) {

                    $('#total_supplier_invoice_paid').hide();
                    $('#total_supplier_invoice').hide();
                    $('#total_customer_invoice_paid').hide();
                    $('#total_customer_invoice').hide();
                    $('#tot_invoice').hide();
                    $('#tot_supplier_inv').hide();

                    $('#total_supplier_invoice_paid_current_month').hide();
                    $('#total_supplier_invoice_current_month').hide();
                    $('#total_customer_invoice_paid_current_month').hide();
                    $('#total_customer_invoice_current_month').hide();
                    $('#tot_invoice_current_month').hide();
                    $('#tot_supplier_inv_current_month').hide();


                    $('#total_supplier_invoice_paid_current_year').empty();
                    $('#total_supplier_invoice_current_year').empty();
                    $('#total_customer_invoice_paid_current_year').empty();
                    $('#total_customer_invoice_current_year').empty();
                    $('#tot_invoice_current_year').empty();
                    $('#tot_supplier_inv_current_year').empty();

                    $('#total_supplier_invoice_paid_current_year').show();
                    $('#total_supplier_invoice_current_year').show();
                    $('#total_customer_invoice_paid_current_year').show();
                    $('#total_customer_invoice_current_year').show();
                    $('#tot_invoice_current_year').show();
                    $('#tot_supplier_inv_current_year').show();
                    var tot_invoice_current_year = result[0][0]
                    var tot_credit_current_year = result[1][0]
                    var tot_supplier_inv_current_year = result[2][0]
                    var tot_supplier_refund_current_year = result[3][0]
                    var tot_customer_invoice_paid_current_year = result[4][0]
                    var tot_supplier_invoice_paid_current_year = result[5][0]
                    var tot_customer_credit_paid_current_year = result[6][0]
                    var tot_supplier_refund_paid_current_year = result[7][0]
                    var customer_invoice_total_current_year = (tot_invoice_current_year - tot_credit_current_year).toFixed(2)
                    var customer_invoice_paid_current_year = (tot_customer_invoice_paid_current_year - tot_customer_credit_paid_current_year).toFixed(2)
                    var invoice_percentage_current_year = ((customer_invoice_total_current_year / customer_invoice_paid_current_year) * 100).toFixed(2)
                    var supplier_invoice_total_current_year = (tot_supplier_inv_current_year - tot_supplier_refund_current_year).toFixed(2)
                    var supplier_invoice_paid_current_year = (tot_supplier_invoice_paid_current_year - tot_supplier_refund_paid_current_year).toFixed(2)
                    var supplier_percentage_current_year = ((supplier_invoice_total_current_year / supplier_invoice_paid_current_year) * 100).toFixed(2)

                    $('#tot_supplier_inv_current_year').attr("value", supplier_invoice_paid_current_year);
                    $('#tot_supplier_inv_current_year').attr("max", supplier_invoice_total_current_year);

                    $('#tot_invoice_current_year').attr("value", customer_invoice_paid_current_year);
                    $('#tot_invoice_current_year').attr("max", customer_invoice_total_current_year);

                    customer_invoice_paid_current_year = self.format_currency(currency, customer_invoice_paid_current_year);
                    customer_invoice_total_current_year = self.format_currency(currency, customer_invoice_total_current_year);
                    supplier_invoice_paid_current_year = self.format_currency(currency, supplier_invoice_paid_current_year);
                    supplier_invoice_total_current_year = self.format_currency(currency, supplier_invoice_total_current_year);

                    $('#total_customer_invoice_paid_current_year').append('<div class="logo">' + '<span>' + customer_invoice_paid_current_year + '</span><span>Total Paid<span></div>');
                    $('#total_customer_invoice_current_year').append('<div" class="logo">' + '<span>' + customer_invoice_total_current_year + '</span><span>Total Invoice <span></div>');

                    $('#total_supplier_invoice_paid_current_year').append('<div" class="logo">' + '<span>' + supplier_invoice_paid_current_year + '</span><span>Total Paid<span></div>');
                    $('#total_supplier_invoice_current_year').append('<div" class="logo">' + '<span>' + supplier_invoice_total_current_year + '</span><span>Total Invoice<span></div>');

                })
        },
            onclick_invoice_bill_this_month: function (ev) {
            ev.preventDefault();
            var selected = $('.btn.btn-tool.selected');
            var data = $(selected[0]).data();
            var posted = false;
            var self = this;
            if ($('#toggle-two')[0].checked == true) {
                posted = "posted"
            }
            rpc.query({
                model: "account.move",
                method: "get_currency",
            }).then(function (result) {
                currency = result;
            })
            rpc.query({
                model: "account.move",
                method: "get_total_invoice_bill_current_month",
                args: [posted],
            })
                .then(function (result) {
                    $('#total_supplier_invoice_paid').hide();
                    $('#total_supplier_invoice').hide();
                    $('#total_customer_invoice_paid').hide();
                    $('#total_customer_invoice').hide();
                    $('#tot_invoice').hide();
                    $('#tot_supplier_inv').hide();
                    $('#total_supplier_invoice_paid_current_month').empty();
                    $('#total_supplier_invoice_current_month').empty();
                    $('#total_customer_invoice_paid_current_month').empty();
                    $('#total_customer_invoice_current_month').empty();
                    $('#tot_invoice_current_month').empty();
                    $('#tot_supplier_inv_current_month').empty();
                    $('#total_supplier_invoice_paid_current_year').hide();
                    $('#total_supplier_invoice_current_year').hide();
                    $('#total_customer_invoice_paid_current_year').hide();
                    $('#total_customer_invoice_current_year').hide();
                    $('#tot_invoice_current_year').hide();
                    $('#tot_supplier_inv_current_year').hide();
                    $('#total_supplier_invoice_paid_current_month').show();
                    $('#total_supplier_invoice_current_month').show();
                    $('#total_customer_invoice_paid_current_month').show();
                    $('#total_customer_invoice_current_month').show();
                    $('#tot_invoice_current_month').show();
                    $('#tot_supplier_inv_current_month').show();
                    var tot_invoice_current_month = result[0][0]
                    var tot_credit_current_month = result[1][0]
                    var tot_supplier_inv_current_month = result[2][0]
                    var tot_supplier_refund_current_month = result[3][0]
                    var tot_customer_invoice_paid_current_month = result[4][0]
                    var tot_supplier_invoice_paid_current_month = result[5][0]
                    var tot_customer_credit_paid_current_month = result[6][0]
                    var tot_supplier_refund_paid_current_month = result[7][0]
                    var customer_invoice_total_current_month = (tot_invoice_current_month - tot_credit_current_month).toFixed(2)
                    var customer_invoice_paid_current_month = (tot_customer_invoice_paid_current_month - tot_customer_credit_paid_current_month).toFixed(2)
                    var invoice_percentage_current_month = ((customer_invoice_total_current_month / customer_invoice_paid_current_month) * 100).toFixed(2)
                    var supplier_invoice_total_current_month = (tot_supplier_inv_current_month - tot_supplier_refund_current_month).toFixed(2)
                    var supplier_invoice_paid_current_month = (tot_supplier_invoice_paid_current_month - tot_supplier_refund_paid_current_month).toFixed(2)
                    var supplier_percentage_current_month = ((supplier_invoice_total_current_month / supplier_invoice_paid_current_month) * 100).toFixed(2)

                    $('#tot_supplier_inv_current_month').attr("value", supplier_invoice_paid_current_month);
                    $('#tot_supplier_inv_current_month').attr("max", supplier_invoice_total_current_month);

                    $('#tot_invoice_current_month').attr("value", customer_invoice_paid_current_month);
                    $('#tot_invoice_current_month').attr("max", customer_invoice_total_current_month);

                    customer_invoice_paid_current_month = self.format_currency(currency, customer_invoice_paid_current_month);
                    customer_invoice_total_current_month = self.format_currency(currency, customer_invoice_total_current_month);
                    supplier_invoice_paid_current_month = self.format_currency(currency, supplier_invoice_paid_current_month);
                    supplier_invoice_total_current_month = self.format_currency(currency, supplier_invoice_total_current_month);


                    $('#total_customer_invoice_paid_current_month').append('<div class="logo">' + '<span>' + customer_invoice_paid_current_month + '</span><span>Total Paid<span></div>');
                    $('#total_customer_invoice_current_month').append('<div" class="logo">' + '<span>' + customer_invoice_total_current_month + '</span><span>Total Invoice<span></div>');

                    $('#total_supplier_invoice_paid_current_month').append('<div" class="logo">' + '<span>' + supplier_invoice_paid_current_month + '</span><span>Total Paid<span></div>');
                    $('#total_supplier_invoice_current_month').append('<div" class="logo">' + '<span>' + supplier_invoice_total_current_month + '</span><span>Total Invoice<span></div>');

                })
        },



    });



    

});