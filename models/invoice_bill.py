from odoo import fields, models, api


class DashBoard(models.Model):
    _inherit = 'account.move'
    _description = 'Description'

    @api.model
    def get_total_invoice_bill_current_month(self, *post):

        company_id = self.get_current_company_value()

        states_arg = ""
        if post != ('posted',):
            states_arg = """ state in ('posted', 'draft')"""
        else:
            states_arg = """ state = 'posted'"""

        self._cr.execute(('''select sum(amount_total_signed) as customer_invoice from account_move where type ='out_invoice'
                                        AND   %s                               
                                        AND Extract(month FROM account_move.date) = Extract(month FROM DATE(NOW()))
                                        AND Extract(YEAR FROM account_move.date) = Extract(YEAR FROM DATE(NOW()))     
                                        AND account_move.company_id in ''' + str(tuple(company_id)) + '''           
                                    ''') % (states_arg))
        record_customer_current_month = self._cr.dictfetchall()

        self._cr.execute(('''select sum(-(amount_total_signed)) as supplier_invoice from account_move where type ='in_invoice'
                                        AND  %s                              
                                        AND Extract(month FROM account_move.date) = Extract(month FROM DATE(NOW()))
                                        AND Extract(YEAR FROM account_move.date) = Extract(YEAR FROM DATE(NOW()))     
                                        AND account_move.company_id in ''' + str(tuple(company_id)) + '''      
                                    ''') % (states_arg))
        record_supplier_current_month = self._cr.dictfetchall()
        result_credit_note_current_month = [{'credit_note': 0.0}]
        result_refund_current_month = [{'refund': 0.0}]
        self._cr.execute(('''select sum(amount_total_signed) - sum(amount_residual_signed)  as customer_invoice_paid from account_move where type ='out_invoice'
                                                AND   %s
                                                AND invoice_payment_state = 'paid'
                                                AND Extract(month FROM account_move.date) = Extract(month FROM DATE(NOW()))
                                                AND Extract(YEAR FROM account_move.date) = Extract(YEAR FROM DATE(NOW()))
                                                AND account_move.company_id in ''' + str(tuple(company_id)) + '''
                                            ''') % (states_arg))
        record_paid_customer_invoice_current_month = self._cr.dictfetchall()

        self._cr.execute(('''select sum(-(amount_total_signed)) - sum(-(amount_residual_signed))  as supplier_invoice_paid from account_move where type ='in_invoice'
                                                AND   %s
                                                AND invoice_payment_state = 'paid'
                                                AND Extract(month FROM account_move.date) = Extract(month FROM DATE(NOW()))
                                                AND Extract(YEAR FROM account_move.date) = Extract(YEAR FROM DATE(NOW()))
                                                AND account_move.company_id in ''' + str(tuple(company_id)) + '''
                                            ''') % (states_arg))
        result_paid_supplier_invoice_current_month = self._cr.dictfetchall()
        record_paid_customer_credit_current_month = [{'customer_credit_paid': 0.0}]
        result_paid_supplier_refund_current_month = [{'supplier_refund_paid': 0.0}]

        customer_invoice_current_month = [item['customer_invoice'] for item in record_customer_current_month]
        supplier_invoice_current_month = [item['supplier_invoice'] for item in record_supplier_current_month]
        credit_note_current_month = [item['credit_note'] for item in result_credit_note_current_month]
        refund_current_month = [item['refund'] for item in result_refund_current_month]
        paid_customer_invoice_current_month = [item['customer_invoice_paid'] for item in
                                               record_paid_customer_invoice_current_month]
        paid_supplier_invoice_current_month = [item['supplier_invoice_paid'] for item in
                                               result_paid_supplier_invoice_current_month]

        paid_customer_credit_current_month = [item['customer_credit_paid'] for item in
                                              record_paid_customer_credit_current_month]
        paid_supplier_refund_current_month = [item['supplier_refund_paid'] for item in
                                              result_paid_supplier_refund_current_month]

        currency = self.get_currency()
        return customer_invoice_current_month, credit_note_current_month, supplier_invoice_current_month, refund_current_month, paid_customer_invoice_current_month, paid_supplier_invoice_current_month, paid_customer_credit_current_month, paid_supplier_refund_current_month, currency
