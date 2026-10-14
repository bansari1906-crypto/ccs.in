import base64
import json
import urllib.error
import urllib.request

# login first
login_data = json.dumps({'email': 'admin@example.com', 'password': 'Admin123!'}).encode('utf-8')
login_req = urllib.request.Request('http://127.0.0.1:8000/api/login/', data=login_data, method='POST')
login_req.add_header('Content-Type', 'application/json')
login_req.add_header('Accept', 'application/json')
with urllib.request.urlopen(login_req, timeout=15) as r:
    auth = json.loads(r.read().decode('utf-8'))
    token = auth['access']

# 1x1 transparent PNG data
png_data = base64.b64decode(
    'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAMAASsJTYQAAAAASUVORK5CYII='
)
product_id = 1

boundary = '----WebKitFormBoundary7MA4YWxkTrZu0gW'
body_lines = []
body_lines.append(f'--{boundary}')
body_lines.append('Content-Disposition: form-data; name="product"')
body_lines.append('')
body_lines.append(str(product_id))
body_lines.append(f'--{boundary}')
body_lines.append('Content-Disposition: form-data; name="image"; filename="test_upload.png"')
body_lines.append('Content-Type: image/png')
body_lines.append('')
body = '\r\n'.join(body_lines).encode('utf-8') + b'\r\n' + png_data + b'\r\n' + f'--{boundary}--\r\n'.encode('utf-8')

req = urllib.request.Request('http://127.0.0.1:8000/api/product-images/', data=body, method='POST')
req.add_header('Content-Type', f'multipart/form-data; boundary={boundary}')
req.add_header('Accept', 'application/json')
req.add_header('Authorization', f'Bearer {token}')

try:
    with urllib.request.urlopen(req, timeout=15) as r:
        data = json.loads(r.read().decode('utf-8'))
        print('upload status', r.status)
        print(json.dumps(data, indent=2))
except urllib.error.HTTPError as e:
    print('HTTPError', e.code, e.read().decode('utf-8'))
except Exception as e:
    print('EXC', e)
