from flask import Flask
import redis

app = Flask(__name__)
r = redis.Redis(host='redis', port=6379, db=0)

@app.route('/')
def index():
    count = r.incr('counter')
    return f'Counter value: {count}'

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
