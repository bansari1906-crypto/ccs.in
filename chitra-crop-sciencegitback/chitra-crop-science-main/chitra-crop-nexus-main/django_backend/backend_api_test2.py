import json
import urllib.request
import urllib.error


def request(url, method='GET', data=None, token=None, headers=None):
    hdrs = {'Accept': 'application/json'}
    if headers:
        hdrs.update(headers)
    if token:
        hdrs['Authorization'] = f'Bearer {token}'
    body = None
    if data is not None:
        body = json.dumps(data).encode('utf-8')
        hdrs['Content-Type'] = 'application/json'
    req = urllib.request.Request(url, data=body, headers=hdrs, method=method)
    try:
        with urllib.request.urlopen(req, timeout=15) as r:
            return r.status, json.loads(r.read().decode('utf-8'))
    except urllib.error.HTTPError as e:
        print('ERROR', url, e.code, e.read().decode('utf-8'))
        return e.code, None
    except Exception as e:
        print('EXC', url, e)
        return None, None

status, body = request('http://127.0.0.1:8000/api/login/', method='POST', data={'email': 'admin@example.com', 'password': 'Admin123!'})
print('login', status, body and list(body.keys()))
if not body or 'access' not in body:
    raise SystemExit('login failed')

token = body['access']
for url in ['http://127.0.0.1:8000/api/orders/', 'http://127.0.0.1:8000/api/leads/', 'http://127.0.0.1:8000/api/product-images/']:
    status, data = request(url, token=token)
    print(url, status, 'ok' if status == 200 else 'fail')

cat_data = {'name': 'Test Agri Category', 'slug': 'test-agri-category', 'description': 'Category created for admin validation'}
status, cat_resp = request('http://127.0.0.1:8000/api/categories/', method='POST', data=cat_data, token=token)
print('create category', status, cat_resp and cat_resp.get('id'))
cat_id = cat_resp.get('id') if cat_resp else None

prod_data = {
    'name': 'Test Agri Product',
    'slug': 'test-agri-product',
    'category': cat_id,
    'sub_category': 'Seeds',
    'description': 'Test product for admin workflow validation',
    'price': '99.99',
    'stock': 100,
    'status': 'active',
}
status, prod_resp = request('http://127.0.0.1:8000/api/products/', method='POST', data=prod_data, token=token)
print('create product', status, prod_resp and prod_resp.get('id'))
prod_id = prod_resp.get('id') if prod_resp else None
if prod_id:
    status, detail = request(f'http://127.0.0.1:8000/api/products/{prod_id}/', token=token)
    print('product detail', status, detail and detail.get('name'))
status, list_resp = request('http://127.0.0.1:8000/api/products/', token=token)
print('product list status', status, 'count', list_resp and list_resp.get('count'))
