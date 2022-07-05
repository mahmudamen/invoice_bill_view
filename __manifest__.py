
{
    'name': 'invoice bill view',
    'version': '13.0',
    'summary': """Odoo js playlist """,
    'description': """
                  
                    Add default payment method to payment screen
                    Add restriction group to POS discount  
                                                   
                    """,
    'author': "mahmudamen",
    'website':'s',
    'category': 'a',
  
    'depends': ['base'],
    "data": [
       # 'security/pos_groups.xml',
        'views/template.xml',
    ],
    'qweb': [
        'static/src/xml/view_bill.xml'
    ],
    'installable': True,
}
